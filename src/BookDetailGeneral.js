import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import './BookDetail.css';
import { FaStar, FaRegStar } from 'react-icons/fa'; // 별 아이콘 가져오기

const BookDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { book } = location.state || {};

    if (!book) {
        return <div>책 정보를 불러오는 중에 오류가 발생했습니다.</div>;
    }

    const handleLibraryClick = () => {
        navigate('/library');
    };

    const handleReadClick = async () => {
        try {
            const response = await fetch(`https://backend.5l3t-mjbm.click/general_book/read/${encodeURIComponent(book.title)}`);
            if (!response.ok) throw new Error('Failed to fetch EPUB URL');
    
            const data = await response.json(); // {"url": "https://..."}
            const epubUrl = data.url;
    
            // 기존 /read 경로로 이동
            navigate('/read', {
                state: { book, epubFile: epubUrl },
            });
        } catch (error) {
            console.error('Error fetching EPUB URL:', error);
        }
    };
    
    const seriesList = Array.from({ length: 8 }, (_, index) => ({
        seriesNumber: index + 1,
        title: `${book.title} - 시리즈 ${index + 1}`,
        author: book.author || '저자 정보 없음',
        image: book.thumbnail || 'https://picsum.photos/80/120', // 기본 이미지 추가
    }));

    const handleViewClick = (series) => {
        navigate('/read', {
            state: {
                book: series,
                epubFile: '/epub/sample.epub',
            },
        });
    };

    const renderStars = () => {
        const fullStars = Math.floor(book.star || 0);
        const emptyStars = 5 - fullStars;

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="star-icon filled" />
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="star-icon empty" />
                ))}
                <span className="star-count">({book.star_count || 0} 리뷰)</span>
            </>
        );
    };

    return (
        <div className="book-detail">
            <Header onLibraryClick={handleLibraryClick} />
            <div className="book-content">
                <img
                    src={book.thumbnail || 'https://picsum.photos/180/270'}
                    alt={book.title || 'Book Thumbnail'}
                    className="book-detail-image"
                />
                <div className="book-info">
                    <h1>{book.title || '제목 없음'}</h1>
                    <p>{book.intro || '이 책에 대한 설명이 없습니다.'}</p>
                    <div className="author-bookdetail-info">
                        저자: {book.author || '저자 정보 없음'}
                    </div>
                    <div className="rating-info">
                        {renderStars()}
                    </div>
                    <div className="book-button-container">
                        <button className="action-book-button">서재에 넣기</button>
                        <button className="action-book-button" onClick={handleReadClick}>
                            바로 읽기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
