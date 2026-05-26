import { useNavigate } from 'react-router-dom';
import BookList from '../components/BookList';

function HomeScreen({ books }) {
  const navigate = useNavigate();

  return (
    <>
      <p className="book-list-title">
        도서 목록
      </p>
      <button className="add-book-button" onClick={() => navigate('/addbook')}>
        + 새 도서 등록
      </button>
      <BookList books={books} />
      
      
    </>
  );
}

export default HomeScreen;