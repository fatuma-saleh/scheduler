// export function useVisualMode(initial){
// return {mode:initial}
// }
import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
   setMode(newMode)
  if(replace){
    const newHistory=[...history]
    newHistory[newHistory.length-1] = newMode
    setHistory(newHistory)
  }else{
  const newHistory=[...history,newMode]
  setHistory(newHistory)
   // setHistory((pre) => replace ? [...pre.slice(0, -1), mode] : [...pre, mode])
  }
   
  }
  function back() {
  if(history.length > 1){
  const newHistory = [...history]
  newHistory.pop()
  const lastMode = newHistory[newHistory.length-1]
  setMode(lastMode)
  setHistory(newHistory)
  }
  //setHistory((pre) => pre.length > 1 ? pre.slice(0, -1) : pre)

  }
  return { mode, transition, back };
  //return { mode: history[history.length - 1], transition, back };


}

