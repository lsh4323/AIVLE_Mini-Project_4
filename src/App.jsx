import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import BookInfoScreen from "./screens/BookInfoScreen";
import BookEditScreen from "./screens/BookEditScreen";
import BookAddScreen from "./screens/BookAddScreen";
import Header from "./components/Header";
import BookForm from "./components/BookForm";
// BookDetail.jsx 불러와야 함.
import BookDetail from "./components/BookDetail";

// OpenAI API 키 환경변수에서 불러오기
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 수정 기능: 선택된 도서의 ID 상태 추가
  // 어떤 책이 클릭되어 상세 화면으로 넘어갔는지를 기억하는 리액트의 상태
  const [currentBook, setCurrentBook] = useState(null);


  // 공통 에러 처리 함수
  const notifyFetchError = (err, defaultMessage) => {
    console.error(err);
    if (err.message === "Failed to fetch") {
      alert("네트워크 오류: 서버 연결을 확인해주세요.");
    } else {
      alert(defaultMessage);
    }
  };

  // json-server 데이터 가져오기
  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch("http://localhost:3000/books");
        if (!res.ok) throw new Error("서버 응답 오류");

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        handleFetchError(err, err.message);
      }
      setLoading(false);
    }
    loadBooks();
  }, []);

// 책 추가와 동시에 태그 분류 함수
  const handleAddBook = async (newBook) => { 
    try {
      let generatedTags = [];

      if (apiKey) {
        console.log('AI 장르 자동 분석 시작');
        
        const OPENAI_CHAT_API_URL = "https://api.openai.com/v1/chat/completions";
        const TAG_CATEGORIES = `
        - 소설 : 소설일반, 장편소설, 단편소설, 추리/미스터리, 판타지, SF, 로맨스, 역사소설, 청소년소설, 고전소설
        - 시/에세이 : 시, 에세이, 명상/치유
        - 인문/사회 : 인문학일반, 심리학, 정치/사회, 법학
        - 취미/실용/스포츠 : 요리, 취미/공예, 건강/운동, 여행, 스포츠
        - 경제/경영 : 경영일반, 경제일반, 마케팅/세일즈, 재테크/투자, 리더십, CEO/비즈니스
        - 자기계발 : 성공처세, 자기관리, 대화법
        - 역사/문화 : 역사, 문화
        - 종교 : 종교일반, 기독교, 불교, 천주교, 기타종교
        - 예술/대중문화 : 예술일반, 미술, 음악, 영화, 대중문화, 사진, 디자인
        - 기술/공학/과학 : IT/컴퓨터, 과학, 기술/공학
        - 어린이/유아 : 유아, 그림책, 아동문학, 학습/교양
        `;

        const prompt = `
        다음 책의 제목과 내용을 분석해서, 아래 제공된 카테고리 목록 중에서 가장 잘 어울리는 태그를 최대 3개만 골라주세요.
        대분류(예: '소설', '경제/경영') 태그 한개는 무조건 선택하고, 그 이후 소분류 태그를 선택해주세요. 
        태그는 반드시 제공된 목록에서만 골라야 하며, 책의 장르와 주제를 가장 잘 나타내는 태그를 선택해주세요. 
        응답은 반드시 JSON 배열 형태로만 작성해주세요. 예시: ["소설", "판타지", "청소년소설"]

        [사용 가능한 카테고리 및 태그 목록]
        ${TAG_CATEGORIES}

        [책 정보]
        -제목: "${newBook.title}"
        -내용: "${newBook.content}"
        `;
        
        const tagRes = await fetch(OPENAI_CHAT_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.1,
          }) 
        });

        if (tagRes.ok) {
          const tagData = await tagRes.json();
          const aiMessage = tagData.choices[0].message.content;
          generatedTags = JSON.parse(aiMessage); 
        } else {
          console.warn("태그 분석 실패, 태그 없이 저장을 진행합니다.");
        }
      } else {
        console.warn(".env 파일에 API 키가 없어 태그 없이 저장합니다.");
      }

      const finalBookData = {
        ...newBook,
        tags: generatedTags,
      };

      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalBookData),
      });

      // error handling
      if (res.status === 400) throw new Error("잘못된 요청입니다. 입력값을 확인해주세요.");
      if (res.status === 500) throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      if (!res.ok) throw new Error("등록 실패");

      const savedBook = await res.json();

      setBooks([savedBook, ...books]);
      alert("등록 완료!");
    } catch (err) {
      handleFetchError(err, err.message); 
    }
  };

  // 책 삭제 함수
  const handleDeleteBook = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      // 서버에 삭제 요청 보내기
      const res = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (res.status === 404) throw new Error("삭제할 책을 찾을 수 없습니다.");
      if (res.status === 500) throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      if (!res.ok) throw new Error("삭제 실패");

      // 업데이트
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      alert("삭제 성공~~~");
    } catch (err) {
      handleFetchError(err, err.message);
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
  // userApiKey는 .env에서 불러온 apiKey로 변경
  const handleGenerateImage = async (selectedBook, selectedQuality) => {
    // API 키가 입력되지 않은 경우
    // console.log('book:', selectedBook);
    // console.log(`quality: ${selectedQuality}`);

    if (!apiKey) {
      alert("API 키가 설정되지 않았습니다.");
      return;
    }

    console.log('함수 호출');
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
          Authorization: `Bearer ${apiKey}`,
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

      // 예외 처리
      if (CreateImage.status === 401) throw new Error("API 키가 유효하지 않습니다. 확인 후 다시 시도해주세요.");
      if (CreateImage.status === 429) throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
      if (!CreateImage.ok) throw new Error("OpenAI 요청 실패");

      /*   *********************************************************************    */
      // OpenAI 응답에서 base64 이미지 데이터 추출
      let responseData;
      try {
        responseData = await CreateImage.json();
      } catch {
        throw new Error("응답 형식이 올바르지 않습니다.");
      }

      const b64Image = responseData.data[0].b64_json;
      if (!b64Image) throw new Error("이미지 데이터가 응답에 포함되어 있지 않습니다.");

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

      // error handling
      if (updateRes.status === 404) throw new Error("업데이트할 책을 찾을 수 없습니다.");
      if (updateRes.status === 500) throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      if (!updateRes.ok) throw new Error("책 정보 업데이트 실패");

      // React 상태 업데이트
      const updatedBook = await updateRes.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id ? updatedBook : book,
        ),
      );
      setCurrentBook(updatedBook);
      // 성공 알림
      alert("책 이미지가 성공적으로 생성되고 업데이트되었습니다!");
    } catch (err) {
      handleFetchError(err, "이미지 생성 또는 업데이트에 실패했습니다.");
    }
  };

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
          element={
            <BookAddScreen 
              onAddBook={handleAddBook}
            />}
        />
        <Route
          path="/editbook/:id"
          element={<BookEditScreen
            books={books}
            onUpdateBook={handleUpdateBook} 
            />}
        />
      </Routes>
    </>
  );
}

export default App;
