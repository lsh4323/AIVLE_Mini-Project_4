import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackToListButton from '../components/BackToListButton';

function BookEditScreen({
  books,
  onUpdateBook
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
        navigate(`/infobook/${book.id}`);
    };

    const handleCancel = () => {
        navigate(`/infobook/${book.id}`);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ko-KR');
    };
    return (
        <div className="page-container">
            <BackToListButton/>
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
                <div className="book-edit-text">
                    <h3>{book.title}</h3>
                    <p>저자: {book.author}</p>
                </div>
            </div>
            <div className="book-edit-content">
                <p>
                    내용
                </p>
                <textarea
                    value={changeContent}
                    onChange={(e) => setChangeContent(e.target.value)}
                />
            </div>
            
            <div className='buttons'>
                <button type = "submit" onClick={handleSave}>저장하기</button>
                <button type = "button" onClick={handleCancel}>취소하기</button>
            </div>
        </div>
    );
}

export default BookEditScreen;