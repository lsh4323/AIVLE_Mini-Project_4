import BookItem from './BookItem';

function BookList({ books }) {
  return (
    <ul className="book-list">
      {books.map(book => (
        <BookItem
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          content = {book.content}
          coverImageUrl = {book.coverImageUrl}
          createdAt = {book.createdAt}
          updatedAt = {book.updatedAt}
        />
      ))}
    </ul>
  );
}

export default BookList;
