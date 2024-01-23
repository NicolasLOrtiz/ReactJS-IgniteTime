import { useContext } from 'react'
import { CyclesContext } from '../pages/Home'

export const useCycles = () => {
  return useContext(CyclesContext)
}
