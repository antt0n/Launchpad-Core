# Launchpad Core

The easiest way to control your Novation Launchpad, for Node and web.

## Features

- Driver system ([see below](#supported-devices))
- Advanced commands for each device
- Light, powerful and flexible.

*Note: Only tested with Launchpad X for now.*

## Installation
For NPM:
```bash
  npm install launchpadcore
```
For yarn:
```bash
  yarn add launchpadcore
```

When running in a browser, the library automatically calls
`navigator.requestMIDIAccess()` to request access to the Web MIDI API.

## Supported devices
Launchpad Core offers a driver system to adapt to the different existing models of Novation Launchpad.
### MK1
| Name        | Status                |
| :---------- | :------------------------- |
| Launchpad | 🟪 Planned
| Launchpad S | 🟪 Planned |
| Launchpad Mini | ⬛ *Not planned yet* |

### MK2
| Name        | Status                |
| :---------- | :------------------------- |
| Launchpad | 🟩 Partially available |
| Launchpad Pro | 🟧 Work in progress... |
| Launchpad Mini | ⬛ *Not planned yet* |

### MK3
| Name        | Status                |
| :---------- | :------------------------- |
| Launchpad X | 🟩 Available
| Launchpad Pro | 🟧 Work in progress... |
| Launchpad Mini | 🟩 Available |

## Usage/Examples

Here is a typical example of what can be done with this module.

```javascript
import { createLaunchpadCore } from "launchpadcore";

const App = createLaunchpadCore("LaunchpadX");

App.on("onConnected", (instance, driver) => {
    instance.out.send(driver.textScrolling(15, "Welcome!"))
    instance.out.noteOn(0, 11, 25) // Pad 11 to color 25
})

App.on("onMidiIn", (data) => {
    console.log(data)
})

App.on("onDisabled", () => {
    console.log("Shutdown...")
})

App.on("onDisconnected", () => {
    console.log("Device disconnected")
})
```

## What's can I do ?

### Events
| Name        | Description                |
| :---------- | :------------------------- |
| `onConnected` | When connected to Launchpad |
| `onDisabled` | When disabled (exit the program) |
| `onDisconnected` | When the device disconnects |
| `onMidiIn` | When new MIDI message received |


### MIDI methods
Usable on a MidiService object. Find more at: https://jazz-soft.net/doc/JZZ/.

| Name        | Description                |
| :---------- | :------------------------- |
| `out.send()` | Send whatever you want | 
| `out.noteOn()` | Send noteOn | 
| `out.noteOff()` | Send noteOff | 

### Launchpad features (DriverQuery Builder)
Usable on a Driver object.

| Name        | Description                | Driver |
| :---------- | :------------------------- | :------|
| `setLayout()` | Set your LaunchPad layout | LaunchpadX, Launchpad Mini MK3, Launchpad MK2
| `textScrolling()` | Scroll a text along your launchpad pads | LaunchpadX, Launchpad Mini MK3, Launchpad MK2
| `programmerToggle()` | Toggle to programmer mode | LaunchpadX, Launchpad Mini MK3
| `dawClear()` | Clear DAW layouts | LaunchpadX, Launchpad Mini MK3
| `ledLightning()` | Set pads colors by SysEx | LaunchpadX, Launchpad Mini MK3
| `ledBrightness()` | Set brightness of your launchpad | LaunchpadX, Launchpad Mini MK3
| `ledSleep()` | Disable LED of your launchpad | LaunchpadX, Launchpad Mini MK3
