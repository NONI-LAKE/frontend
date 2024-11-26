import React, { useEffect, useRef, useState } from 'react';
import Epub from 'epubjs'; // epub.js 라이브러리 import
import './EPubViewer.css'; // 작성한 CSS 파일 import

const EPubViewer = ({ url }) => {
    const viewerRef = useRef(null);  // 'viewer' DOM을 참조하는 ref
    const renditionRef = useRef(null); // 'rendition' 참조 변수
    const [bookLoaded, setBookLoaded] = useState(false); // 책 로딩 상태 추적

    useEffect(() => {
        if (viewerRef.current && url) {
            // EPUB 파일 로딩
            const book = Epub(url);
    
            // EPUB 콘텐츠를 렌더링
            const rendition = book.renderTo(viewerRef.current, { width: '100%', height: '100vh' });
            renditionRef.current = rendition;
    
            rendition.display().then(() => {
                // iframe의 sandbox 속성 수정
                const iframe = viewerRef.current.querySelector('iframe');
                if (iframe) {
                    iframe.removeAttribute('sandbox'); // sandbox 속성 제거
                    console.log('Sandbox 속성 제거 완료:', iframe);
                }
                setBookLoaded(true); // 책 로딩 완료 상태 업데이트
            });
    
            return () => {
                // 컴포넌트 언마운트 시 책 리소스 해제
                book.destroy();
            };
        }
    }, [url]);
    
    // 이전 페이지
    const handlePrev = () => {
        console.log('이전 페이지 버튼 클릭됨'); // 디버깅
        if (renditionRef.current) {
            console.log('이전 페이지 이동 호출');
            renditionRef.current.prev().catch((err) => console.error('이전 페이지 이동 실패:', err));
        } else {
            console.warn('renditionRef.current가 초기화되지 않았습니다.');
        }
    };
    
    const handleNext = () => {
        console.log('다음 페이지 버튼 클릭됨'); // 디버깅
        if (renditionRef.current) {
            console.log('다음 페이지 이동 호출');
            renditionRef.current.next().catch((err) => console.error('다음 페이지 이동 실패:', err));
        } else {
            console.warn('renditionRef.current가 초기화되지 않았습니다.');
        }
    };
    
    return (
        <>
            {/* 버튼이 제대로 로딩되었을 때만 렌더링 */}
            {bookLoaded && (
                <div className="viewer-button-container">
                    <button 
                        onClick={handlePrev} 
                        disabled={!renditionRef.current}  // 'rendition'이 없으면 비활성화
                    >
                        이전 페이지
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={!renditionRef.current}  // 'rendition'이 없으면 비활성화
                    >
                        다음 페이지
                    </button>
                </div>
            )}
            
            {/* 뷰어 영역 */}
            <div ref={viewerRef} style={{ width: '100%', height: '100vh' }}>
                {/* EPUB 콘텐츠가 렌더링될 영역 */}
            </div>
        </>
    );
};

export default EPubViewer;
