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

  const book = books.find(book => book.id == id);

  const [isEditing, setIsEditing] = useState(false);
  const [changeContent, setChangeContent] = useState(book?.content ?? '');
  console.log('changeContent : ', changeContent);

  {/* AI 이미지 생성 useState */}
  const [userApiKey, setUserApiKey] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('medium');
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
    if (!dateString) {
      return '-';
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return '-';
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  };
  return (
    <div className="page-container">
      
      <div className="book-info-top-bar">
        <BackToListButton/>
        <div className="del-update-dutton">
         <button 
          type = "submit"
          onClick={handleDelete}>
            삭제
        </button>
        <button 
          type = "delete"
          onClick={() => navigate(`/editbook/${id}`)}>
            수정
        </button>
      </div>
      </div>
      

      <div className="book-edit-info">
        <div className="book-edit-cover">
            {book.coverImageUrl?.trim() ? (
            <img src={book.coverImageUrl} alt={book.title} />
            ) : (
            <div className="empty-cover-image">
                빈 이미지
            </div>
            )}
        </div>
        <div className="book-side-text">
            <h1>{book.title}</h1>
            <p className="gray">저자: {book.author}</p>
            <p className="gray">등록일: {formatDate(book.createdAt)}</p>
            <p className="gray">수정일: {formatDate(book.updatedAt)}</p>
            <p className="black">내용</p>
            <p className="black">{book.content}</p>
        </div>
      </div>

      <div className="ai-image-section">
        <h3>AI 표지 생성</h3>
        <div>
          <label className="ai-label">OpenAI API Key</label>
          <input
            type="password"
            value={userApiKey}
            onChange={(e) => setUserApiKey(e.target.value)}
            disabled={isGenerating}
            placeholder="sk-..."
            className="api-input"
          />
        </div>
        <div className="ai-input-row">
          <div className="ai-input-group">
            <label className="ai-label">생성 모델</label>
            <input
              type="text"
              value="gpt-image-2"
              disabled
              className="api-input"
            />
          </div>

          <div className="ai-input-group">
            <label className="ai-label">사이즈</label>
            <input
              type="text"
              value="1024x1536"
              disabled
              className="api-input"
            />
          </div>
        </div>

        <div>
          <label className="ai-label">퀄리티</label>
          <select
            value={selectedQuality}
            onChange={(e) => setSelectedQuality(e.target.value)}
            disabled={isGenerating}
            className="quality-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
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
    </div>
  );
}

export default BookInfoScreen;