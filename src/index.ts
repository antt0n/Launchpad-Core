import DriverManager, { DriverMap, StringDrivers } from './Drivers';
import MidiService from './Service/Midi';

class LaunchpadCore<T extends StringDrivers> {
  private static _devicesInstance: { [key: string]: MidiService };
  private readonly _instance: MidiService;
  private readonly _driver: DriverMap[T];

  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined';
  }

  private callbacks: { [e: string]: any[] } = {
    onMidiIn: [],
    onConnected: [],
    onDisabled: [],
  };

  constructor(driverName: T) {
    this._driver = DriverManager.getDriver(driverName);

    if (LaunchpadCore.isBrowser()) {
      MidiService.requestWebAccess().catch(() => {});
    }

    this._instance = new MidiService(this._driver.MidiIn, this._driver.MidiOut);

    this.onEnabled();

    if (typeof process !== 'undefined' && process.on) {
      process.on('SIGINT', () => this.onDisabled());
      process.on('EXIT', () => this.onDisabled());
    }
  }

  private async onEnabled() {
    await this._instance.in.connect((data: any) => {
      this.handleEvent('onMidiIn', data);
    });
    await this.handleEvent('onConnected', this._instance, this._driver);
  }

  private async onDisabled() {
    await this.handleEvent('onDisabled', this._instance, this._driver);
    this._instance.closeAll();
  }

  /**
   * Events
   */
  private async handleEvent(event: string, ...args: any[]) {
    for (const f of this.callbacks[event]) f(...args);
  }

  public on(event: 'onMidiIn', callback: (data: any) => void): void;
  public on(event: 'onConnected', callback: (instance: MidiService, driver: DriverMap[T]) => void): void;
  public on(event: 'onDisabled', callback: (instance: MidiService, driver: DriverMap[T]) => void): void;

  public on(event: string, callback: any) {
    if (!this.callbacks[event]) throw new Error(`Unknown event name: '${event}'`);
    this.callbacks[event].push(callback);
  }

  /**
   * Get instance of the Launchpad (MidiService)
   */
  public get instance(): MidiService {
    return this._instance;
  }

  /**
   * Get driver of the Launchpad
   */
  public get driver(): DriverMap[T] {
    return this._driver;
  }
}
export { LaunchpadCore };

export function createLaunchpadCore<T extends StringDrivers>(driverName: T) {
  return new LaunchpadCore<T>(driverName);
}
