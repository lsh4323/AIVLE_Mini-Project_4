import { useNavigate } from "react-router-dom";
import { useState } from "react";

function BookAddScreen({ onAddBook }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim() || !content.trim()) {
      alert("모든 항목을 입력해주세요!");
      return;
    }

    onAddBook({
      title: title,
      author: author,
      content: content,
    });

    navigate("/");
  };

  return (
    <>
      <div
        onClick={() => navigate("/")}
        style={{ cursor: "pointer", marginBottom: "15px" }}
      >
        ← 목록으로 돌아가기
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="author">저자</label>
          <input
            id="author"
            type="text"
            placeholder="저자를 입력하세요"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            placeholder="책 내용을 입력하세요"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 하단 버튼들 */}
        <div>
          <button type="submit">등록하기</button>
          <button type="button" onClick={() => navigate("/")}>
            취소하기
          </button>
        </div>
      </form>
    </>
  );
}

export default BookAddScreen;
