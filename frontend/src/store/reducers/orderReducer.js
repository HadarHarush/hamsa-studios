const INITIAL_STATE = {
  cartBlocks: JSON.parse(localStorage.getItem('cart') || '[]'),
}

export function orderReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CART_BLOCKS':
      return {
        ...state,
        cartBlocks: action.blocks,
      }
    case 'ADD_CART_BLOCK':
      return {
        ...state,
        cartBlocks: [...state.cartBlocks, action.block],
      }
    case 'UPDATE_CART_BLOCK':
      console.log('case')
      return {
        ...state,
        cartBlocks: state.cartBlocks.map((currBlock) =>
          currBlock.id === action.block.id ? action.block : currBlock
        ),
      }
    case 'REMOVE_CART_BLOCK':
      return {
        ...state,
        cartBlocks: state.cartBlocks.filter(
          (currBlock) => currBlock.id !== action.blockId
        ),
      }
    default:
      return state
  }
}
