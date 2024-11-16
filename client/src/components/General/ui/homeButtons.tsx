import React from "react"
import { NavigateFunction } from "react-router"

interface ButtonProps {
    style: string,
    link?: () => void | NavigateFunction ,
    content: string
}
const HomeButton:React.FC<ButtonProps> = ({ style, link, content }) => {
    return (
        <button className={style} onClick={link}>{content}</button>
    )
}
export default HomeButton