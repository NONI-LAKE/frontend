import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const Header = ({ onLibraryClick }) => {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLogoClick = () => {
        navigate('/'); // 로고 클릭 시 홈페이지로 이동
    };

    return (
        <header className="header">
            <div className="logo" onClick={handleLogoClick}> {/* 로고 클릭 이벤트 추가 */}
                <img src={logo} alt="MJ B&M Logo" className="logo-image" />
            </div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="검색" />
                <span className="search-icon"><i className="fas fa-search"></i></span>
                <i className="fas fa-user user-icon"></i>
                <i className="fas fa-book-open book-icon"></i>
            </div>
            <div className="library-button-container">
                <button className="library-button" onClick={onLibraryClick}>서재</button>
            </div>
        </header>
    );
};

export default Header;
