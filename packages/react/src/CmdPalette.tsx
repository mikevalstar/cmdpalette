import { lazy, useEffect, useState, Suspense } from "react";

const Palette = lazy(() => import("./Palette"));

const testcommands = [
  "test1",
  "test2",
  "Mike Valstar",
  "Mike Vincent",
  "Other",
  "Other2",
  "Other3",
  "Other4",
  "Other5",
  "chickens",
  "chickens2",
  "chickens3",
];

function CmdPalette() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        setShow((e) => !e);
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return show ? (
    <Suspense>
      <Palette show={show} commands={testcommands} />
    </Suspense>
  ) : (
    <></>
  );
}

export default CmdPalette;
