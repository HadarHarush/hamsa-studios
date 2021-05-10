import './BlocksList.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/pagination/pagination.scss'
import { BlockPreview } from '../BlockPreview/BlockPreview'

export const BlocksList = ({ setCurrBlockId, isAllowUploadImg }) => {
  const blocks = useSelector((state) => state.processReducer.blocks)

  SwiperCore.use([Pagination])

  return (
    <Swiper
      pagination={{ clickable: true }}
      slidesPerView={1}
      onSlideChange={({ activeIndex }) =>
        setCurrBlockId ? setCurrBlockId(blocks[activeIndex].id) : null
      }
      onSwiper={({ activeIndex }) =>
        setCurrBlockId ? setCurrBlockId(blocks[activeIndex].id) : null
      }
      centeredSlides={true}
      className='blocks-list'
    >
      {blocks &&
        blocks.map((currBlock) => (
          <SwiperSlide className='block-preview-slide' key={currBlock.id}>
            <BlockPreview
              block={currBlock}
              isAllowUploadImg={isAllowUploadImg}
            />
          </SwiperSlide>
        ))}
    </Swiper>
  )
}
