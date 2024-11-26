import React, { useState } from 'react';
import Header from './Header';
const Update = () => {
  const [bookTitle, setBookTitle] = useState(''); // 사용자가 입력한 책 제목
  const [message, setMessage] = useState(''); // 사용자 피드백 메시지
  const handleBookTitleChange = (e) => {
    setBookTitle(e.target.value); // 입력된 책 제목 업데이트
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Requesting deletion for:', bookTitle);
    // 필수 값 확인
    if (!bookTitle) {
      setMessage('책 제목을 입력해주세요!');
      return;
    }
    try {
      // 입력한 책 제목을 엔드포인트에 포함
      const url = `https://admin.5l3t-mjbm.click/delete_gb/${encodeURIComponent(bookTitle)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        alert('성공적으로 작품이 삭제되었습니다.');
        setMessage('삭제가 완료되었습니다.');
      } else {
        console.error('Delete failed with status:', response.status);
        setMessage('삭제 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error occurred during deletion:', error);
      setMessage('삭제 요청에 실패했습니다.');
    }
  };
  return (
    <div>
      <Header />
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>일반도서 작품 삭제</h2>
        {/* 책 제목 입력 */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="book-title">책 제목 입력:</label>
          <input
            id="book-title"
            type="text"
            value={bookTitle}
            onChange={handleBookTitleChange}
            placeholder="책 제목을 입력하세요"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        {/* 제출 버튼 */}
        <button type="submit">삭제</button>
        {/* 피드백 메시지 */}
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};
export default Update;