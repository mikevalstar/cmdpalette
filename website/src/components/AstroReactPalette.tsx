import CmdPalette from '@cmdpalette/react';

import styles from './palette.module.scss';

interface IMyCommand extends ICmdCommand {
  meta?: string;
}

const testcommands = async (): Promise<Array<IMyCommand>> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    { command: 'test1', action: (cmd) => console.log(cmd.command, cmd.meta), meta: 'metadata' },
    { command: 'test2', action: (cmd) => console.log(cmd.command) },
    { command: 'test3', action: (cmd) => console.log(cmd.command) },
    { command: 'Mike Valstar', action: (cmd) => console.log(cmd.command) },
    { command: 'Mike Vincent', action: (cmd) => console.log(cmd.command) },
    { command: 'forms', action: (cmd) => console.log(cmd.command) },
    { command: 'views', action: (cmd) => console.log(cmd.command) },
    { command: 'test4', action: (cmd) => console.log(cmd.command) },
    { command: 'other 1', action: (cmd) => console.log(cmd.command) },
    { command: 'other 2', action: (cmd) => console.log(cmd.command) },
    { command: 'other 3', action: (cmd) => console.log(cmd.command) },
    { command: 'other 4', action: (cmd) => console.log(cmd.command) },
    { command: 'other 5', action: (cmd) => console.log(cmd.command) },
  ];
};

function CmdPaletted() {
  return <CmdPalette commands={testcommands} className={styles['palette']} count={10} />;
}

export default CmdPaletted;