import { createLaunchpadCore, autoDetectLaunchpadCore } from "../src/";

//const App = createLaunchpadCore("LaunchpadX");
const App = autoDetectLaunchpadCore();

App.on("onConnected", (instance, driver) => {
    console.log(instance.out.info());
    //instance.out.send(driver.textScrolling(15, "Welcome!"))
    instance.out.send(driver.programmerToggle(true))
    instance.out.noteOn(0, 11, 25) // Pad 11 to color 25
})

App.on("onMidiIn", (data) => {
    console.log(data)
})

App.on("onDisabled", (instance, driver) => {
    instance.out.send(driver.textScrolling(15, "Goodbye!"))
    instance.out.send(driver.programmerToggle(false))
    console.log("Shutdown...")
})

