import { Cycle, NewCycleFormData } from '../pages/Home'
import { createContext, ReactNode, useReducer, useState } from 'react'
import { cyclesReducer } from '../reducers/cycles/reducer.ts'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions.ts'

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  setAmountSecondsPassed: (amount: number) => void
  amountSecondsPassed: number
  handleInterruptCycle: () => void
  createNewCycle: (data: NewCycleFormData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function createNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function handleInterruptCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        setAmountSecondsPassed,
        amountSecondsPassed,
        handleInterruptCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
