import './PrimaryButton.scss'
import { Loading } from '../Loading'

export const PrimaryButton = (props) => {
  const { txt, isLoading } = props
  return (
    <button
      {...props}
      className={`primary-button center-childs ${
        props.className ? props.className : ''
      }`}
    >
      {!isLoading && <p className='strong'>{txt ? txt : 'לשלב הבא'}</p>}
      {isLoading && <Loading />}
    </button>
  )
}
