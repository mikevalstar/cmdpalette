import { useState, useRef, useEffect, useMemo } from 'react';
import CmdCommander, { type CmdCommand } from '@cmdpalette/core';

export type PaletteProps = {
  show: boolean;
  commands: CmdCommand[] | (() => Promise<CmdCommand[]>) | (() => CmdCommand[]);
  close: () => void;
};

function HighlightCharacters({ text, positions }: { text: string; positions: Set<number> }) {
  const textChars = text.split('');
  const nodes = [];

  for (let i = 0; i < textChars.length; i++) {
    const char = textChars[i];
    if (positions.has(i)) {
      nodes.push(<b key={i}>{char}</b>);
    } else {
      nodes.push(char);
    }
  }

  return <>{nodes}</>;
}

function Palette({ show, commands, close }: PaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [txt, setTxt] = useState('');
  const [rendFarmer, setRendFarmer] = useState(0);
  const cmdr = useMemo(() => {
    return new CmdCommander();
  }, []);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    } else {
      setTxt('');
    }

    // set the key binds
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const cur = cmdr?.getCurrent();
        if (cur) {
          setTxt(cur.command);
        }
        setRendFarmer((e) => e + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdr?.movePrev();
        setRendFarmer((e) => e + 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdr?.moveNext();
        setRendFarmer((e) => e + 1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cur = cmdr?.getCurrent();
        if (cur) {
          cur.action(cur);
        }
        close();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [show]);

  // only set the command when they change
  useEffect(() => {
    cmdr?.setCommands(commands).then(() => {
      setRendFarmer((e) => e + 1);
    });
  }, [commands]);

  return (
    <dialog open={show}>
      <div>
        <input value={txt} ref={inputRef} onChange={(e) => setTxt(e.target.value)} />
      </div>
      <div>
        <ul>
          {cmdr.getList(txt, 5).map((item, i) => {
            return (
              <li key={i} className={item.selected ? 'selected' : ''}>
                <HighlightCharacters positions={item.positions} text={item.command.command} />
              </li>
            );
          })}
        </ul>
      </div>
      <div>Key command legend</div>
    </dialog>
  );
}

export default Palette;
