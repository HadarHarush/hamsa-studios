import './ColorSelect.scss'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlcok } from '../../../store/actions/processActions'
import arrowDownImg from '../../../assets/img/arrow-down.svg'
import { useEffect, useState } from 'react'

export const ColorSelect = ({ currBlockId }) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)

  const colors = ['natural', 'hot', 'white']

  const currBlock = blocks.find(({ id }) => id === currBlockId)

  const onSelectColor = (color) => {
    dispatch(updateBlcok({ ...currBlock, color }))
  }

  const getPriceForColor = (color) => {
    if (color === 'natural') return 0
    if (color === 'hot') return 2
    if (color === 'white') return 2
  }

  const getColorTxt = (color) => {
    if (color === 'natural') return 'עץ טבעי'
    if (color === 'hot') return 'חם מהתנור'
    if (color === 'white') return 'לבן'
  }

  return (
    <div className='color-select-bar' onClick={() => setIsOpen(!isOpen)}>
      {currBlock && (
        <div
          className={`chosen-option ${currBlock.color} option-grid select-box align-center`}
        >
          <div className='item flex justify-start align-center'>
            <p className='small'>{getColorTxt(currBlock.color)}</p>
          </div>
          <div className='item flex align-center'>
            <div className='block-color-square'></div>
          </div>
          <div className='item flex align-center space-between'>
            <p className='price-txt'>{getPriceForColor(currBlock.color)}₪</p>
            <img src={arrowDownImg} alt='' />
          </div>
        </div>
      )}
      {currBlock && (
        <div className='options-box select-box' hidden={!isOpen}>
          {colors.map((currColor) => (
            <div
              key={currColor}
              className={`option-grid option natural ${currColor} ${
                currBlock.color === currColor ? 'active' : ''
              }`}
              onClick={() => onSelectColor(currColor)}
            >
              <div className='item flex justify-start align-center'>
                <p className='small'>{getColorTxt(currColor)}</p>
              </div>
              <div className='item flex align-center'>
                <div className='block-color-square natural'></div>
              </div>
              <div className='item flex align-center justify-start'>
                <p className='price-txt'>
                  {getPriceForColor(currColor)}₪ בתוספת
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
