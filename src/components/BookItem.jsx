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

    return (
        <li
            className="book-card"
            onClick={() => navigate(`/infobook/${id}`)}
            style={{ cursor: 'pointer' }}
        >
            <h3>{title}</h3>
            <p>글쓴이: {author}</p>
            <img src={coverImageUrl} alt={title} />
            <p>입력일: {createdAt}</p>
            <p>수정 날짜: {updatedAt}</p>
        </li>
    );
}

export default BookItem;