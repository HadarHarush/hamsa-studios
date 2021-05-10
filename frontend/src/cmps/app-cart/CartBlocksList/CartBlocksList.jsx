import { useSelector } from 'react-redux'
import { CartBlockPreview } from '../CartBlockPreview'
import './CartBlocksList.scss'

export const CartBlocksList = (props) => {
  const cartBlocks = useSelector((state) => state.orderReducer.cartBlocks)

  return (
    <div className='cart-blocks-list main-container flex'>
      {cartBlocks.map((currBlock) => (
        <CartBlockPreview key={currBlock.id} block={currBlock} />
      ))}
    </div>
  )
}
