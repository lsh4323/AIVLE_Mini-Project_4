import { useState, useEffect } from 'react';
import BookForm from './components/BookForm'; // 수정1. 불러옴

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch('http://localhost:3000/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError('게시글을 불러오지 못했어요');
      }
      setLoading(false);
    }
    loadBooks();
  }, []);

  // 수정2.책 추가 함수
  const handleAddBook = async (newBook) => {
    try {
      const res = await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook)
      });

      if (!res.ok) throw new Error('등록 실패');

      const savedBook = await res.json();
      
      // 리액트 상태 업데이트 (화면에 실시간 추가)
      setBooks([savedBook, ...books]);
      alert('등록 완료!');
    } catch (err) {
      console.error(err);
      alert('등록 중 에러가 발생했습니다.');
    }
  };
  
  // 책 삭제 함수
  const handleDeleteBook = async (id) => {
    
  };
  
  // 책 수정 함수
  const handleUpdateBook = async (id, updatedBook) => {

  };
  
  if (loading) return <><p>불러오는 중...</p></>;
  
  if (error) return <><p>에러: {error}</p></>;

  return (
    <>
      <h1>hellohihi</h1>
    </>
  );
}

export default App;
