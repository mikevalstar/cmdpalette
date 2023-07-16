import CmdPalette from '@cmdpalette/react';

import styles from './palette.module.scss';

interface IMyCommand extends ICmdCommand {
  meta?: string;
}

function saySelected(cmd: IMyCommand) {
  const el = document.getElementById('selectedCmdElement');

  if (el) {
    el.classList.remove('hide');
    el.innerText = 'You selected: ' + cmd.command + ' with a rating of ' + cmd.meta;
  }
}

const testcommands = async (): Promise<Array<IMyCommand>> => {
  // fetch /actors.json
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

function CmdPaletted() {
  return <CmdPalette key="pallet" commands={testcommands} className={styles['palette']} count={10} />;
}

export default CmdPaletted;
