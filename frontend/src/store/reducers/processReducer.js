import { makeId } from '../../services/utilService'

const INITIAL_STATE = {
  blocks: [{ id: makeId(), color: 'natural', getPrice }],
}

export function processReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_BLOCKS':
      return {
        ...state,
        blocks: action.blocks,
      }
    case 'ADD_BLOCK':
      return {
        ...state,
        blocks: [...state.blocks, action.block],
      }
    case 'UPDATE_BLOCK':
      const { updatedBlock } = action
      return {
        ...state,
        blocks: state.blocks.map((currBlock) =>
          currBlock.id === updatedBlock.id ? updatedBlock : currBlock
        ),
      }
    case 'REMOVE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.filter(
          (currBlock) => currBlock.id !== action.blockId
        ),
      }
    case 'RESET_BLOCKS':
      return {
        ...state,
        blocks: [{ id: makeId(), color: 'natural', getPrice }],
      }
    default:
      return state
  }
}

function getPrice() {
  let price = 0
  if (this.size === '1010') price += 25
  if (this.size === '1015') price += 30
  if (this.size === '1520') price += 50
  if (this.size === '2030') price += 100
  if (this.color === 'hot' || this.color === 'white') price += 2
  return price
}
