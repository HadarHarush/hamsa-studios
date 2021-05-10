import { useSelector } from 'react-redux'
import './QuantitySummeryTxt.scss'

export const QuantitySummeryTxt = (props) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const getTxt = () => {
    const blocksQuant = blocks.length
    const totalPrice = blocks.reduce((total, currBlock) => {
      return total + currBlock.getPrice()
    }, 0)
    return `בחרת ליצור ${blocksQuant} בלוקים במחיר ₪${totalPrice}`
  }
  return <h2 className='quantity-summery-txt'>{getTxt()}</h2>
}
