import { useContext } from 'react'
import { CyclesContext } from '../contexts/CyclesContext.tsx'

export const useCycles = () => {
  return useContext(CyclesContext)
}
