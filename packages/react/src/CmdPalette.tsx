import { lazy, useEffect, useState, Suspense } from 'react';

const Palette = lazy(() => import('./Palette'));

function CmdPalette(){

  const [show, setShow] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k"){
        setShow(e => !e)
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", onKey)
  }, [])

  return show ? <Suspense><Palette show={show} /></Suspense> : <></>;
}

export default CmdPalette;