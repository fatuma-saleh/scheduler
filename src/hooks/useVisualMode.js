// export function useVisualMode(initial){
// return {mode:initial}
// }
import { useState } from "react";

export default function useVisualMode(initial) {

  //const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(mode, replace = false) {
     setHistory((pre)=> replace?[...pre.slice(0,-1),mode]:[...pre,mode])
    // setMode(mode);
    // if (!replace) {
    //   history.push(mode)
    //   setHistory(history)
    //   //setMode(history)
    // }
    // else {
    //   history.slice(0, -1)
    //   //history.push(newMode)
    //   console.log("skipped history",history)
    //   setHistory(history)
    // }
  }
  function back() {
     //if (history.length > 1) {
    //   history.pop()
    //   setHistory(history)
      //setMode(history[history.length - 1])
    // }
setHistory((pre)=>pre.length>1?pre.slice(0,-1): pre)

  }
  //return { mode, transition, back };
  return { mode:history[history.length-1], transition, back };


}

