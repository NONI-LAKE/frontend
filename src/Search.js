import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';
import Header from './Header';
const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchTerm, results: initialResults, bookType } = location.state || { searchTerm: "", results: [], bookType: "" };
    const [results, setResults] = useState(initialResults);
    const [lastId, setLastId] = useState(initialResults.length > 0 ? Math.max(...initialResults.map((book) => book.series_id)) : 0); // 초기 last_id 설정
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    // 중복 제거 함수
    const mergeResults = (existingResults, newResults) => {
        const existingIds = new Set(existingResults.map((book) => book.series_id));
        return [...existingResults, ...newResults.filter((book) => !existingIds.has(book.series_id))];
    };
    // 책 클릭 시 BookDetail 페이지로 이동
    const handleBookClick = async (book) => {
        try {
            const bookTitle = book.series_name || book.book_name;
            if (!bookTitle) throw new Error('Book title is missing');
            const baseUrl =
                bookType === 'serial_books'
                    ? 'https://backend.5l3t-mjbm.click/serial_novel/search/'
                    : 'https://backend.5l3t-mjbm.click/general_book/search/';
            const response = await fetch(`${baseUrl}${encodeURIComponent(bookTitle)}`);
            if (!response.ok) throw new Error('Failed to fetch book details');
            const bookDetails = await response.json();
            if (bookType === 'ebook') {
                navigate('/book-detail-general', { state: { book: bookDetails } });
            } else if (bookType === 'serial_books') {
                navigate('/book-detail-serial', { state: { book: bookDetails } });
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };
    // 더보기 버튼 클릭 시 추가 데이터 불러오기
    const handleLoadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const baseUrl = `https://backend.5l3t-mjbm.click/books/search`;
            const endpoint = bookType === 'ebook' ? '/gb/' : '/sn/';
            const apiUrl = `${baseUrl}${endpoint}${encodeURIComponent(searchTerm)}?last_id=${lastId}`;
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('Failed to fetch more results');
            const data = await response.json();
            if (data.length === 0) {
                setHasMore(false);
            } else {
                const newResults = mergeResults(results, data);
                setResults(newResults);
                // 응답 데이터 중 가장 높은 series_id로 lastId 업데이트
                const newLastId = Math.max(...data.map((book) => book.series_id));
                setLastId(newLastId);
            }
        } catch (error) {
            console.error('Error loading more results:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="Search">
            <Header />
            <h1>검색 결과: {searchTerm}</h1>
            <div className="search-results">
                {results.length > 0 ? (
                    results.map((book, index) => (
                        <div
                            className="search-item"
                            key={book.series_id}
                            onClick={() => handleBookClick(book)}
                        >
                            <img
                                src={book.thumbnail || `https://picsum.photos/120/160?random=${index}`}
                                alt={book.book_name || book.series_name}
                            />
                            <div className="book-info">
                                <h2 className="book-title">{book.book_name || book.series_name}</h2>
                                <p>작가: {book.book_author || book.series_author}</p>
                                {book.upload_day && <p>업로드 요일: {book.upload_day}</p>}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
            {hasMore && (
                <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
                    {loading ? '로딩 중...' : '더보기'}
                </button>
            )}
        </div>
    );
};
export default Search;