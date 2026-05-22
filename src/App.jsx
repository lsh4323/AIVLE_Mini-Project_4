import { useState, useEffect } from 'react';
import BookForm from './components/BookForm'; 
// BookDetail.jsx 불러와야 함.
import BookDetail from './components/BookDetail';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 수정 기능: 선택된 도서의 ID 상태 추가
  // 어떤 책이 클릭되어 상세 화면으로 넘어갔는지를 기억하는 리액트의 상태
  const [selectedBookId, setSelectedBookId] = useState(null);

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
// 수정: [수정] 버튼클릭시기존정보자동불러오기및수정후저장가능 이 되도록...
  const handleUpdateBook = (updatedBook) => {
    // 5/21 수업 참고하여 map이용
    // 수정된 id와 일치하는 객체만 교체함.
    setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
  };


  // 클릭한 id와 같은 글 찾음
  const currentBook = books.find(b => b.id === selectedBookId);  
  
  
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error}</p>;

  // return문 추가, 테스트 후 컨트롤 k c 로 주석처리 하여 동기화 함.
  return (
    <>
      <p>Hello</p>
      {/*
      {currentBook ? (
        <BookDetail 
          book={currentBook} 
          onUpdateBook={handleUpdateBook} 
          onBack={() => setSelectedBookId(null)} 
        />
      ) : (
        <div>
          <h1>도서관리시스템</h1>
          <BookForm onAddBook={handleAddBook} />

          <div>
            <h3>도서 목록 ({books.length}권)</h3>
            {books.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBookId(b.id)}
                style={{
                  border: '1px solid #000',
                  margin: '10px 0',
                  padding: '10px',
                  cursor: 'pointer',
                  background: '#f0f0f0',
                }}
              >
                <h4>{b.title} (클릭 시 상세조회/수정)</h4>
                <p>저자: {b.author}</p>
              </div>
            ))}
          </div>
        </div>
      )}*/}
    </>
  );
}

export default App;