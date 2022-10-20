import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import React from "react";
import ICard from "../../types/ICard";
import Card from "../Card";
import styles from "./Board.module.scss";

export default function Board({
    cards,
    selectedCardID,
    dragEndHandler
}: {
    cards: Array<ICard>;
    selectedCardID: string;
    dragEndHandler: (result:any) => void;
}) {
    function handleOnDragEnd(result:any) {
        dragEndHandler(result)
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="cards">
                {(provided) => (
                    <div
                        className={styles.board}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {cards.map((c, index) => {
                            return (
                                <Draggable
                                    key={c.id}
                                    draggableId={c.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className={styles.draggableWrapper}
                                        >
                                            <Card
                                                date={c.date}
                                                color={c.color}
                                                selected={
                                                    c.id === selectedCardID
                                                }
                                                title={c.title}
                                                description={c.description}
                                                selector={c.selector}
                                                id={c.id}
                                                key={c.key}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
