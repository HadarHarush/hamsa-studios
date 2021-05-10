import './AppHeader.scss'
import cartImg from '../../assets/img/cart.svg'
import waffleImg from '../../assets/img/waffle.svg'
import { useHistory, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { HamburgerMenu } from '../HamburgerMenu'
import { useState } from 'react'

export const AppHeader = (props) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const cartBlocks = useSelector((state) => state.orderReducer.cartBlocks)
  return (
    <div className='app-header main-container flex space-between align-center'>
      <button className='menu-button' onClick={() => setIsHamburgerOpen(true)}>
        <img src={waffleImg} alt='menu' />
        <HamburgerMenu
          isHamburgerOpen={isHamburgerOpen}
          setIsHamburgerOpen={setIsHamburgerOpen}
        />
      </button>
      <button
        className='cart-button'
        onClick={() => history.push('/order/cart')}
      >
        <img src={cartImg} alt='cart' />
        {!pathname.includes('/order/cart') && (
          <div className='items-quantity-container center-childs'>
            <p className='strong'>{cartBlocks.length}</p>
          </div>
        )}
      </button>
    </div>
  )
}
