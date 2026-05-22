import { useState, useEffect } from 'react';
import BookForm from './components/BookForm'; 

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // json-server 데이터 가져오기
  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch('http://localhost:3000/books');
        if (!res.ok) throw new Error('서버 응답 오류');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오지 못했습니다.');
      }
      setLoading(false);
    }
    loadBooks();
  }, []);

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
  
  const handleDeleteBook = async (id) => { };
  const handleUpdateBook = async (id, updatedBook) => { };
  
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;

  // return문 추가
  return (
    <div>
      <h1>도서관리시스템</h1>
      
      {/* 등록 폼 컴포넌트 */}
      <BookForm onAddBook={handleAddBook} /> 

      {/* 등록 테스트 확인용 목록 */}
      <div>
        <h3>도서 목록 ({books.length}권)</h3>
        {books.map(b => (
          <div key={b.id} style={{ border: '1px solid #000', margin: '5px', padding: '5px' }}>
            <h4>{b.title}</h4>
            <p>저자: {b.author}</p>
            <p>내용: {b.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;