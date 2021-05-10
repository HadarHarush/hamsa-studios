import './SizePreview.scss'
import block1010Img from '../../../assets/img/blocks/1010natural.png'
import block1015Img from '../../../assets/img/blocks/1015natural.png'
import block1520Img from '../../../assets/img/blocks/1520natural.png'
import block2030Img from '../../../assets/img/blocks/2030natural.png'

export const SizePreview = ({
  size,
  currGlobalSize,
  handleSizeClick,
  disabled,
}) => {
  const imgSrc = () => {
    if (size == 1010) return block1010Img
    if (size == 1015) return block1015Img
    if (size == 1520) return block1520Img
    if (size == 2030) return block2030Img
  }
  const sizeText = () => {
    return `${size.slice(0, 2)}x${size.slice(2, 4)} cm`
  }
  const sizePriceText = () => {
    if (size == 1010) return '20₪'
    if (size == 1015) return '30₪'
    if (size == 1520) return '50₪'
    if (size == 2030) return '100₪'
  }

  return (
    <div
      onClick={disabled ? () => '' : () => handleSizeClick(size)}
      className={`size-preview flex column ${
        currGlobalSize === size ? 'active' : ''
      } ${disabled ? 'disabled' : ''}`}
    >
      <img src={imgSrc()} alt='block' />
      <div className='content fg-1 flex space-between align-center'>
        <h2 className='weak'>{sizeText()}</h2>
        <h2>{sizePriceText()}</h2>
      </div>
    </div>
  )
}
