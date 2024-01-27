 type input = {
    inputValue :String,
    setValue : React.Dispatch<React.SetStateAction<String>>
 }
const Input = ({inputValue, setValue}:input) => {
    return <>
        <input type="text" className='w-full rounderd-sm mb-2' value={inputValue} onChange={(event) => setValue(event.target.value)} />
    </>;
}


export default Input;