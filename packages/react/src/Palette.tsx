import { useState, useRef, useEffect, useMemo, DialogHTMLAttributes } from 'react';
import CmdCommander, { type ICmdCommand } from '@cmdpalette/core';

export interface IPaletteProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open: boolean;
  count?: number;
  commands: ICmdCommand[] | (() => Promise<ICmdCommand[]>) | (() => ICmdCommand[]);
  close: () => void;
  placeholder?: string;
}

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

function Palette(props: IPaletteProps) {
  const { open, commands, count, close, placeholder, ...dialogProps } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [txt, setTxt] = useState('');
  const [rendFarmer, setRendFarmer] = useState(0);
  const cmdr = useMemo(() => {
    return new CmdCommander(count || 10);
  }, []);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    } else {
      setTxt('');
    }

    // set the key binds
    const onKey = (e: KeyboardEvent) => {
      if (!open) {
        return;
      }

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

    // trap clicking outside the dialog or the backdrop
    const onClick = (e: MouseEvent) => {
      if (!open || !dialogRef.current) {
        return;
      }

      // Bounding box as checking target = wont work if thedialog has padding (default browser behavior)
      var rect = dialogRef.current.getBoundingClientRect();
      var isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        close();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  // only set the commands when they change, and on first load
  useEffect(() => {
    cmdr?.setCommands(commands).then(() => {
      setRendFarmer((e) => e + 1);
    });
  }, [commands]);

  // handle opening and closing the dialog the html way; without this the backdrop doesnt work
  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  const results = cmdr.getList(txt);

  return (
    <dialog {...dialogProps} ref={dialogRef}>
      <header>
        <input value={txt} ref={inputRef} placeholder={placeholder || ''} onChange={(e) => setTxt(e.target.value)} />
      </header>
      <main>
        <section>
          <ul>
            {results.map((item, i) => {
              return (
                <li key={i} className={item.selected ? 'selected' : ''}>
                  <span>
                    <HighlightCharacters positions={item.positions} text={item.command.command} />
                  </span>
                  {item.command.help && <span>{item.command.help}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <footer>
        <div>
          {/*<em>↹ TAB</em>*/} <em>↑</em> <em>↓</em> to navigate
        </div>
        <div>
          <em>⏎ Enter</em> to select
        </div>
        <div>
          <em>Esc</em> to exit
        </div>
      </footer>
    </dialog>
  );
}

export default Palette;
