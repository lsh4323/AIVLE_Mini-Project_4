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

  // OpenAI Image API 주소
  const OPENAI_IMAGE_API_URL = 'https://api.openai.com/v1/images/generations';

  // 책 이미지 생성 프롬프트
  const prompt = `
  매우 상세한 책 표지 이미지를 생성해주세요.

  [텍스트 지침]
  표지에는 아래의 요소들이 포함되어야 합니다.
  - 제목: "${books.title}" (책 분위기에 맞는 타이포그래피를 사용해서 눈에 띄게 배치할 것)
  - 저자명: "${books.author}" (제목과 조화를 이루도록 적절한 위치에 배치할 것)
  
  [시각적 지침]
  - 다음 줄거리와 핵심 내용을 바탕으로 표지 일러스트를 생성해주세요: "${books.content}"

  [스타일 및 분위기]
  - 스타일: 책의 장르와 분위기에 맞는 스타일로 표지를 디자인해주세요. 예를 들어, 미스테리 소설이라면 어두운 색조와 음영을 사용하고,
    로맨스 소설이라면 부드러운 색감과 낭만적인 요소를 포함해주세요.
  - 분위기: 배경과 일러스트는 책의 전체적인 분위기와 어울려야하며, 제목과 저자명이 배경에 묻히지 않도록 주의해주세요.
  - 퀄리티: "${selectedQuality}" (선택한 퀄리티에 맞는 디테일과 해상도로 생성할 것)
  `

  // OpenAI 이미지 생성 요청 함수
  const CreateImage = await fetch(OPENAI_IMAGE_API_URL, { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-image-2',
      prompt,
      n: 1,
      size: '1024x1536',
      quality: selectedQuality,
      output_format: 'png'
    })
  });

  if (!CreateImage.ok) throw new Error('OpenAI 요청 실패');
  
  if (loading) return <><p>불러오는 중...</p></>;
  
  if (error) return <><p>에러: {error}</p></>;

  return (
    <>
      <h1>hello</h1>
    </>
  );
}

export default App;
