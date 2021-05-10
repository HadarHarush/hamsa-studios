import { OrderSummeryTxt } from '../../cmps/app-cart/OrderSummeryTxt'
import { useForm } from '../../hooks/useForm'
import './AppCart.scss'
import { useSelector } from 'react-redux'
import { CartBlocksList } from '../../cmps/app-cart/CartBlocksList'
import { CartFormInput } from '../../cmps/app-cart/CartFormInput'
import { PrimaryButton } from '../../cmps/min/PrimaryButton'
import { orderService } from '../../services/orderService'
import Ripples from 'react-ripples'
import { useState } from 'react'

export const AppCart = ({ history }) => {
  const cartBlocks = useSelector((state) => state.orderReducer.cartBlocks)
  const [orderDetails, handleChange] = useForm({
    fullname: '',
    email: '',
    city: '',
    addressStreet: '',
    addressAppartmentNumber: null,
    addressBuildingNumber: null,
    postalCode: null,
    phone: null,
    approvalForPublic: false,
  })

  const [isLoading, setIsLoading] = useState({ submit: false })

  const requiredOrderDetails = [
    'fullname',
    'city',
    'addressStreet',
    'addressAppartmentNumber',
    'postalCode',
    'phone',
  ]

  const sendOrder = async () => {
    setIsLoading({ ...isLoading, submit: true })
    const order = { orderDetails, blocks: cartBlocks }
    try {
      const updatedOrder = await orderService.sendOrder(order)
      history.push('/order/payment')
    } catch (err) {
      console.log('error while trying to send order to server: ', err)
      setIsLoading({ ...isLoading, submit: false })
      throw err
    }
  }

  return (
    <section className='app-cart fg-1 flex column'>
      <main className='fg-1'>
        <OrderSummeryTxt cartBlocks={cartBlocks} />
        <CartBlocksList />
        <form className='flex column fg-1 main-container'>
          <CartFormInput
            handleChange={handleChange}
            isValidated={orderDetails.fullname}
            inputName='fullname'
            inputType='text'
            labelTxt='שם מלא'
            placeholder='ישראל ישראלי'
            isRequired={requiredOrderDetails.includes('fullname')}
          />
          <CartFormInput
            handleChange={handleChange}
            isValidated={orderDetails.phone?.length > 9}
            inputName='phone'
            inputType='phone'
            labelTxt='נייד'
            placeholder='0521234567'
            isRequired={requiredOrderDetails.includes('phone')}
          />
          <CartFormInput
            handleChange={handleChange}
            isValidated={orderDetails.city}
            inputName='city'
            inputType='text'
            labelTxt='עיר'
            placeholder='תל אביב'
            isRequired={requiredOrderDetails.includes('city')}
          />
          <CartFormInput
            handleChange={handleChange}
            isValidated={orderDetails.addressStreet}
            inputName='addressStreet'
            inputType='text'
            labelTxt='רחוב'
            placeholder='ביאליק'
            isRequired={requiredOrderDetails.includes('addressStreet')}
          />
          <div className='fields-box flex space-between'>
            <CartFormInput
              handleChange={handleChange}
              isValidated={orderDetails.addressAppartmentNumber}
              inputName='addressAppartmentNumber'
              inputType='number'
              labelTxt='מספר דירה'
              placeholder='13'
              isRequired={requiredOrderDetails.includes(
                'addressAppartmentNumber'
              )}
            />
            <CartFormInput
              handleChange={handleChange}
              isValidated={false}
              inputName='addressBuildingNumber'
              inputType='number'
              labelTxt='מספר בניין'
              placeholder='1'
              isRequired={requiredOrderDetails.includes(
                'addressBuildingNumber'
              )}
            />
          </div>
          <CartFormInput
            handleChange={handleChange}
            isValidated={orderDetails.postalCode}
            inputName='postalCode'
            inputType='number'
            labelTxt='מיקוד'
            placeholder='1234567'
            isRequired={requiredOrderDetails.includes('postalCode')}
          />
        </form>
      </main>
      <PrimaryButton
        txt='לתשלום'
        onClick={sendOrder}
        disabled={
          !requiredOrderDetails.every(
            (currReq) => orderDetails[currReq] && orderDetails.phone?.length > 9
          )
        }
        isLoading={isLoading.submit}
      />
      <button>
        <Ripples></Ripples>
      </button>
    </section>
  )
}
