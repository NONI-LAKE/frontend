import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logo from './logo.png';

const Header = ({ onLibraryClick }) => {
    const [selectedCategory, setSelectedCategory] = useState('Ebook');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
    const [results, setResults] = useState(location.state?.results || []);
    const [searchScope, setSearchScope] = useState('ebook');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === '일반도서') {
            navigate('/ebook');
        } else if (category === '연재소설') {
            navigate('/');
        } else if (category === '서재') {
            navigate('/library');
        }
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log("Search triggered with term:", searchTerm, "in scope:", searchScope);

        const lastId = 0; // 기본값 설정
        const baseUrl = "https://backend.5l3t-mjbm.click/books/search";
        const endpoint = searchScope === 'ebook' ? '/gb/' : '/sn/';
        const apiUrl = `${baseUrl}${endpoint}${encodeURIComponent(searchTerm)}?last_id=${lastId}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const formattedResults = Array.isArray(data) ? data : data ? [data] : [];
            setResults(formattedResults);
            console.log("Search results:", formattedResults);

            navigate('/search', {
                state: { searchTerm, results: formattedResults, bookType: searchScope },
            });
        } catch (error) {
            console.error('검색 중 오류가 발생했습니다:', error);
            alert('상품 검색 결과가 없습니다.');
        }
    };

    return (
        <>
<header className="header">
    <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* 목록 버튼 */}
        <div className="menu-icon" onClick={toggleSidebar}>
            <i className="fas fa-bars"></i>
        </div>

        {/* 로고 */}
        <div className="logo" onClick={handleLogoClick}>
            <img src={logo} alt="MJ B&M Logo" className="logo-image" />
        </div>
    </div>

    {/* 검색 */}
    <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="검색"
            />
            <button type="submit" className="search-icon">
                <i className="fas fa-search"></i>
            </button>
            <div className="search-scope">
                <label>
                    <input
                        type="radio"
                        value="ebook"
                        checked={searchScope === 'ebook'}
                        onChange={() => setSearchScope('ebook')}
                    />
                    일반도서
                </label>
                <label>
                    <input
                        type="radio"
                        value="serial_books"
                        checked={searchScope === 'serial_books'}
                        onChange={() => setSearchScope('serial_books')}
                    />
                    연재소설
                </label>
            </div>
        </form>
    </div>

    {/* 카테고리 버튼 */}
    <div className="category-buttons">
        <button
            className={`category-button ${selectedCategory === '일반도서' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('일반도서')}
        >
            일반도서
        </button>
        <button
            className={`category-button ${selectedCategory === '연재소설' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('연재소설')}
        >
            연재소설
        </button>
        <button
            className={`category-button ${selectedCategory === '서재' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('서재')}
        >
            서재
        </button>
    </div>
</header>

            {/* 사이드바 */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>도서 종류</h2>
                    <button className="close-sidebar" onClick={toggleSidebar}>
                        &times;
                    </button>
                </div>
                <ul className="sidebar-list">
                    <li onClick={() => navigate('/genre/romance')}>로맨스</li>
                    <li onClick={() => navigate('/genre/fantasy')}>판타지</li>
                    <li onClick={() => navigate('/genre/sf')}>SF</li>
                    <li onClick={() => navigate('/genre/mystery')}>미스터리</li>
                    <li onClick={() => navigate('/genre/self-help')}>자기계발</li>
                    <li onClick={() => navigate('/genre/philosophy')}>인문학</li>
                    <li onClick={() => navigate('/genre/philosophy')}>철학</li>
                    <li onClick={() => navigate('/genre/history')}>역사</li>
                    <li onClick={() => navigate('/genre/travel')}>여행</li>
                    <li onClick={() => navigate('/genre/business')}>경제</li>
                    <li onClick={() => navigate('/genre/essay')}>에세이</li>
                    <li onClick={() => navigate('/genre/essay')}>수필</li>
                </ul>
            </div>
        </>
    );
};

export default Header;
