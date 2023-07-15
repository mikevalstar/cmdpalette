import {
  useState,
  useRef,
  useEffect,
  useSyncExternalStore,
  useMemo,
} from "react";
import CmdCommander from "@cmdpalette/core";

export type PaletteProps = {
  show: boolean;
  commands: string[];
};

function Palette({ show, commands }: PaletteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [txt, setTxt] = useState("");
  const [rendFarmer, setRendFarmer] = useState(0);
  const cmdr = useMemo(() => {
    return new CmdCommander(commands);
  }, []);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    } else {
      setTxt("");
    }

    // set the key binds
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setRendFarmer((e) => e + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        cmdr?.movePrev();
        setRendFarmer((e) => e + 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        cmdr?.moveNext();
        setRendFarmer((e) => e + 1);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [show]);

  // only set the command when they change
  useEffect(() => {
    cmdr?.setCommands(commands);
  }, [commands]);

  return (
    <dialog open={show}>
      <div>
        <input
          value={txt}
          ref={inputRef}
          onChange={(e) => setTxt(e.target.value)}
        />
      </div>
      <div>
        <ul>
          {cmdr.getList(txt, 5).map((item, i) => {
            return (
              <li key={i} className={item.selected ? "selected" : ""}>
                {item.command}
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
