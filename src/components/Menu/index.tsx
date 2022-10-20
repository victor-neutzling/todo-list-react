import style from "./Menu.module.scss";

interface IMenu {
    del: () => void;
    clear: () => void;
    selected: string;
}

export default function Menu({
    del,
    clear,
    selected,
}: IMenu) {
    function deleteCard() {
        del();
    }
    function clearCards() {
        clear();
    }

    return (
            <><h2 className={style.text}>Drag and drop cards to rearrange them</h2><div className={style.menu}>
            {selected ? (
                <>
                    <div>
                        <button className={style.menuButton} onClick={deleteCard}>
                            delete
                        </button>

                    </div>
                    <div>

                        <button className={style.menuButton} onClick={clearCards}>
                            clear board
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h2>Click on a task to select it or</h2>
                    <button className={style.menuButton} onClick={clearCards}>
                        clear board
                    </button>
                </>
            )}
        </div></>
    );
}
