import style from "./Menu.module.scss";

interface IMenu {
    del: () => void;
    moveUp: () => void;
    moveDown: () => void;
    clear: () => void;
    selected: string;
}

export default function Menu({
    del,
    moveUp,
    moveDown,
    clear,
    selected,
}: IMenu) {
    function deleteCard() {
        del();
    }
    function moveCardUp() {
        moveUp();
    }
    function moveCardDown() {
        moveDown();
    }
    function clearCards() {
        clear();
    }

    return (
        <div className={style.menu}>
            {selected ? (
                <>
                    <button className={style.menuButton} onClick={deleteCard}>
                        delete
                    </button>

                    <button className={style.menuButton} onClick={moveCardUp}>
                        push up
                    </button>
                    <button className={style.menuButton} onClick={moveCardDown}>
                        push down
                    </button>
                </>
            ) : (
                <h2>Click on a task to select it or</h2>
            )}
            <button className={style.menuButton} onClick={clearCards}>
                clear board
            </button>
        </div>
    );
}
