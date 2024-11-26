import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EPubViewer from './EPubViewer'; // EPubViewer 컴포넌트 import
import './EPubViewerPage.css';

const EPubViewerPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // navigate 훅 사용
    const { book, epubFile, seriesNumber = 1 } = location.state || {}; // 기본값 설정

    // book 정보가 없으면 오류 처리
    if (!book || !epubFile || seriesNumber === undefined) {
        return <div>EPUB 파일이나 책 제목을 불러오는 중에 오류가 발생했습니다.</div>;
    }

    // 나가기 버튼 클릭 시 BookDetail 페이지로 이동
    const handleExit = () => {
        navigate(-1); // 뒤로 가기 (이전 페이지로 이동)
    };

    // 다음 화로 넘어가는 버튼 클릭 핸들러
    const handleNextEpisode = async () => {
        try {
            const nextSeriesNumber = seriesNumber + 1; // 다음 시리즈 번호 계산
            const response = await fetch(
                `https://backend.5l3t-mjbm.click/serial_novel/read/${encodeURIComponent(book.title)}/${nextSeriesNumber}`
            );
            if (!response.ok) throw new Error(`Failed to fetch EPUB URL for series ${nextSeriesNumber}`);

            const data = await response.json();
            const nextEpubFile = data.url;

            // 다음 화로 이동
            navigate('/read', {
                state: {
                    book,
                    epubFile: nextEpubFile,
                    seriesNumber: nextSeriesNumber, // 다음 화 번호 전달
                },
            });
        } catch (error) {
            console.error('Error fetching next episode EPUB URL:', error);
            alert('다음 화를 불러오는 데 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>{book.title}</h1> {/* 책 제목 */}
            <EPubViewer url={epubFile} /> {/* EPubViewer 컴포넌트에 epubFile 전달 */}
            <div className="button-container">
                {/* 나가기 버튼 */}
                <button onClick={handleExit} className="exit-button">
                    나가기
                </button>
                {/* 다음 화 버튼 */}
                <button onClick={handleNextEpisode} className="next-button">
                    다음 화
                </button>
            </div>
        </div>
    );
};

export default EPubViewerPage;

