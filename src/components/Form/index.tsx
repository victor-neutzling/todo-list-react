import React, {
    ChangeEvent,
    FormEvent,
    FormEventHandler,
    useState,
} from "react";
import { isConstructorDeclaration } from "typescript/lib/tsserverlibrary";
import Colors from "../../common/enums/colors";
import ICard from "../../types/ICard";
import style from "./Form.module.scss";

export default function Form({
    cardAdder,
}: {
    cardAdder: (card: any) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("")

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        cardAdder({ title, description, color });
        setTitle("");
        setDescription("");
        
    }

    function nameChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }
    function descriptionChangeHandler(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }
    function colorChangeHandler(event: any) {
        setColor(event.target.value);
    }

    return (
        <form className={style.form} onSubmit={submitHandler}>
            <div className={style.inputWrapper}>
                <label htmlFor="title" className={style.label}>Title</label>
                <input
                    className={style.input}
                    required
                    name="title"
                    onChange={nameChangeHandler}
                    type="text"
                    value={title}
                />
            </div>
            <div className={style.inputWrapper}>
                <label htmlFor="description" className={style.label} >Description</label>
                <input
                    value={description}
                    className={style.input}
                    name="description"
                    onChange={descriptionChangeHandler}
                    type="text"
                />
            </div>
            <div className={style.inputWrapper}>
                <label htmlFor="color" className={style.label} >Color</label>
                <select
                    className={style.input}
                    name="color"
                    onChange={colorChangeHandler} 
                >
                    <option value={Colors.white} style={{backgroundColor: Colors.white}}>white</option>
                    <option value={Colors.blue} style={{backgroundColor: Colors.blue}}>blue</option>
                    <option value={Colors.green} style={{backgroundColor: Colors.green}}>green</option>
                    <option value={Colors.red} style={{backgroundColor: Colors.red}}>red</option>
                    <option value={Colors.orange} style={{backgroundColor: Colors.orange}}>orange</option>
                    <option value={Colors.pink} style={{backgroundColor: Colors.pink}}>pink</option>
                    <option value={Colors.purple} style={{backgroundColor: Colors.purple}}>purple</option>
                    <option value={Colors.yellow} style={{backgroundColor: Colors.yellow}}>yellow</option>
                </select>
            </div>
            <button className={style.submitButton}>Add Item</button>
        </form>
    );
}
