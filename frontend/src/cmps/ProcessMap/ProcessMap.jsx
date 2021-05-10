import { useHistory, useLocation } from 'react-router'
import backImg from '../../assets/img/arrow-right.svg'
import './ProcessMap.scss'

export const ProcessMap = () => {
  const { pathname } = useLocation()
  const history = useHistory()
  const activeClass = (name) => {
    return pathname.includes(name) ? 'active' : ''
  }

  const goBack = () => {
    if (pathname.includes('size-select')) return
    if (pathname.includes('quantity-select') || pathname.includes('cart')) {
      history.push('/order/size-select')
    }
    if (pathname.includes('color-and-image-select')) {
      history.push('/order/quantity-select')
    }
  }

  return (
    <div className='process-map main-container'>
      <div className='box flex column'>
        <div className='titles flex space-between align-center'>
          {pathname.includes('size-select') && (
            <p className={activeClass('size-select')}>בחירת גודל</p>
          )}
          {!pathname.includes('size-select') && (
            <button className='back-button flex align-center' onClick={goBack}>
              <img src={backImg} alt='' width='8' />
              <p>חזרה</p>
            </button>
          )}
          <p className={activeClass('quantity-select')}>בחירת כמות</p>
          <p className={activeClass('color-and-image-select')}>תמונה וסגנון</p>
          <p className={activeClass('cart')}>תשלום</p>
        </div>
        <div className='line flex space-between'>
          <div
            className={`circle size-select-circle ${activeClass(
              'size-select'
            )}`}
          ></div>
          <div
            className={`circle quantity-select-circle ${activeClass(
              'quantity-select'
            )}`}
          ></div>
          <div
            className={`circle color-and-image-select-circle ${activeClass(
              'color-and-image-select'
            )}`}
          ></div>
          <div className={`circle payment-circle ${activeClass('cart')}`}></div>
        </div>
      </div>
    </div>
  )
}
