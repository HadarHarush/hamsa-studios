import { useDispatch, useSelector } from 'react-redux'
import { SizePreview } from '../SizePreview/SizePreview'
import { updateBlcok } from '../../../store/actions/processActions'
import './SizesList.scss'

export const SizesList = (props) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const dispatch = useDispatch()

  const currGlobalSize = blocks[0].size

  const handleSizeClick = (size) => {
    const updatedBlocks = blocks.map((currBlock) => {
      if (currBlock.size !== size) {
        return { ...currBlock, size: size, imgUrl: null, position: null }
      }
      return currBlock
    })
    updatedBlocks.forEach((currBlock) => dispatch(updateBlcok(currBlock)))
  }

  const sizes = ['1010', '1015', '1520', '2030']

  return (
    <div className='sizes-list'>
      {sizes.map((currSize) => (
        <SizePreview
          size={currSize}
          disabled={currSize === '1010'}
          key={currSize}
          currGlobalSize={currGlobalSize}
          handleSizeClick={handleSizeClick}
        />
      ))}
    </div>
  )
}
