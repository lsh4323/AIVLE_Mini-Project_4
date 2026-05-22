import { useNavigate } from 'react-router-dom';

function BookAddScreen(book) {
    const navigate = useNavigate();
    
    return (
        <>
            <h1>책 추가 화면 </h1>
            <button onClick={() => navigate('/')}>
                홈 화면으로 이동
            </button>
        </>
        
    );
}

export default BookAddScreen;