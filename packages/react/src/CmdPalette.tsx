import { lazy, useEffect, useState, Suspense } from 'react';
import { ICmdCommand } from '@cmdpalette/core';
export { type ICmdCommand } from '@cmdpalette/core';

const Palette = lazy(() => import('./Palette'));

interface ICmdPalletProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  commands: ICmdCommand[] | (() => Promise<ICmdCommand[]>) | (() => ICmdCommand[]);
  count?: number;
  open?: boolean;
  placeholder?: string;
  keyCommandCheck?: (e: KeyboardEvent) => boolean;
}

function CmdPalette(props: ICmdPalletProps) {
  const { open, keyCommandCheck, ...dialogProps } = props;
  const [first, setFirst] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (keyCommandCheck && keyCommandCheck(e)) {
        setShow((e) => !e);
        setFirst(true);
        e.preventDefault();
      } else if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
        setShow((e) => !e);
        setFirst(true);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return first || open ? (
    <Suspense>
      <Palette open={show || open || false} close={() => setShow(false)} {...dialogProps} />
    </Suspense>
  ) : (
    <></>
  );
}

export default CmdPalette;
