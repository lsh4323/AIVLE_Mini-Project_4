import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import BookInfoScreen from './screens/BookInfoScreen';
import BookAddScreen from './screens/BookAddScreen';

function App( ) {
  // const [books, setBooks] = useState([
  //   {
  //     id: 1,
  //     title: "리액트 입문",
  //     author: "김개발",
  //     content: "React의 기본 개념과 컴포넌트 사용법을 다룬 책입니다.",
  //     coverImageUrl: "https://via.placeholder.com/150x220.png?text=React",
  //     createdAt: "2026-05-22T10:00:00",
  //     updatedAt: "2026-05-22T10:00:00",
  //   },
  //   {
  //     id: 2,
  //     title: "자바스크립트 핵심 정리",
  //     author: "이코딩",
  //     content: "JavaScript 문법, 배열, 객체, 함수, 비동기 처리를 정리한 책입니다.",
  //     coverImageUrl: "https://via.placeholder.com/150x220.png?text=JavaScript",
  //     createdAt: "2026-05-21T14:30:00",
  //     updatedAt: "2026-05-21T14:30:00",
  //   },
  //   {
  //     id: 3,
  //     title: "프론트엔드 프로젝트 실습",
  //     author: "박프론트",
  //     content: "HTML, CSS, React를 활용해 실제 프로젝트를 만들어보는 실습서입니다.",
  //     coverImageUrl: "https://via.placeholder.com/150x220.png?text=Frontend",
  //     createdAt: "2026-05-20T09:15:00",
  //     updatedAt: "2026-05-20T09:15:00",
  //   },
  // ]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // //책 추가 함수
  // const handleAddBook = async (newBook) => {
    
  // };
  
  // // 책 삭제 함수
  // const handleDeleteBook = async (id) => {
    
  // };
  
  // // 책 수정 함수
  // const handleUpdateBook = async (id, updatedBook) => {

  // };

  // // 이미지 만드는 함수
  // const handleMakeImg = async (id, api, quality) => {

  // };
  
  // if (loading) return <><p>불러오는 중...</p></>;
  
  // if (error) return <><p>에러: {error}</p></>;

  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/infobook" element={<BookInfoScreen />} />
      <Route path="/addbook" element={<BookAddScreen />} />
    </Routes>
  );
}

export default App;
