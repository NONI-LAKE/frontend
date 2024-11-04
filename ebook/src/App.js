import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import authorImage from './author.jpg';
import hangangImage from './HANGANG.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Library from './Library'; // Library 컴포넌트 import

const App = () => {
    const [selectedDay, setSelectedDay] = useState('월');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const dayResults = {
        월: Array.from({ length: 18 }, (_, index) => (index + 1).toString()),
        화: Array.from({ length: 18 }, (_, index) => (index + 19).toString()),
        수: Array.from({ length: 18 }, (_, index) => (index + 37).toString()),
        목: Array.from({ length: 18 }, (_, index) => (index + 55).toString()),
        금: Array.from({ length: 18 }, (_, index) => (index + 73).toString()),
        토: Array.from({ length: 18 }, (_, index) => (index + 91).toString()),
        일: Array.from({ length: 18 }, (_, index) => (index + 109).toString()),
    };

    const authorInterview = {
        월: {
            image: authorImage,
            text: "이것은 월요일 작가의 인터뷰 내용입니다.",
        },
        화: {
            image: authorImage,
            text: "이것은 화요일 작가의 인터뷰 내용입니다.",
        },
        수: {
            image: authorImage,
            text: "이것은 수요일 작가의 인터뷰 내용입니다.",
        },
        목: {
            image: authorImage,
            text: "이것은 목요일 작가의 인터뷰 내용입니다.",
        },
        금: {
            image: authorImage,
            text: "이것은 금요일 작가의 인터뷰 내용입니다.",
        },
        토: {
            image: authorImage,
            text: "이것은 토요일 작가의 인터뷰 내용입니다.",
        },
        일: {
            image: authorImage,
            text: "이것은 일요일 작가의 인터뷰 내용입니다.",
        },
    };

    const handleLibraryClick = () => {
        navigate('/library'); // "/library"로 이동
    };

    return (
        <div className="App">
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="MJ B&M Logo" className="logo-image" />
                </div>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="검색" />
                    <span className="search-icon"><i className="fas fa-search"></i></span>
                    <i className="fas fa-user user-icon"></i>
                    <i className="fas fa-book-open book-icon"></i>
                </div>
                <div className="library-button-container">
                    <button className="library-button" onClick={handleLibraryClick}>서재</button>
                </div>
            </header>

            <div className="day-tabs">
                {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                    <button 
                        className={`day-tab ${day === selectedDay ? 'active' : ''}`} 
                        key={day} 
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="book-list">
                {dayResults[selectedDay].map(num => (
                    <div className="book-item" key={num}>
                        <img src={`https://picsum.photos/160/160?random=${num}`} alt={`Book Thumbnail ${num}`} />
                        <div className="book-title">작품 제목 {num}</div>
                    </div>
                ))}
            </div>

            <div className="author-info">
                <img src={authorImage} alt="작가 이름" className="author-image" />
                <div className="author-interview">
                    <h2>한상윤 작가</h2>
                    <p>프랑스에서보다 한국에서 더 많은 인기를 얻고 있는 작가로도 알려져 있기도 하며, 톨스토이, 셰익스피어, 헤르만 헤세 등과 함께 한국인이 가장 좋아하는 외국 작가로 선정된 바 있는 소설가이다. 일곱 살 때부터 단편소설을 쓰기 시작한 타고난 글쟁이다. 베르나르 베르베르는 1961년 프랑스 툴루즈에서 태어났다.
                    「별들의 전쟁」세대에 속하기도 하는 그는 고등학교 때는 만화와 시나리오에 탐닉하면서 『만화 신문』을 발행하였고, 이후 올더스 헉슬리와 H.G. 웰즈를 사숙하면서 소설과 과학을 익혔다.
                    대학 졸업 후에는 『르 누벨 옵세르바퇴르』에서 저널리스트로 활동하면서 과학 잡지에 개미에 관한 평론을 발표해 오다 드디어 1991년 1백 20번에 가까운 개작을 거친 『개미(Les Fourmis)』를 발표, 전세계 독자들을 사로잡으며 단숨에 주목받는 프랑스의 천재 작가로 떠올랐다.</p>
                </div>
            </div>

            <div className="desired-photo-container">
                <img src={hangangImage} alt="원하는 사진" className="desired-photo" />
            </div>

            <div className="logo">
                <svg className="book-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M4 2C2.89 2 2 2.89 2 4V20C2 21.11 2.89 22 4 22H20C21.11 22 22 21.11 22 20V4C22 2.89 21.11 2 20 2H4zM4 0H20C22.21 0 24 1.79 24 4V20C24 22.21 22.21 24 20 24H4C1.79 24 0 22.21 0 20V4C0 1.79 1.79 0 4 0z"/>
                    <path d="M4 2H20V4H4V2ZM4 20H20V22H4V20Z"/>
                </svg>
                <div className="logo-text">MJ B&M</div>
            </div>
        </div>
    );
};

const MainApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/library" element={<Library />} />
            </Routes>
        </Router>
    );
};

export default MainApp;
