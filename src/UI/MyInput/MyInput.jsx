import './MyInput.scss'

const MyInput = ({ type, id, text, validation, error }) => {
  return (
    <>
      <input type={type} name={id} id={id} className={error ? 'input input--error' : 'input'} placeholder={text} onBlur={validation} />
      <p className="input__errors">{error}</p>
    </>
  )
}

export default MyInput;