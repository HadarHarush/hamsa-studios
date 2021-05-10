import { useDispatch, useSelector } from 'react-redux'
import { addBlcok, removeBlcok } from '../../../store/actions/processActions'
import plusImg from '../../../assets/img/plus.svg'
import minusImg from '../../../assets/img/minus.svg'
import './QuantityBar.scss'

export const QuantityBar = (props) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const dispatch = useDispatch()

  const handleChange = (val) => {
    const lastBlock = blocks[blocks.length - 1]
    if (val > 0) {
      dispatch(addBlcok({ ...lastBlock, id: null }))
    } else {
      dispatch(removeBlcok(lastBlock.id))
    }
  }

  return (
    <div className='quantity-bar flex'>
      <button
        className='center-childs'
        onClick={() => handleChange(-1)}
        disabled={blocks.length <= 1}
      >
        <img width='15' src={minusImg} alt='' />
      </button>
      <div className='fg-1 center-childs'>
        <p>{blocks.length}</p>
      </div>
      <button
        className='center-childs'
        onClick={() => handleChange(1)}
        disabled={blocks.length >= 10}
      >
        <img width='15' src={plusImg} alt='' />
      </button>
    </div>
  )
}
