import {useState} from "react";
import styles from "./App.module.css";

function App() {
    const genres = ["코미디", "어드벤처", "로맨스", "공포", "스릴러", "드라마", "판타지", "범죄"];
    const ratings = ["1", "2", "3", "4", "5"];

    const [name, setName] = useState("");
    const [genre, setGenre] = useState(genres[0]);
    const [rating, setRating] = useState(ratings[0]);
    const [card, setCard] = useState([]);

    const handleChangeName = event => {
        setName(event.target.value);
    };

    const handleSelectGenre = event => {
        setGenre(event.target.value);
    };

    const handleRating = event => {
        setRating(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const newName = name.trim();
        if (newName === "") {
            return;
        }
        const newCard = {
            name: newName,
            genre: genre,
            rating: rating,
            isDone: false,
        };
        setCard([...card, newCard]);
        setName("");
        setGenre(genres[0]);
        setRating(ratings[0]);
    };

    const ratingHandle = ratings.map((item, index) => {
        return (
            <option key={index} value={item}>
                ⭐ {item}점
            </option>
        );
    });

    const handleToggleDone = targetIndex => {
        const updatedCard = card.map((item, index) => {
            if (index === targetIndex) {
                return {...item, isDone: !item.isDone};
            }
            return item;
        });
        setCard(updatedCard);
    };

    const handleDelete = index => {
        const deleteCard = card.filter((_, i) => i !== index);
        setCard(deleteCard);
    };

    const completedCount = card.filter(item => item.isDone).length;

    const cardList =
        card.length === 0 ? (
            <div className={styles.empty}> 보고싶은 영화가 없으신가봐요... 🤦‍♀️</div>
        ) : (
            card.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`${styles.movies}
                                    ${styles.card}
                                    ${item.isDone ? styles.isDone : styles.notYet}`}>
                        <h4 className={styles.movieTitle}>{item.name}</h4>
                        <div className={styles.genreInCard}>{item.genre}</div>
                        <div className={styles.ratingBox}>
                            <div className={styles.goldStar}>{"★".repeat(Number(item.rating))}</div>
                            <div className={styles.whiteStar}>{"★".repeat(5 - Number(item.rating))}</div>
                        </div>
                        <label className={styles.checkBoxTitle}>
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                onChange={() => handleToggleDone(index)}
                            />
                            {item.isDone ? " 감상 완료" : " 미완료"}
                        </label>
                        <button
                            className={styles.button}
                            onClick={() => {
                                handleDelete(index);
                            }}>
                            삭제
                        </button>
                    </div>
                );
            })
        );

    return (
        <div className={styles.container}>
            <header className={`${styles.menu} ${styles.card}`}>
                <h1>나의 영화 기록장</h1>
                <h3>
                    전체 {card.length}편 / 감상 완료 {completedCount}편
                </h3>
            </header>
            <fieldset className={`${styles.menu} ${styles.card}`}>
                <h3 style={{padding: "0 14px 0 0"}}>영화 추가</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        onChange={handleChangeName}
                        placeholder={"  영화 제목을 입력해 주세요."}
                        value={name}
                    />
                    <select className={styles.select} onChange={handleSelectGenre} value={genre}>
                        {genres.map((item, index) => {
                            return (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                    <select className={styles.select} onChange={handleRating} value={rating}>
                        {ratingHandle}
                    </select>
                    <button className={styles.button} type={"submit"}>추가</button>
                </form>
            </fieldset>
            <div className={styles.movieField}>{cardList}</div>
        </div>
    );
}


export default App;
