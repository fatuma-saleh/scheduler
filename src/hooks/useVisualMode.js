import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {

    setMode(newMode)

    if (replace) {
      const newHistory = [...history]
      newHistory[newHistory.length - 1] = newMode
      setHistory(newHistory)
    } else {
      const newHistory = [...history, newMode]
      setHistory(newHistory)

    }

  }
  function back() {
    if (history.length > 1) {
      const newHistory = [...history]
      newHistory.pop()
      const lastMode = newHistory[newHistory.length - 1]
      setMode(lastMode)
      setHistory(newHistory)
    }

  }
  return { mode, transition, back };

}

