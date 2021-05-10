import './CartFormInput.scss'
import checkImg from '../../../assets/img/check-form.svg'

export const CartFormInput = ({
  handleChange,
  isValidated,
  inputName,
  inputType,
  labelTxt,
  placeholder,
  isRequired,
}) => {
  return (
    <div className='form-field'>
      <label className='small' htmlFor={inputName}>
        {labelTxt} {isRequired ? '(*)' : ''}
      </label>
      <div className='input-box flex align-center'>
        <input
          id={inputName}
          className='fg-1'
          type={inputType}
          dir='rtl'
          name={inputName}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <div className='reaction-box'>
          <img className={isValidated ? 'active' : ''} src={checkImg} alt='' />
        </div>
      </div>
    </div>
  )
}
