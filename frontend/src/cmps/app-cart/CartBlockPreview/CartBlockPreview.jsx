import { useDispatch } from 'react-redux'
import {
  removeCartBlcok,
  updateCartBlock,
} from '../../../store/actions/orderActions'
import closeImg from '../../../assets/img/close.svg'
import './CartBlockPreview.scss'

export const CartBlockPreview = ({ block }) => {
  const dispatch = useDispatch()
  const sizeText = () => {
    const { size } = block
    return `${size.slice(0, 2)}x${size.slice(2, 4)} cm`
  }

  const onPresentCoverChange = ({ target }) => {
    dispatch(updateCartBlock({ ...block, isPresentCover: target.checked }))
  }

  const onRemoveBlock = () => {
    dispatch(removeCartBlcok(block.id))
  }

  return (
    <div className='cart-block-preview-container'>
      <div className='cart-block-preview'>
        <div className='block-img-container'>
          <img
            className={`block-img ${block.position} ${`size-${block.size}`}`}
            src={block.imgUrl}
            alt=''
          />
        </div>
        <img
          className='block-preview-img'
          src={
            require(`../../../assets/img/blocks/${block.size}${block.color}.png`)
              .default
          }
          alt=''
        />
        <div className='size-label center-childs'>
          <h2 className='weak'>{sizeText()}</h2>
        </div>
      </div>
      <input
        id={`isPresentCover-${block.id}`}
        type='checkbox'
        hidden
        checked={block.isPresentCover ? true : false}
        name='isPresentCover'
        onChange={(ev) => onPresentCoverChange(ev, block.id)}
      />
      <label className='center-childs' htmlFor={`isPresentCover-${block.id}`}>
        <p>
          עטיפת מתנה <br /> (0₪)
        </p>
        <div className='checkbox center-childs'>
          <div
            className={`checked ${block.isPresentCover ? 'active' : ''}`}
          ></div>
        </div>
        <button
          className='remove-block-button center-childs'
          onClick={onRemoveBlock}
        >
          <img src={closeImg} alt='' />
        </button>
      </label>
    </div>
  )
}
