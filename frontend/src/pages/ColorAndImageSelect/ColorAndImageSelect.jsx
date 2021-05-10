import './ColorAndImageSelect.scss'
import { useEffect, useState } from 'react'
import { BlocksList } from '../../cmps/BlocksList'
import { ProcessTitle } from '../../cmps/ProcessTitle'
import { ColorSelect } from '../../cmps/color-and-image-select/ColorSelect'
import { PrimaryButton } from '../../cmps/min/PrimaryButton/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImgFromDataUri } from '../../services/cloudinaryService'
import { imgCompressionService } from '../../services/imgCompressionService'
import { resetBlcoks } from '../../store/actions/processActions'
import { addCartBlock } from '../../store/actions/orderActions'

export const ColorAndImageSelect = ({ history }) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  const dispatch = useDispatch()
  const [currBlockId, setCurrBlockId] = useState(null)
  const [isLoading, setIsLoading] = useState({ submit: false })

  const isCanOrder = () => {
    return blocks.every(
      (currBlock) =>
        currBlock.size &&
        currBlock.color &&
        currBlock.imgUrl &&
        currBlock.position
    )
  }

  const commitOrder = async () => {
    setIsLoading({ ...isLoading, submit: true })
    try {
      const compressedImgsDatasPrm = blocks.map(({ imgUrl }) =>
        imgCompressionService.getCompressedImgData(imgUrl)
      )
      const compressedImgsDatas = await Promise.all(compressedImgsDatasPrm)

      const blocksImgsUploadsPrm = compressedImgsDatas.map((compressedImg) =>
        uploadImgFromDataUri(compressedImg)
      )
      const blocksImgsUploads = await Promise.all(blocksImgsUploadsPrm)
      const imgsUrls = blocksImgsUploads.map(({ url }) => url)
      const orderBlocks = JSON.parse(
        JSON.stringify(
          blocks.map((currBlock, idx) => {
            return {
              ...currBlock,
              imgUrl: imgsUrls[idx],
              createdAt: Date.now(),
            }
          })
        )
      )
      orderBlocks.forEach((currBlock) => dispatch(addCartBlock(currBlock)))
      dispatch(resetBlcoks())
      history.push('/order/cart')
    } catch (err) {
      setIsLoading({ ...isLoading, submit: false })
      throw err
    } finally {
    }
  }

  return (
    <section className='color-and-image-select fg-1 flex column'>
      <main>
        <ProcessTitle text='בחרו לכל בלוק תמונה וסגנון'>
          <p className='small'>
            אל דאגה, תמונות מהנייד מודפסות באיכות מעולה במצב שכיבה או במצב עמידה
          </p>
        </ProcessTitle>
        <BlocksList
          setCurrBlockId={setCurrBlockId}
          isAllowUploadImg={true}
          setCurrBlockId={setCurrBlockId}
        />
        <ColorSelect currBlockId={currBlockId} />
      </main>
      <PrimaryButton
        txt={'הוספה לסל ותשלום'}
        onClick={commitOrder}
        disabled={!isCanOrder()}
        isLoading={isLoading.submit}
      />
    </section>
  )
}
