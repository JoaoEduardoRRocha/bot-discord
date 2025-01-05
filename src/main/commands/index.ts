import { startCommand, startController } from './start';
import { resCommand, resController } from './res';

export const commands = [
  { command: startCommand, handle: startController.handle },
  { command: resCommand, handle: resController.handle },
];
