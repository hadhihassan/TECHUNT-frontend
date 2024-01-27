type Button = {
    children: JSX.Element | String,
    className?: String,
    onClick?:()=> void
}
const Button = ({ children, className,onClick }: Button) => {
    return <>
        <button type='submit' onClick={onClick} className={` ${className}`}>{children}</button>
    </>;
}
export default Button;