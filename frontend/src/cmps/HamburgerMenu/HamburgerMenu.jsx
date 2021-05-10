import './HamburgerMenu.scss'
import logoImg from '../../assets/img/logo-2.svg'
import { AppModal } from '../AppModal/AppModal'
import closeImg from '../../assets/img/close.svg'
import { Link } from 'react-router-dom'

export const HamburgerMenu = ({ isHamburgerOpen, setIsHamburgerOpen }) => {
  return (
    <AppModal
      className={`hamborger-modal-container ${isHamburgerOpen ? 'active' : ''}`}
      closeModal={(ev) => {
        ev.stopPropagation()
        setIsHamburgerOpen(false)
      }}
    >
      <div
        className='hamburger-menu flex column align-center space-between'
        onClick={(ev) => ev.stopPropagation()}
      >
        <button
          className='close-button'
          onClick={(ev) => {
            ev.stopPropagation()
            setIsHamburgerOpen(false)
          }}
        >
          <img src={closeImg} alt='' width='18' />
        </button>
        <nav className='flex column'>
          <Link
            className='strong'
            to='/'
            onClick={() => setIsHamburgerOpen(false)}
          >
            יצירת פוטו-בלוקס
          </Link>
          <Link
            className='strong'
            to='/order/cart'
            onClick={() => setIsHamburgerOpen(false)}
          >
            סל הקניות
          </Link>
          <a className='strong' href='tel:0542546645'>
            צרו קשר
          </a>
        </nav>
        <button>
          <img className='center-childs' src={logoImg} alt='' />
        </button>
      </div>
    </AppModal>
  )
}
