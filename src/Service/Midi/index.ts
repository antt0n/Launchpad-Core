import midi from 'jzz';

type EngineAsync = ReturnType<typeof midi>;
type JzzPort = ReturnType<EngineAsync['openMidiOut']>;

class midiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MidiService';
  }
}

export default class MidiService {
  private _midiInput: JzzPort = midi().openMidiOut();
  private _midiOutput: JzzPort = midi().openMidiOut();

  private _midiIn: string;
  private _midiOut: string;

  constructor(midiIn: string, midiOut: string) {
    this._midiIn = midiIn;
    this._midiOut = midiOut;

    this._midiInput = midi()
      .openMidiIn(midiIn)
      .or(() => this.midiError);
    this._midiOutput = midi()
      .openMidiOut(midiIn)
      .or(() => this.midiError);
  }

  private get midiError() {
    throw new midiError('Device not connected.');
  }

  private openOutput() {
    this._midiOutput = midi()
      .openMidiOut(this._midiOut)
      .or(() => this.midiError);
  }

  private closeOutput() {
    this._midiOutput.close();
  }

  public get out(): JzzPort {
    this.openOutput();
    setTimeout(() => {
      this.closeOutput();
    }, 500);
    return this._midiOutput;
  }

  public get in(): JzzPort {
    return this._midiInput;
  }

  public closeAll() {
    this._midiOutput.disconnect();
    this._midiInput.disconnect();
    this._midiOutput.close();
    this._midiInput.close();
  }

  public static async requestWebAccess() {
    if (typeof navigator !== 'undefined' && (navigator as any).requestMIDIAccess) {
      try {
        await (navigator as any).requestMIDIAccess({ sysex: true });
      } catch {
        // ignore failure in case user rejects access
      }
    }
  }
}
