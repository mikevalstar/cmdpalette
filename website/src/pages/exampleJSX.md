```jsx
import CmdPalette, { type ICmdCommand } from '../src/CmdPalette';

import styles from './palette.module.scss';

interface IMyCommand extends ICmdCommand {
  meta?: string;
}

function saySelected(cmd: IMyCommand) {
  const el = document.getElementById('selectedCmdElement');

  if (el) {
    el.innerText = 'You selected: ' + cmd.command + ' with a rating of: ' + cmd.meta;
  }
}

const testcommands = async (): Promise<Array<IMyCommand>> => {
  const actors = await fetch('/actors.json');
  const actorList = await actors.json();

  return actorList.map((actor) => {
    return {
      command: actor.name,
      action: saySelected,
      meta: actor.rating,
    };
  });
};

function App() {
  return <CmdPalette commands={testcommands} className={styles['palette1']} count={10} />;
}

export default App;
```
