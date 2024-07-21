import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'O nome da tarefa é obrigatório'),
  minutesAmount: z
    .number()
    .min(5, 'A tarefa precisa ter ao menos 5minutos')
    .max(60, 'A tarefa pode ter no máximo 60 minutos'),
})

type newCycleFormData = z.infer<typeof newCycleFormSchema>

type Cycle = {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCicleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCicleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutesString = String(minutesAmount).padStart(2, '0')
  const secondsString = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewCycle)}
      className="mx-auto flex w-full max-w-2xl flex-col items-center text-lg font-bold"
    >
      <div className="flex w-full items-center gap-2">
        <label htmlFor="projectName">Vou trabalhar em</label>
        <input
          className="flex-1 border-b-2 border-gray-500 bg-transparent outline-none"
          id="projectName"
          type="text"
          placeholder="Dê um nome para o seu projeto"
          {...register('task')}
        />
        <label htmlFor="timerInMinutes">Durante</label>
        <input
          className="w-16 border-b-2 border-gray-500 bg-transparent outline-none"
          id="timerInMinutes"
          type="number"
          step={5}
          min={5}
          max={60}
          placeholder="00"
          {...register('minutesAmount', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </div>

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

      <button
        className="flex w-full items-center justify-center gap-1 rounded-lg bg-green-500 px-10 py-4 transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-green-500"
        disabled={isSubmitDisabled}
      >
        <Play size={24} />
        Começar
      </button>
    </form>
  )
}
