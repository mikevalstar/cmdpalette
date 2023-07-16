import { lazy, useEffect, useState, Suspense } from 'react';
import { ICmdCommand } from '@cmdpalette/core';
export { type ICmdCommand } from '@cmdpalette/core';

const Palette = lazy(() => import('./Palette'));

interface ICmdPalletProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  commands: ICmdCommand[] | (() => Promise<ICmdCommand[]>) | (() => ICmdCommand[]);
  count?: number;
}

function CmdPalette(props: ICmdPalletProps) {
  const { open, ...dialogProps } = props;
  const [first, setFirst] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setShow((e) => !e);
        setFirst(true);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return first ? (
    <Suspense>
      <Palette open={show} close={() => setShow(false)} {...dialogProps} />
    </Suspense>
  ) : (
    <></>
  );
}

export default CmdPalette;
