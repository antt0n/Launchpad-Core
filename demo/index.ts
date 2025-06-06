import { autoDetectLaunchpadCore } from '../src';

(async () => {
  const app = await autoDetectLaunchpadCore();
  app.on('onConnected', (instance, driver) => {
    // instance.out.send(driver.textScrolling(15, 'Welcome!'))
    instance.out.send(driver.programmerToggle(true));
    instance.out.noteOn(0, 11, 25); // Pad 11 to color 25
  });
  app.on('onMidiIn', (data) => {
    console.log(data);
  });

  app.on('onDisabled', (instance, driver) => {
    instance.out.send(driver.textScrolling(15, 'Goodbye!'));
    instance.out.send(driver.programmerToggle(false));
    console.log('Shutdown...');
  });
})();
    instance.out.send(driver.textScrolling(15, "Goodbye!"))
    instance.out.send(driver.programmerToggle(false))
    console.log("Shutdown...")
})

