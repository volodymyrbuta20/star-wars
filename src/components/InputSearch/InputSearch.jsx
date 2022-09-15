import "./InputSearch.scss"

const InputSearch = (props) => {
    return (
        <input type="text" className="inputsearch" placeholder="Type here name of character" onChange={props.onChange}/>
    )
}

export default InputSearch;