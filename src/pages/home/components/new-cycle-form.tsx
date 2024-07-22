import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/cycles-context'
import { Minus, Plus } from '@phosphor-icons/react'
import { newCycleFormData } from '..'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register, control, setValue, watch } =
    useFormContext<newCycleFormData>()

  const minutesAmount = watch('minutesAmount')

  return (
    <div className="flex w-full items-center gap-2">
      <label htmlFor="projectName">Vou trabalhar em</label>
      <input
        className="flex-1 border-b-2 border-gray-500 bg-transparent outline-none"
        id="projectName"
        type="text"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />
      <label htmlFor="timerInMinutes">Durante</label>
      <div className="flex w-16 items-center justify-between border-b-2 border-gray-500">
        <Plus
          size={16}
          className="cursor-pointer"
          onClick={() =>
            setValue(
              'minutesAmount',
              minutesAmount < 60 ? Number(minutesAmount) + 5 : 60,
            )
          }
        />
        <Controller
          control={control}
          name="minutesAmount"
          render={({ field }) => (
            <input
              className="w-6 bg-transparent text-center outline-none"
              id="timerInMinutes"
              type="text"
              placeholder="00"
              disabled={!!activeCycle}
              value={field.value}
              onChange={(e) =>
                field.onChange(e.target.value.replace(/\D/g, ''))
              }
              maxLength={2}
            />
          )}
        />

        <Minus
          size={16}
          className="cursor-pointer"
          onClick={() =>
            setValue(
              'minutesAmount',
              minutesAmount > 0 ? Number(minutesAmount) - 5 : 0,
            )
          }
        />
      </div>
      <span>minutos.</span>
    </div>
  )
}
