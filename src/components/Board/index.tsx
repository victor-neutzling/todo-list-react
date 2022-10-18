import React from 'react'
import ICard from '../../types/ICard'
import Card from '../Card'
import styles from './Board.module.scss'


export default function Board({cards,selectedCardID}:{cards: Array<ICard>,selectedCardID: string}) {



  return (
    <div className={styles.board}>{cards.length?cards.map((c) =>{
        return <Card date={c.date} color={c.color} selected={c.id === selectedCardID} title={c.title} description={c.description} selector={c.selector} id={c.id} key={c.key}/>
    }): <h2 className={styles.noCards}>You have no tasks on the list!</h2>}</div>
  )
}
