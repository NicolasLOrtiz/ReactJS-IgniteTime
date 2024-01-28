import { Cycle, NewCycleFormData } from '../pages/Home'
import { createContext, ReactNode, useReducer, useState } from 'react'

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
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return [...state, action.payload.newCycle]
    }

    return state
  }, [])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
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

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function handleInterruptCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
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
