import BookItem from "./BookItem";

function BookList({ books }) {
  const sortedBooks = [...books].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <ul className="book-list">
      {sortedBooks.map((book) => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          content={book.content}
          coverImageUrl={book.coverImageUrl}
          createdAt={book.createdAt}
          updatedAt={book.updatedAt}
        />
      ))}
    </ul>
  );
}

export default BookList;
