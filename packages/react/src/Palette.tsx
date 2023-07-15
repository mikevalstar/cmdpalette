import { useState } from "react";

export type PaletteProps = {
  show: boolean
}

function Palette({show} : PaletteProps){
  const [txt, setTxt] = useState("")

  return <dialog open={show}>
    <div>
      <input value={txt} onChange={e => setTxt(e.target.value)}/>
    </div>
    <div>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  </dialog>
}

export default Palette;