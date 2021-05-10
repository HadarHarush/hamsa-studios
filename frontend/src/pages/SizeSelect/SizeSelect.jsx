import './SizeSelect.scss'
import { ProcessTitle } from '../../cmps/ProcessTitle/ProcessTitle'
import { SizesList } from '../../cmps/size-select/SizesList/SizesList'
import { PrimaryButton } from '../../cmps/min/PrimaryButton/PrimaryButton'
import { useSelector } from 'react-redux'

export const SizeSelect = ({ history }) => {
  const blocks = useSelector((state) => state.processReducer.blocks)
  return (
    <section className='size-select main-container fg-1 flex column'>
      <main className='fg-1'>
        <ProcessTitle text='נתחיל מהבלוק. לחצו על גודל העץ שתרצו' />
        <SizesList />
      </main>
      <PrimaryButton
        onClick={() => history.push('/order/quantity-select')}
        disabled={!blocks.every((currBlock) => currBlock.size)}
      />
    </section>
  )
}
