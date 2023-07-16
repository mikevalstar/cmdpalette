import { lazy, useEffect, useState, Suspense } from 'react';
import { type CmdCommand } from '@cmdpalette/core';

const Palette = lazy(() => import('./Palette'));

const testcommands = async (): Promise<Array<CmdCommand>> => {
  // await a 2 second timeout
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [
    { command: 'test1', action: (cmd) => console.log(cmd.command) },
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

function CmdPalette() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setShow((e) => !e);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return show ? (
    <Suspense>
      <Palette show={show} commands={testcommands} close={() => setShow(false)} />
    </Suspense>
  ) : (
    <></>
  );
}

export default CmdPalette;
