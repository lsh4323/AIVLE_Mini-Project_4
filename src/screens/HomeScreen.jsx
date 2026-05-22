import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      <h1>홈 화면 </h1>

      <button onClick={() => navigate('/infobook')}>
        책 화면으로 이동
      </button>
      <button onClick={() => navigate('/infobook')}>
        책 추가 화면  이동
      </button>
    </>
  );
}

export default HomeScreen;