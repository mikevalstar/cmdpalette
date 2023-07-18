import CmdPalette, { type ICmdCommand } from '../src/CmdPalette';

import styles from './App.module.scss';

interface IMyCommand extends ICmdCommand {
  meta?: string;
}

const subCommands1: Array<IMyCommand> = [
  { command: 'sub1', action: (cmd) => console.log(cmd.command) },
  { command: 'sub2', action: (cmd) => console.log(cmd.command) },
  { command: 'sub3', action: (cmd) => console.log(cmd.command) },
];

const testcommands = async (): Promise<Array<IMyCommand>> => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    {
      command: 'test1',
      help: 'this is helper text',
      action: (cmd) => console.log(cmd.command, cmd.meta),
      subCommands: subCommands1,
      meta: 'metadata',
    },
    { command: 'test2', action: (cmd) => console.log(cmd.command) },
    { command: 'test3', action: (cmd) => console.log(cmd.command) },
    {
      command: 'Mike Valstar',
      help: 'makes this website and stuff',
      action: (cmd) => console.log(cmd.command),
      subCommands: subCommands1,
    },
    {
      command: 'Mike Vincent',
      help: 'This is some really long text talking about how I once knew this guy with this name and im using it now to illustrate a point for elipsis',
      action: (cmd) => console.log(cmd.command),
      subCommands: subCommands1,
    },
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

function App() {
  return (
    <div>
      <h2>React App here</h2>

      <CmdPalette placeholder={'Search'} commands={testcommands} className={styles['test']} count={10} />
    </div>
  );
}

export default App;
