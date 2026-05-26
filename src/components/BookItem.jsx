import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookItem({
  id,
  title,
  author,
  content,
  coverImageUrl,
  createdAt,
  updatedAt
}) {
    const navigate = useNavigate();
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ko-KR');
    };
    return (
        <li
            className="book-card"
            onClick={() => navigate(`/infobook/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <img className="card-image" src={coverImageUrl} alt={title} />
            <div className="card-info">
                <h3 className="card-title">{title}</h3>
                <p className="card-content">{content}</p>
            </div>
        </li>
    );
}

export default BookItem;