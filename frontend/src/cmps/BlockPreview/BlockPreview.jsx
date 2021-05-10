import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlcok } from '../../store/actions/processActions'
import { AppCropper } from '../AppCropper/AppCropper'
import uploadImg from '../../assets/img/upload.svg'
import './BlockPreview.scss'

export const BlockPreview = ({ block, isAllowUploadImg }) => {
  const dispatch = useDispatch()
  const [isCropperOpen, setIsCropperOpen] = useState(false)
  const [srcToCropper, setSrcToCropper] = useState(null)

  const onImgInput = (ev) => {
    let reader = new FileReader()
    reader.onload = ({ target }) => {
      setSrcToCropper(target.result)
      setIsCropperOpen(true)
    }
    reader.readAsDataURL(ev.target.files[0])
  }

  const onCropImg = (imgUrl, ratio) => {
    dispatch(
      updateBlcok({ ...block, imgUrl, position: ratio >= 1 ? 'lay' : 'stand' })
    )
    setIsCropperOpen(false)
  }

  const sizeText = () => {
    const { size } = block
    return `${size.slice(0, 2)}x${size.slice(2, 4)} cm`
  }

  return (
    <div className='block-preview-container flex justify-center'>
      <input
        hidden
        disabled={!isAllowUploadImg}
        type='file'
        accept='image/x-png,image/jpeg'
        id={`${block.id}ImgInput`}
        onChange={onImgInput}
      />
      <label htmlFor={`${block.id}ImgInput`}>
        {isAllowUploadImg && !block.imgUrl && (
          <div className='upload-button'>העלו תמונה</div>
        )}
        <div className='block-img-container'>
          {/* {isAllowUploadImg && (
            <img
              className={`block-img ${
                block.position ? block.position : ''
              } ${`size-${block.size}`}`}
              src={block.imgUrl ? block.imgUrl : uploadImg}
              alt=''
            />
          )} */}
          {block.imgUrl && (
            <img
              className={`block-img ${
                block.position ? block.position : ''
              } ${`size-${block.size}`}`}
              src={block.imgUrl}
              alt=''
            />
          )}
        </div>
        <img
          className='block-preview-img'
          src={
            require(`../../assets/img/blocks/${block.size}${block.color}.png`)
              .default
          }
          alt=''
        />
      </label>
      <div className='size-label center-childs'>
        <h2 className='weak'>{sizeText()}</h2>
      </div>
      {isCropperOpen && (
        <AppCropper
          onCropImg={onCropImg}
          imgUrl={srcToCropper}
          size={block.size}
          onCloseCropper={() => {
            setIsCropperOpen(false)
          }}
        />
      )}
    </div>
  )
}
