import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BookDetail = ({ match }) => {
    const bookId = match.params.id;
    return (
        <div className="book-detail">
            <h2>책 제목 {bookId}</h2>
            <img src={`https://picsum.photos/400/400?random=${bookId}`} alt={`Book Thumbnail ${bookId}`} />
            <p>여기에 책에 대한 자세한 정보가 들어갑니다.</p>
        </div>
    );
};

const TestApp = () => {
    const [selectedDay, setSelectedDay] = useState('월');
    const dayResults = {
        월: Array.from({ length: 18 }, (_, index) => (index + 1).toString()),
        화: Array.from({ length: 18 }, (_, index) => (index + 19).toString()),
        수: Array.from({ length: 18 }, (_, index) => (index + 37).toString()),
        목: Array.from({ length: 18 }, (_, index) => (index + 55).toString()),
        금: Array.from({ length: 18 }, (_, index) => (index + 73).toString()),
        토: Array.from({ length: 18 }, (_, index) => (index + 91).toString()),
        일: Array.from({ length: 18 }, (_, index) => (index + 109).toString()),
    };

    return (
        <div className="book-list">
            {dayResults[selectedDay].map(num => (
                <Link to={`/book/${num}`} key={num} className="book-item">
                    <img src={`https://picsum.photos/160/160?random=${num}`} alt={`Book Thumbnail ${num}`} />
                    <div className="book-title">작품 제목 {num}</div>
                </Link>
            ))}
        </div>
    );
};

export default TestApp;
