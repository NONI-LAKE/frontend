// Library.js
import React from 'react';
import './Library.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Library = () => {
    const navigate = useNavigate(); // 네비게이션을 위해 useNavigate 훅 사용

    const books = [
        { id: 1, title: '고도를 기다리며', author: '사뮈엘 베케트', image: 'https://picsum.photos/100/150?random=1' },
        { id: 2, title: '원피스 34권', author: '오다 에이치로', image: 'https://picsum.photos/100/150?random=2' },
        { id: 3, title: '노인과 바다', author: '어니스트 헤밍웨이', image: 'https://picsum.photos/100/150?random=3' },
        { id: 4, title: '1984', author: '조지 오웰', image: 'https://picsum.photos/100/150?random=4' },
        { id: 5, title: '오만과 편견', author: '제인 오스틴', image: 'https://picsum.photos/100/150?random=5' },
        { id: 6, title: '죄와 벌', author: '표도르 도스토예프스키', image: 'https://picsum.photos/100/150?random=6' },
        { id: 7, title: '멋진 신세계', author: '올더스 헉슬리', image: 'https://picsum.photos/100/150?random=7' },
        { id: 8, title: '안나 카레니나', author: '레프 톨스토이', image: 'https://picsum.photos/100/150?random=8' },
        { id: 9, title: '해리포터와 마법사의 돌', author: 'J.K. 롤링', image: 'https://picsum.photos/100/150?random=9' },
        { id: 10, title: '모비딕', author: '허먼 멜빌', image: 'https://picsum.photos/100/150?random=10' },
        { id: 11, title: '데미안', author: '헤르만 헤세', image: 'https://picsum.photos/100/150?random=11' },
        { id: 12, title: '바람과 함께 사라지다', author: '마거릿 미첼', image: 'https://picsum.photos/100/150?random=12' },
        { id: 13, title: '폭풍의 언덕', author: '에밀리 브론테', image: 'https://picsum.photos/100/150?random=13' },
        { id: 14, title: '프랑켄슈타인', author: '메리 셸리', image: 'https://picsum.photos/100/150?random=14' },
        { id: 15, title: '셜록 홈즈의 모험', author: '아서 코난 도일', image: 'https://picsum.photos/100/150?random=15' },
        // 추가 책들...
    ];

    // 책 클릭 시 BookDetail로 이동하는 함수
    const handleBookClick = (book) => {
        navigate('/book-detail', { state: { book } }); // 클릭된 책 정보를 넘기며 페이지 이동
    };

    const handleDelete = (id) => {
        console.log(`책 ID ${id} 삭제됨`);
        // 삭제 로직 추가
    };

    const handleSubscribe = (id) => {
        console.log(`책 ID ${id} 구독됨`);
        // 구독 로직 추가
    };

    return (
        <div>
            <Header />
            <h1 className="library-header">내 서재</h1>
            <div className="book-list">
                {books.map(book => (
                    <div className="book-card" key={book.id} onClick={() => handleBookClick(book)}>
                        <img src={book.image} alt={book.title} className="book-image" />
                        <div className="book-details">
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </div>
                        <div className="button-library-container">
                            <button onClick={() => handleDelete(book.id)} className="action-library-button">삭제</button>
                            <button onClick={() => handleSubscribe(book.id)} className="action-library-button">구독하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Library;
