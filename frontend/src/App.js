import './assets/scss/main.scss'
import './App.scss'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader/AppHeader'
import { MoreInfoModal } from './cmps/MoreInfoModal'
import { ProcessMap } from './cmps/ProcessMap/ProcessMap'
import { SizeSelect } from './pages/SizeSelect'
import { QuantitySelect } from './pages/QuantitySelect'
import { ColorAndImageSelect } from './pages/ColorAndImageSelect/ColorAndImageSelect'
import { AppCart } from './pages/AppCart'
import { useSelector } from 'react-redux'
import { PaymentPage } from './pages/PaymentPage/PaymentPage'

export const App = () => {
  const blocks = useSelector((state) => state.processReducer.blocks)

  // const ProcessRouteGurad = ({ component, path }) => {
  //   if (blocks.every((currBlock) => currBlock.size)) {
  //     return <Route component={component} path={path} />
  //   } else {
  //     return <Redirect to='/order/size-select' />
  //   }
  // }

  return (
    <div className='App'>
      <Router>
        <AppHeader />
        {blocks && <ProcessMap />}
        <Switch>
          <Route component={SizeSelect} path='/order/size-select' />
          {blocks.every((currBlock) => currBlock.size) && (
            <Route component={QuantitySelect} path='/order/quantity-select' />
          )}
          {blocks.every((currBlock) => currBlock.size) && (
            <Route
              component={ColorAndImageSelect}
              path='/order/color-and-image-select'
            />
          )}
          <Route component={AppCart} path='/order/cart' />
          <Route component={PaymentPage} path='/order/payment' />
          <Route path='/'>
            <Redirect to='/order/size-select' />
          </Route>
        </Switch>
        <MoreInfoModal />
      </Router>
    </div>
  )
}
