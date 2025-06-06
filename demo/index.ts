import { createLaunchpadCore } from "../src/";

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