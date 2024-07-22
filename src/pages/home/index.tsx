import { HandPalm, Play } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { Countdown } from './components/countdown'
import { NewCycleForm } from './components/new-cycle-form'
import { CyclesContext } from '../../contexts/cycles-context'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'O nome da tarefa é obrigatório'),
  minutesAmount: z.coerce
    .number()
    .min(1, 'A tarefa precisa ter ao menos 1 minuto')
    .max(60, 'A tarefa pode ter no máximo 60 minutos'),
})

export type newCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const {
    activeCycle,
    activeCycleId,
    setSecondsPassed,
    interruptCurrentCycle,
    markCurrentCycleAsFinished,
    createNewCycle,
  } = useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    if (!activeCycle) {
      return
    }

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (secondsDifference >= totalSeconds) {
        markCurrentCycleAsFinished()
        setSecondsPassed(totalSeconds)
        clearInterval(interval)

        return
      }

      setSecondsPassed(secondsDifference)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <form
      onSubmit={handleSubmit(handleCreateNewCycle)}
      className="mx-auto flex w-full max-w-2xl flex-col items-center text-lg font-bold"
    >
      <FormProvider {...newCycleForm}>
        <NewCycleForm />
      </FormProvider>
      <Countdown />

      {activeCycle ? (
        <button
          className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg bg-red-500 px-10 py-4 transition-colors hover:bg-red-700"
          type="button"
          onClick={interruptCurrentCycle}
        >
          <HandPalm size={24} />
          Interromper
        </button>
      ) : (
        <button
          className="flex w-full items-center justify-center gap-1 rounded-lg bg-green-500 px-10 py-4 transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-green-500"
          disabled={isSubmitDisabled}
        >
          <Play size={24} />
          Começar
        </button>
      )}
    </form>
  )
}
