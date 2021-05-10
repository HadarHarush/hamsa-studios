import { useEffect, useRef, useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './AppCropper.scss'
import { AppModal } from '../AppModal/AppModal'
import checkImg from '../../assets/img/check.svg'
import closeImg from '../../assets/img/close.svg'
import rotateCropBoxImg from '../../assets/img/rotate-crop-box.svg'
import rotateLeftImg from '../../assets/img/rotate-left.svg'
import rotateRightImg from '../../assets/img/rotate-right.svg'

export const AppCropper = ({ imgUrl, onCropImg, size, onCloseCropper }) => {
  const [croppedImg, setCroppedImg] = useState(null)
  const cropperRef = useRef(null)
  const getRatio = () => {
    const height = +size.slice(0, 2)
    const width = +size.slice(2, 4)
    return width / height
  }
  const crop = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    const canvas = cropper.getCroppedCanvas()
    const croppedImg = canvas.toDataURL('image/png')
    const lastBox = cropper.getCropBoxData()
    const cropBoxRatio = lastBox.width / lastBox.height
    onCropImg(croppedImg, cropBoxRatio)
  }
  const rotateAspectRatio = () => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    const lastBox = cropper.getCropBoxData()
    const lastRatio = lastBox.width / lastBox.height
    cropper.setAspectRatio(1 / lastRatio)
  }
  const rotateImg = (degree) => {
    const imageElement = cropperRef?.current
    const cropper = imageElement?.cropper
    cropper.rotate(degree)
  }

  return (
    <AppModal>
      <div className='app-cropper-container flex column justify-center'>
        <Cropper
          src={imgUrl}
          style={{ height: 400, width: '100%' }}
          // Cropper.js options
          initialAspectRatio={getRatio()}
          aspectRatio={getRatio()}
          guides={false}
          dragMode={'move'}
          ref={cropperRef}
        />
        <div className='buttons-container center-childs column'>
          <div className='edit-bar flex'>
            <button onClick={() => rotateImg(90)} className='center-childs'>
              <img src={rotateRightImg} alt='' />
            </button>
            <button onClick={rotateAspectRatio} className='center-childs'>
              <img src={rotateCropBoxImg} alt='' />
            </button>
            <button onClick={() => rotateImg(-90)} className='center-childs'>
              <img src={rotateLeftImg} alt='' />
            </button>
          </div>
          <div className='final-bar flex'>
            <button onClick={crop} className='crop center-childs'>
              <img src={checkImg} alt='' />
            </button>
            <button onClick={onCloseCropper} className='close center-childs'>
              <img src={closeImg} alt='' />
            </button>
          </div>
        </div>
        <img src={croppedImg} alt='' />
      </div>
    </AppModal>
  )
}
