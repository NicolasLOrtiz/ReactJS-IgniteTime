import { Cycle, NewCycleFormData } from '../pages/Home'
import { createContext, ReactNode, useState } from 'react'

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  setAmountSecondsPassed: (amount: number) => void
  amountSecondsPassed: number
  handleInterruptCycle: () => void
  handleCreateNewCycle: (data: NewCycleFormData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [cycles, setCycles] = useState<Cycle[]>([])

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        setAmountSecondsPassed,
        amountSecondsPassed,
        handleInterruptCycle,
        handleCreateNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
