import './QuantitySelect.scss'
import { ProcessTitle } from '../../cmps/ProcessTitle/ProcessTitle'
import { BlocksList } from '../../cmps/BlocksList'
import { QuantityBar } from '../../cmps/qunatity-select/QuantityBar/QuantityBar'
import { PrimaryButton } from '../../cmps/min/PrimaryButton'
import { QuantitySummeryTxt } from '../../cmps/qunatity-select/QuantitySummeryTxt/QuantitySummeryTxt'
import { DeliveryTipTxt } from '../../cmps/qunatity-select/DeliveryTipTxt'

export const QuantitySelect = ({ history }) => {
  return (
    <section className='quantity-select main-container fg-1 flex column'>
      <main className='fg-1'>
        <ProcessTitle text='מצויין! עכשיו נבחר את כמות הפוטו-בלוקס שיגיעו במארז' />
        <BlocksList />
        <QuantitySummeryTxt />
        <QuantityBar />
        <DeliveryTipTxt />
      </main>
      <PrimaryButton
        onClick={() => history.push('/order/color-and-image-select')}
      />
    </section>
  )
}
