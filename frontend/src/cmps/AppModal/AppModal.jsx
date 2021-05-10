import reactDom from 'react-dom'
import './AppModal.scss'

export const AppModal = (props) => {
  return reactDom.createPortal(
    <div
      className={`modal-container ${props.className}`}
      onClick={props.closeModal}
    >
      <div className='modal'>{props.children}</div>
    </div>,
    document.getElementById('modal')
  )
}
