import { useState } from 'react'
import closeImg from '../../assets/img/close-grey.svg'
import adImg from '../../assets/img/more-info/presents-ad.jpg'
import galleryItemImg1 from '../../assets/img/more-info/gallery-item1.jpg'
import galleryItemImg2 from '../../assets/img/more-info/gallery-item2.jpg'
import galleryItemImg3 from '../../assets/img/more-info/gallery-item3.jpg'
import galleryItemImg4 from '../../assets/img/more-info/gallery-item4.jpg'
import './MoreInfoModal.scss'

export const MoreInfoModal = (props) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div
      className={`more-info-modal main-container ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(true)}
    >
      <h2>לפרטים נוספים</h2>
      <div className='content'>
        <button
          className='close-button'
          onClick={(ev) => {
            ev.stopPropagation()
            setIsActive(false)
          }}
        >
          <img src={closeImg} alt='' width='18' />
        </button>
        <h1>רכשו פוטו-בלוקס בסכום של 120 והמשלוח עלינו!</h1>
        <div className='ad-container'>
          <h2 className='strong'>מארז אחד - הרבה מתנות</h2>
          <p>
            לבקשתכם, הוספנו אופציה לאריזה נפרדת לכל בלוק. ניתן לבחור בה בסוף
            תהליך ההזמנה
          </p>
          <img src={adImg} alt='' />
        </div>
        <div className='gallery-container'>
          <h2 className='strong'>גלריית תמונות</h2>
          <div className='gallery flex'>
            <img src={galleryItemImg1} alt='' />
            <img src={galleryItemImg2} alt='' />
            <img src={galleryItemImg3} alt='' />
            <img src={galleryItemImg4} alt='' />
          </div>
        </div>
        <div className='reviews-container flex'>
          <div className='review'>
            <p className='strong'>איתמר נוי</p>
            <p className='weak small'>
              אני וחברתי הזמנו לנו שלושה פוטו-בלוקס ויצא ממש ממש יפה!!
            </p>
          </div>
          <div className='review'>
            <p className='strong'>אדיר עלוש</p>
            <p className='weak small'>
              אלופים. שירות מאוד כיפי וגם עזרו לי באופן אשי בתהליך ההזמנה.
              הבלוקים גם מאוד מאוד מגניב
            </p>
          </div>
          <div className='review'>
            <p className='strong'>עמיעד פונפדר</p>
            <p className='weak small'>רמה גבוהה</p>
          </div>
          <div className='review'>
            <p className='strong'>גיא אנידג'ר</p>
            <p className='weak small'>
              חמסה סטודיוז הפכו אותי ללקוח הקבוע שלהם בגלל מקצועיות ואיכות
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
