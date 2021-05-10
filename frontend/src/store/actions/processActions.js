// Thunk - Action Dispatcher
import { makeId } from '../../services/utilService'

export function setBlocks(blocks) {
  return (dispatch) => {
    dispatch({
      type: 'SET_BLOCKS',
      blocks,
    })
  }
}
export function addBlcok(block) {
  return (dispatch) => {
    block.id = makeId()
    dispatch({ type: 'ADD_BLOCK', block })
  }
}
export function updateBlcok(updatedBlock) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_BLOCK', updatedBlock })
  }
}
export function removeBlcok(blockId) {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_BLOCK', blockId })
  }
}
export function resetBlcoks() {
  return (dispatch) => {
    dispatch({ type: 'RESET_BLOCKS' })
  }
}
