import React, { useState } from "react";
import ICard from "../../types/ICard";
import style from "./Card.module.scss";

export default function Card({ title, description, id, selector, selected, color, date }: ICard) {

    const [isSelected, setSelected] = useState(selected)

    function selectHandler(){
        setSelected(true)
        selector(id);
    }

    return (
        <div className={`${style.card} ${selected && style.selectedCard}`} style={{backgroundColor: color}}onClick={selectHandler}>
            <h1>&#8226; {title}</h1>
            {description && <h2> &#160;&#10551; {description}</h2>}
            <h3>created: &#160;&#160; {date}</h3>
        </div>
    );
}
