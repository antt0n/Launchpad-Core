import Driver from './driver';
// Drivers
import LaunchpadMK1 from './MK1/Launchpad';
import LaunchpadSMK1 from './MK1/LaunchpadS';

import LaunchpadMK2 from './MK2/Launchpad';
import LaunchpadProMK2 from './MK2/LaunchpadPro';

import LaunchpadXMK3 from './MK3/LaunchpadX';
import LaunchpadMiniMK3 from './MK3/LaunchpadMini';
import LaunchpadProMK3 from './MK3/LaunchpadPro';

export const driverMap = {
  // MK1
  LaunchpadMK1: new LaunchpadMK1(),
  LaunchpadSMK1: new LaunchpadSMK1(),
  // MK2
  LaunchpadMK2: new LaunchpadMK2(),
  LaunchpadProMK2: new LaunchpadProMK2(),
  // MK3
  LaunchpadX: new LaunchpadXMK3(),
  LaunchpadMiniMK3: new LaunchpadMiniMK3(),
  LaunchpadProMK3: new LaunchpadProMK3(),
} as const;

export type DriverMap = typeof driverMap;
export type StringDrivers = keyof DriverMap;
export type Drivers = DriverMap[StringDrivers];

class DriverManager {
  public static getDriver<T extends StringDrivers>(driverName: T): DriverMap[T] {
    const driver = driverMap[driverName];
    if (!driver) throw new Error('DriverManager: driver not found');
    return driver;
  }
}
export default DriverManager;
