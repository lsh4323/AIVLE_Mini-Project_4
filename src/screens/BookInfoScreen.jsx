import { useNavigate } from 'react-router-dom';

function BookInfoScreen(book) {
    const navigate = useNavigate();
    
    return (
        <>
            <h1>책 정보 화면</h1>
            <button onClick={() => navigate('/')}>
            홈 화면으로 이동
            </button>
        </>
        
    );
}

export default BookInfoScreen;