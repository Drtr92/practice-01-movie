import {useState} from "react";

function App() {
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("코미디");
    const [rating, setRating] = useState("1");
    const [card, setCard] = useState([]);

    const genres = ["코미디","어드벤처","로맨스","공포","스릴러","드라마","판타지","범죄"];

    const ratings = ["1","2","3","4","5"];

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleSelectGenre = (event) => {
        setGenre(event.target.value);
    }

    const handleRating = (event) => {
        setRating(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newName = name.trim();
        if (newName === "") {
            return;
        }
        const newCard = {
            name: newName,
            genre: genre,
            rating: rating,
            isDone: false
        };
        setCard([...card, newCard]);
        setName("");
        setGenre("코미디");
        setRating("1");
    }

    const handleToggleDone = (targetIndex) => {
        const updatedCard = card.map((item, index) => {
            if (index === targetIndex) {
                return {...item, isDone: !item.isDone};
            }
            return item;
        });
        setCard(updatedCard);
    }

    const handleDelete = (index) => {
        const deleteCard = card.filter((_, i) => i !== index);
        setCard(deleteCard);
    }

    const completedCount = card.filter((item) => item.isDone).length;

    const cardList = card.length === 0 ? (
        <p style={{color: "#888", padding: "20px"}}>자네, 뭐라도 좀 감상하지 않겠나🤦‍♀️</p>
    ) : (
        card.map((item, index) => {
            return (
                <div key={index}
                     style={{
                         display: 'flex',
                         flexDirection: 'column',
                         justifyContent: 'center',
                         alignItems: 'center',
                         listStyle: 'none',
                         boxSizing: 'border-box',
                         width: "calc(25% - 10px)",
                         padding: "20px",
                         gap: "6px",
                         border: "1px solid black",
                         borderRadius: "10px",
                         margin: '5px',
                         opacity: item.isDone ? 0.3 : 1,
                         transition: "opacity 0.2s ease, border-color 0.2s ease"
                     }}>
                    <span
                        style={{
                            fontWeight: "bold",
                            textDecoration: item.isDone ? "line-through" : "none",
                            color: item.isDone ? "#777" : "inherit",
                        }}>
                        {item.name}
                    </span>
                    <span>{item.genre}</span>
                    <span>{"⭐".repeat(item.rating)}</span>
                    <label>
                        <input
                            type="checkbox"
                            checked={item.isDone}
                            onChange={() => handleToggleDone(index)}
                        />
                        {item.isDone ? "감상 완료" : "미완료"}
                    </label>
                    <button
                        onClick={() => {
                            handleDelete(index);
                        }}
                    >삭제
                    </button>
                </div>
            )
        }))

    return (
        <>
            <h1>나의 영화 기록장</h1>
            <fieldset>
                <legend>영화 추가</legend>
                <form
                    onSubmit={handleSubmit}>
                    <input
                        onChange={handleChangeName}
                        placeholder={"영화 제목"}
                        value={name}
                    />
                    <select
                        onChange={handleSelectGenre}
                        value={genre}
                    >
                        {genres.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </ select>
                    <select
                        onChange={handleRating}
                        value={rating}
                    >
                        {ratings.map((item, index) => {
                            return <option key={index} value={item}>⭐ {item}점</option>;
                        })}
                    </select>
                    <button>추가</button>
                </form>
            </fieldset>
            <h2>전체 {card.length}편 / 감상 완료 {completedCount}편</h2>
            <div style={{display: 'flex', flexWrap: 'wrap',}}>
                {cardList}
            </div>
        </>
    )
}

export default App