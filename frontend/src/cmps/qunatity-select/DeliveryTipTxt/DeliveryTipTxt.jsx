import { useSelector } from 'react-redux'
import './DeliveryTipTxt.scss'
import trackImg from '../../../assets/img/track.svg'

export const DeliveryTipTxt = (props) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const totalPrice = blocks.reduce((total, currBlock) => {
    return total + currBlock.getPrice()
  }, 0)
  return (
    <div className='delivery-tip-container center-childs'>
      {totalPrice < 120 && (
        <p className='delivery-tip small strong'>
          טיפ! רכשו פוטו-בלוקס בסכום של 120₪ והמשלוח עלינו
        </p>
      )}
      {totalPrice >= 120 && (
        <div className='center-childs column'>
          <img src={trackImg} alt='' />
          <p className='small strong'>ישש, המשלוח עלינו</p>
        </div>
      )}
    </div>
  )
}
