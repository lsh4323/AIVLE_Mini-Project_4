import { useState, useEffect } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch('http://localhost:3000/posts');
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

  //책 추가 함수
  const handleAddBook = async (newBook) => {
    
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
      <h1>hello111</h1>
    </>
  );
}

export default App;
