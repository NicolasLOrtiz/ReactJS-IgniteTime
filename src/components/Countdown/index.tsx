import { CountdownContainer, Separator } from './styles'

export function Countdown({
  minutes,
  seconds,
}: {
  minutes: string
  seconds: string
}) {
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
