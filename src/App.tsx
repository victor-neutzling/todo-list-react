import React, { ReactElement, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import Board from "./components/Board";
import Card from "./components/Card";
import { v4 } from "uuid";
import ICard from "./types/ICard";
import Menu from "./components/Menu";
import styles from "./App.module.scss";
import DateHelper from "./common/date/Date";

function App() {
    const [cards, setCards] = useState<Array<ICard>>(loadCards() || []);
    const [selected, setSelected] = useState<string>("");

    function deleteCard(): void {
        let newCards: Array<ICard> = [];

        cards.forEach((c: ICard) => {
            if (c.id !== selected) {
                newCards.push(c);
            }
        });
        setCards(newCards);
        setSelected("");
    }

    function moveCardUp() {
        let newCards: Array<ICard> = cards.map((c: ICard) => c);

        for (let i = 0; i < cards.length; i++) {
            if (newCards[i].id === selected) {
                if (i === 0) break;

                //swaps the selected card with the previous one
                let temp = newCards[i - 1];
                newCards[i - 1] = newCards[i];
                newCards[i] = temp;
                break;
            }
        }
        setCards(newCards);
    }
    function moveCardDown() {
        let newCards: Array<ICard> = cards.map((c: ICard) => c);

        for (let i = 0; i < cards.length; i++) {
            if (newCards[i].id === selected) {
                if (i === cards.length - 1) break;

                //swaps the selected card with the previous one
                let temp = newCards[i + 1];
                newCards[i + 1] = newCards[i];
                newCards[i] = temp;
                break;
            }
        }
        setCards(newCards);
    }

    function selectCard(id: string): void {
        let newcards: Array<ICard> = [];
        setSelected(id);
    }
    function clearCards() {
        if (window.confirm("Do you want to delete all tasks from the board?")) {
            setCards([]);
            localStorage.setItem("cards", "");
        }
        setSelected('')
    }

    function addCard(card: ICard) {
        //sends last card as parameter to saveCards to prevent react from acting up :/

        setCards([
            ...cards,
            {
                title: card.title,
                description: card.description,
                selector: selectCard,
                id: v4(),
                key: v4(),
                selected: false,
                color: card.color,
                date: DateHelper.getCurrentTimeString()
            },
        ]);
        
       
        //add a function to update all cards

    }

    function saveCards() {
        //maps the cards, pushes the last card into the array, parses it to a string and sets it in localStorage as "cards"
        let convertedCards = cards.map((card: ICard) => JSON.stringify(card));

        localStorage.setItem("cards", convertedCards.toString());
    }

    //code gymnastics, this one
    function loadCards() {
        let finalData: Array<ICard> = [];

        //gets item from localStorage and splits it into separate, json-parseable strings
        let f = localStorage
            .getItem("cards")
            ?.split("},")
            //this adds an extra set of curly braces to the last item that needs to be removed later
            .map((x: string) => (x += "}"));

        if (f && f[0] !== "}") {
            //erases the extra set of curly braces from the last item, then parses the strings into json
            if (f.length > 0) f[f.length - 1] = f[f.length - 1].slice(0, -1);
            finalData = f.map((item: string) => JSON.parse(item));

            //rebinds the selector property to the selectCard function, that got lost somewhere in the conversions
            finalData = finalData.map((data: ICard) => {
                return {
                    ...data,
                    selected: false,
                    selector: selectCard,
                };
            });
        }
        return finalData;
    }

    useEffect(() => {
        
        saveCards();
    }, [cards]);

    return (
        <div className={styles.App}>
            <div className={styles.appWrapper}>
                <h1 className={styles.mainTitle}>
                    &#8226; To Do List 
                </h1>
                <div className={styles.contentWrapper}>
                    <Form cardAdder={addCard} />
                    <Menu
                        selected={selected}
                        del={deleteCard}
                        moveUp={moveCardUp}
                        moveDown={moveCardDown}
                        clear={clearCards}
                    />
                    <Board cards={cards} selectedCardID={selected} />
                </div>
            </div>
        </div>
    );
}

export default App;
