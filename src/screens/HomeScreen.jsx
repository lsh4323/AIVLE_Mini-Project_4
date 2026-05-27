import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";
import { useState } from "react";

function HomeScreen({ books }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("전체 장르");

  const handleGenreChange = (value) => {
    setSelectedGenre(value);
  };

  const handleSearch = () => {
    setAppliedSearch(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredBooks = books.filter((book) => {
    // [장르 필터링]
    const matchesGenre =
      selectedGenre === "전체 장르" ||
      (book.tags && book.tags.includes(selectedGenre));

    // [검색어 필터링] appliedSearch 기준으로 검사 (대소문자 구분 없음)
    const matchesSearch =
      book.title.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      book.author.toLowerCase().includes(appliedSearch.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  return (
    <>
      <div className="home-header">
        <p className="book-list-title">도서 목록</p>
        <div className="search-area">
          <input
            className="search-input"
            type="text"
            placeholder="제목, 저자로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-button" onClick={handleSearch}>
            검색
          </button>
        </div>
        <button
          className="add-book-button"
          onClick={() => navigate("/addbook")}
        >
          + 새 도서 등록
        </button>
      </div>

      <div className="genre-filter">
        <select
          className="genre-select"
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value)}
        >
          <option>전체 장르</option>
          <option>소설</option>
          <option>시/에세이</option>
          <option>인문/사회</option>
          <option>경제/경영</option>
          <option>자기계발</option>
          <option>역사/문화</option>
          <option>기술/공학/과학</option>
        </select>
      </div>

      <BookList books={filteredBooks} />
    </>
  );
}

export default HomeScreen;
