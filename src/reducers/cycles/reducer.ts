import { CyclesState } from '../../contexts/cycles-context'
import { ActionTypes } from './actions'

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return {
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, interruptedDate: new Date() }
            : cycle,
        ),
        activeCycleId: null,
      }

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        cycles: state.cycles.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, finishedDate: new Date() }
            : cycle,
        ),
        activeCycleId: null,
      }

    default:
      return state
  }
}
