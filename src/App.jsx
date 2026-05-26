import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookInfoScreen from "./screens/BookInfoScreen";
import BookAddScreen from "./screens/BookAddScreen";
import BookForm from "./components/BookForm";
// BookDetail.jsx 불러와야 함.
import BookDetail from "./components/BookDetail";
import Header from "./components/Header";

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
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) throw new Error("서버 응답 오류");

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
      }
      setLoading(false);
    }
    loadBooks();
  }, []);

  const handleAddBook = async (newBook) => {
    try {
      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      if (!res.ok) throw new Error("등록 실패");

      const savedBook = await res.json();

      // 리액트 상태 업데이트 (화면에 실시간 추가)
      setBooks([savedBook, ...books]);
      alert("등록 완료!");
    } catch (err) {
      console.error(err);
      alert("등록 중 에러가 발생했습니다.");
    }
  };

  const handleUpdateBook = async (updatedBook) => {
    try {
      // json-server(3000포트)의 해당 ID 데이터 수정요청
      const res = await fetch(`http://localhost:3000/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook)
      });

      if (!res.ok) throw new Error('수정 실패');

      setBooks(books.map((b) => (b.id == updatedBook.id ? updatedBook : b)));
      alert('수정 완료!');
    } catch (err) {
      console.error(err);
      alert('수정 중 에러가 발생했습니다.');
    }
  };

  // 클릭한 id와 같은 글 찾음
  const currentBook = books.find((b) => b.id === selectedBookId);

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

  // AI 이미지 생성 함수
  const handleGenerateImage = async () => {
    // API 키가 입력되지 않은 경우
    if (!userApiKey) {
      alert("API 키를 입력해주세요");
      return;
    }

    try {
      // OpenAI Image API 주소
      const OPENAI_IMAGE_API_URL =
        "https://api.openai.com/v1/images/generations";

      // 책 이미지 생성 프롬프트
      const prompt = `
      매우 상세한 책 표지 이미지를 생성해주세요.

      [텍스트 지침]
      표지에는 아래의 요소들이 포함되어야 합니다.
      - 제목: "${selectedBook.title}" (책 분위기에 맞는 타이포그래피를 사용해서 눈에 띄게 배치할 것)
      - 저자명: "${selectedBook.author}" (제목과 조화를 이루도록 적절한 위치에 배치할 것)
      
      [시각적 지침]
      - 다음 줄거리와 핵심 내용을 바탕으로 표지 일러스트를 생성해주세요: "${selectedBook.content}"

      [스타일 및 분위기]
      - 스타일: 책의 장르와 분위기에 맞는 스타일로 표지를 디자인해주세요. 예를 들어, 미스테리 소설이라면 어두운 색조와 음영을 사용하고,
        로맨스 소설이라면 부드러운 색감과 낭만적인 요소를 포함해주세요.
      - 분위기: 배경과 일러스트는 책의 전체적인 분위기와 어울려야하며, 제목과 저자명이 배경에 묻히지 않도록 주의해주세요.
      - 퀄리티: "${selectedQuality}" (선택한 퀄리티에 맞는 디테일과 해상도로 생성할 것)
      `;

      // OpenAI 이미지 생성 요청 함수
      const CreateImage = await fetch(OPENAI_IMAGE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userApiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt,
          n: 1,
          size: "1024x1536",
          quality: selectedQuality,
          output_format: "png",
        }),
      });

      if (!CreateImage.ok) throw new Error("OpenAI 요청 실패");

      //   *********************************************************************
      // OpenAI 응답에서 base64 이미지 데이터 추출
      const responseData = await CreateImage.json();
      const b64Image = responseData.data[0].b64_json;

      // b64 이미지를 Data url로 변환
      const imageUrl = `data:image/png;base64,${b64Image}`;

      // json-server에 PATCH reqeust
      const updateRes = await fetch(
        `http://localhost:3000/books/${selectedBook.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            coverImageUrl: imageUrl,
            updatedAt: new Date().toISOString(),
          }),
        },
      );

      // json-server 업데이트 성공 여부 확인
      if (!updateRes.ok) throw new Error("책 정보 업데이트 실패");

      const updatedBook = await updateRes.json();

      // React 상태 업데이트
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? updatedBook : book,
        ),
      );
      setSelectedBook(updatedBook);

      // 성공 알림
      alert("책 이미지가 성공적으로 생성되고 업데이트되었습니다!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // if (loading) return <><p>불러오는 중...</p></>;

  // if (error) return <><p>에러: {error}</p></>;

  // return문 추가, 테스트 후 컨트롤 k c 로 주석처리 하여 동기화 함.
  return (
    <>
    <Header/>
    <Routes>
      <Route
        path="/"
        element={
          <HomeScreen
            books={books}
          />
        }
      />
      <Route
        path="/infobook/:id"
        element={
          <BookInfoScreen
            books={books}
            onDeleteBook={handleDeleteBook}
            onUpdateBook={handleUpdateBook}
            onMakeImg={handleGenerateImage}
          />
        }
      />
      <Route
        path="/addbook"
        element={<BookAddScreen onAddBook={handleAddBook} />}
      />
    </Routes>
    </>
    
  );
}

export default App;
