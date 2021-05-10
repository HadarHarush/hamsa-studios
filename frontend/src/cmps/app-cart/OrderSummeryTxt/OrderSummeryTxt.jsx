import './OrderSummeryTxt.scss'
import { getPriceByBlock } from '../../../services/utilService'

export const OrderSummeryTxt = ({ cartBlocks }) => {
  const res = () => {
    const blocksSizesGroups = cartBlocks.reduce((arr, currBlock) => {
      console.log('arr:', arr)
      const currSizeIdx = arr.findIndex(({ size }) => size === currBlock.size)
      let arrCopy = JSON.parse(JSON.stringify(arr))

      if (currSizeIdx > -1) {
        arrCopy[currSizeIdx] = {
          ...arrCopy[currSizeIdx],
          blocks: [...arrCopy[currSizeIdx].blocks, currBlock],
        }
      } else {
        arrCopy = [...arrCopy, { size: currBlock.size, blocks: [currBlock] }]
      }
      return arrCopy
    }, [])
    console.log('blocksSizes:', blocksSizesGroups)
    return blocksSizesGroups.map((currGroup, idx) => (
      <h2 key={currGroup.size}>
        {`${idx === 0 ? 'הזמנת' : 'וגם'} ${
          currGroup.blocks.length
        } פוטו-בלוקס בגודל ${
          currGroup.size.slice(0, 2) + 'x' + currGroup.size.slice(2, 4) + 'cm'
        }`}
        <br />
      </h2>
    ))
  }
  return (
    <div className='order-summery-txt'>
      {res()}
      <h2>
        סה"כ הזמנה:{' '}
        {cartBlocks.reduce((total, currBlock) => {
          return total + getPriceByBlock(currBlock)
        }, 0)}
        ₪
      </h2>
    </div>
  )
}
