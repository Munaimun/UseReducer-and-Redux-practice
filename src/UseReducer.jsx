/* eslint-disable react/prop-types */
import { useReducer, useState } from "react";

const Modal = ({ modalText }) => {
  return <p> {modalText} </p>;
};

const booksData = [
  { id: 1, name: "sherlock holmes" },
  { id: 2, name: "Pather Panchali" },
  { id: 3, name: "Merchant of Venice" },
];

// initial values for usereducer
const intitailState = {
  books: booksData,
  isModalOpen: false,
  modalText: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const allBooks = [...state.books, action.payload];
      return {
        ...state,
        books: allBooks,
        isModalOpen: true,
        modalText: "Added",
      };
    }
    case "REMOVE": {
      const filteredBooks = [...state.books].filter(
        (book) => book.id !== action.payload // if the condition is true the book will remain in the list
      );
      return {
        ...state,
        books: filteredBooks,
        isModalOpen: true,
        modalText: "removed",
      };
    }
    default:
      return state;
  }
};

const UseReducer = () => {
  const [bookName, setBookName] = useState("");
  const [bookState, dispatch] = useReducer(reducer, intitailState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { id: new Date().getTime().toString(), name: bookName };
    dispatch({ type: "ADD", payload: newBook }); //dispatch take the type and paylaod to the action in reducer fn
    setBookName("");
  };

  const removeHandler = (id) => {
    dispatch({ type: "REMOVE", payload: id }); //dispatch take the type and paylaod to the action in reducer fn
    setBookName("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>

      {bookState.isModalOpen && <Modal modalText={bookState.modalText} />}

      {bookState.books.map((book) => {
        const { id, name } = book;
        return (
          <li key={id}>
            {" "}
            {name} <button onClick={() => removeHandler(id)}>remove</button>{" "}
          </li>
        );
      })}
    </div>
  );
};

export default UseReducer;
