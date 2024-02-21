import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const successMessage = location?.state?.successMessage;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://reactnd-books-api.udacity.com/books",
          {
            headers: {
              Authorization: "whatever-you-want",
            },
          }
        );
        const fetchedBooks = response.data.books;
        setBooks(fetchedBooks);
        setFilteredBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const filterSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  function getStarRating(averageRating) {
    const yellowStar = "⭐";
    const grayStar = "☆";
    const maxRating = 5;
    const roundedRating = Math.round(averageRating);

    const stars = Array(maxRating)
      .fill(grayStar)
      .map((star, index) => (index < roundedRating ? yellowStar : star));

    return <div>{stars}</div>;
  }

  return (
    <>
      <div className="flex">
        {" "}
        <input
          id="search"
          type="text"
          placeholder="Search Books"
          value={searchQuery}
          onChange={filterSearch}
        />
      </div>
      <div id="success">
        {successMessage ? (
          <p>{successMessage}</p>
        ) : (
          <p>Register to get free books</p>
        )}
      </div>
      <div className="book-container" id="book-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book" key={book.id}>
              <img
                className="book-thumbnail"
                src={book.imageLinks.thumbnail}
                alt={book.title}
              />
              <h2 className="book-title">
                <a href={book.previewLink}>{book.title}</a>
              </h2>
              <h3 className="book-authors">
                By{" "}
                {book.authors.map((author) => (
                  <div key={author}>{author}</div>
                ))}
              </h3>
              <div className="additional">
                <div className="rating">
                  ⭐{book.averageRating ? book.averageRating : 3.5}
                </div>
                <div className="status">{successMessage ? "Buy" : "Free"}</div>
              </div>
            </div>
          ))
        ) : (
          <p className="not-found">Book not found</p>
        )}
      </div>
    </>
  );
}

export default Books;
