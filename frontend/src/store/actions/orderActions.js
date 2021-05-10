// Thunk - Action Dispatcher

export function loadCartBlocks() {
  return (dispatch) => {
    const blocks = JSON.parse(localStorage.getItem('cart') || '[]')
    dispatch({
      type: 'SET_CART_BLOCKS',
      blocks,
    })
  }
}

export function setCartBlocks(blocks) {
  return (dispatch) => {
    localStorage.setItem('cart', JSON.stringify(blocks))
    dispatch({
      type: 'SET_CART_BLOCKS',
      blocks,
    })
  }
}

export function addCartBlock(block) {
  return (dispatch, getState) => {
    const { cartBlocks } = getState().orderReducer
    localStorage.setItem('cart', JSON.stringify([...cartBlocks, block]))
    dispatch({
      type: 'ADD_CART_BLOCK',
      block,
    })
  }
}

export function updateCartBlock(block) {
  return (dispatch, getState) => {
    const { cartBlocks } = getState().orderReducer
    localStorage.setItem(
      'cart',
      JSON.stringify([
        ...cartBlocks.map((currBlock) =>
          currBlock.id === block.id ? block : currBlock
        ),
      ])
    )
    dispatch({
      type: 'UPDATE_CART_BLOCK',
      block,
    })
  }
}

export function removeCartBlcok(blockId) {
  return (dispatch, getState) => {
    const { cartBlocks } = getState().orderReducer
    localStorage.setItem(
      'cart',
      JSON.stringify([
        ...cartBlocks.filter((currBlock) => currBlock.id !== blockId),
      ])
    )
    dispatch({ type: 'REMOVE_CART_BLOCK', blockId })
  }
}
