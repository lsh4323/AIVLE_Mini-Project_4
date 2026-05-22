import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("http://localhost:3000/books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("게시글을 불러오지 못했어요");
      }
      setLoading(false);
    }
    loadBooks();
  }, []);

  //책 추가 함수
  const handleAddBook = async (newBook) => {
    //qwe
  };

  // 책 삭제 함수
  const handleDeleteBook = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      // 서버에 삭제 요청 보내기
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("삭제 실패");
      }

      // 업데이트
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert("삭제 성공~~~");
    } catch (err) {
      console.error(err);
      alert("삭제 실패ㅠㅠ");
    }
  };

  // 책 상세 조회 함수
  const handleViewBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/books/${id}`);
      if (!res.ok) {
        throw new Error("상세 정보를 불러오지 못했습니다.");
      }
      const data = await res.json();

      // 콘솔창에만 찍던 데이터를 이제 상태 바구니에 담습니다.
      setSelectedBook(data);
    } catch (err) {
      console.error(err);
      alert("책 정보를 불러오지 못했어요");
    }
  };
  // 책 수정 함수
  const handleUpdateBook = async (id, updatedBook) => {};

  if (loading)
    return (
      <>
        <p>불러오는 중...</p>
      </>
    );

  if (error)
    return (
      <>
        <p>에러: {error}</p>
      </>
    );

  return <></>;
}

export default App;
