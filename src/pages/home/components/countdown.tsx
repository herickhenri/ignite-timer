import { useContext, useEffect } from 'react'
import { CyclesContext } from '../../../contexts/cycles-context'

export function Countdown() {
  const { activeCycle, amountSecondsPassed } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesString = String(minutesAmount).padStart(2, '0')
  const secondsString = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `(${minutesString}:${secondsString}) Ignite Timer`

      return
    }

    document.title = 'Ignite Timer'
  }, [minutesString, secondsString, activeCycle])

  return (
    <div className="mb-14 mt-16 flex items-center gap-4 font-mono">
      <span className="rounded-lg bg-gray-700 px-4 text-[10rem] font-bold leading-[12rem]">
        {minutesString[0]}
      </span>
      <span className="rounded-lg bg-gray-700 px-4 text-[10rem] font-bold leading-[12rem]">
        {minutesString[1]}
      </span>
      <span className="px-4 font-sans text-[10rem] font-bold leading-[12rem] text-green-500">
        :
      </span>
      <span className="rounded-lg bg-gray-700 px-4 text-[10rem] font-bold leading-[12rem]">
        {secondsString[0]}
      </span>
      <span className="rounded-lg bg-gray-700 px-4 text-[10rem] font-bold leading-[12rem]">
        {secondsString[1]}
      </span>
    </div>
  )
}
