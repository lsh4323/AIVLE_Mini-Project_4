import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackToListButton from '../components/BackToListButton';

function BookInfoScreen({
  books,
  onDeleteBook,
  onUpdateBook,
  onMakeImg
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const book = books.find(book => book.id == Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [changeContent, setChangeContent] = useState(book?.content ?? '');
  console.log('changeContent : ', changeContent);

  {/* AI 이미지 생성 useState */}
  const [userApiKey, setUserApiKey] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('middle');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!book) {
    return (
      <>
        <p>책을 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/')}>홈으로 이동</button>
      </>
    );
  }

  const handleSave = () => {
    const newUpdatedAt = new Date().toISOString();

    onUpdateBook({
      ...book,
      content: changeContent,
      updatedAt: newUpdatedAt,
    });
    console.log('updatedbook : ', {
      ...book,
      content: changeContent,
      updatedAt: newUpdatedAt,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteBook(book.id);
    navigate('/');
  };

  {/* AI 이미지 생성 핸들러 */}
  const handleMakeImgClick = async () => {
    if (!userApiKey) {
      alert('API 키를 입력해주세요.');
      return;
    }
    setIsGenerating(true);

    try {
      await onMakeImg(book, userApiKey, selectedQuality);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false); 
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };
  return (
    <>
      <BackToListButton/> 
      <h3>{book.title}</h3>
      <p>글쓴이: {book.author}</p>

      {isEditing ? (
        <>
          <textarea
            value={changeContent}
            onChange={(e) => setChangeContent(e.target.value)}
          />

          <button onClick={handleSave}>저장</button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <p>내용: {book.content}</p>
          <button onClick={() => setIsEditing(true)}>수정</button>
        </>
      )}

      <img src={book.coverImageUrl} alt={book.title} />

      {/* AI 이미지 생성 섹션 */}
      <div className="ai-image-section">
        <h3>AI 이미지 생성</h3>
        <div>
          <input
            type="password"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            disabled={isGenerating}
            placeholder="sk-..."
            className="api-key-input"
          />
        </div>

        <div>
          <label>사이즈 (고정)</label>
          <input
            type="text"
            value="1024x1536"
            disabled
            className="size-input"
          />
        </div>

        <div>
          <label>quality</label>
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            disabled={isGenerating}
            className="quality-select"
          >
            <option value="low">Low</option>
            <option value="middle">Middle</option>
            <option value="high">High</option>
          </select>
        </div>

        <button 
          onClick={handleMakeImgClick}
          disabled={isGenerating}
          className={`generate-btn ${isGenerating ? 'generating' : ''}`}
        >
          {isGenerating ? "이미지 생성 중..." : "AI 이미지 생성하기"}
        </button>
      </div>

      <p>입력일: {formatDate(book.createdAt)}</p>
      <p>수정 날짜: {formatDate(book.updatedAt)}</p>

      <button onClick={handleDelete}>삭제</button>

      
    </>
  );
}

export default BookInfoScreen;