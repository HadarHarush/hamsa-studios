import { Children } from 'react'
import './ProcessTitle.scss'
export const ProcessTitle = ({ text, children }) => {
  return (
    <div className='process-title-wrapper center-childs column'>
      <h2>{text}</h2>
      {children}
    </div>
  )
}
