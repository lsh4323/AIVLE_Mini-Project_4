import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

  return (
    <>
      <h1>책 상세 화면</h1>

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

      <p>입력일: {book.createdAt}</p>
      <p>수정 날짜: {book.updatedAt}</p>

      <button onClick={handleDelete}>삭제</button>

      <button onClick={() => navigate('/')}>
        홈으로 이동
      </button>
    </>
  );
}

export default BookInfoScreen;