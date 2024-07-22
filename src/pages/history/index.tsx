import { useContext } from 'react'
import { CyclesContext } from '../../contexts/cycles-context'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function History() {
  const { cycles } = useContext(CyclesContext)

  return (
    <div className="space-8">
      <h1 className="text-2xl font-bold">Meu histórico</h1>

      <div>
        <table className="w-full text-start">
          <thead>
            <tr className="only:bg-gray-600">
              <th className="rounded-ss-lg py-4 pl-6 text-start text-sm">
                Tarefa
              </th>
              <th className="py-4 text-start text-sm">Duração</th>
              <th className="py-4 text-start text-sm">Início</th>
              <th className="rounded-se-lg py-4 pr-6 text-start text-sm">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id} className="border-t-4 border-gray-800">
                <td className="w-1/2 bg-gray-700 py-4 pl-6 text-sm text-gray-300">
                  {cycle.task}
                </td>
                <td className="bg-gray-700 py-4 text-sm text-gray-300">
                  {cycle.minutesAmount} minutos
                </td>
                <td className="bg-gray-700 py-4 text-sm text-gray-300">
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td className="flex items-center gap-2 bg-gray-700 py-4 pr-6 text-sm text-gray-300">
                  {cycle.finishedDate && (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Concluído
                    </>
                  )}

                  {cycle.interruptedDate && (
                    <>
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      Interrompido
                    </>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <>
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      Em andamento
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
