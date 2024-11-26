import React, { useState, useEffect } from 'react';
import Header from './Header';

const Update = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [file, setFile] = useState(null);
  const [serialBooks, setSerialBooks] = useState([]); // 선택된 요일의 책 리스트
  const [message, setMessage] = useState(''); // 사용자 피드백 메시지

  // 선택된 요일에 따른 책 리스트 가져오기
  useEffect(() => {
    const fetchBooksForDay = async () => {
      try {
        const response = await fetch(`https://backend.5l3t-mjbm.click/books/home/sn/${selectedDay}`);
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();
        setSerialBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (selectedDay) {
      fetchBooksForDay();
    }
  }, [selectedDay]);

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setSelectedBook(''); // 요일 변경 시 선택된 책 초기화
    setMessage('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/epub+zip') {
      alert('EPUB 파일만 첨부할 수 있습니다.');
      setFile(null); // EPUB 파일이 아니면 상태 초기화
    } else {
      setFile(selectedFile); // EPUB 파일일 경우 상태에 파일 저장
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 상태 값 로그 출력
    console.log('Selected Day:', selectedDay);
    console.log('Selected Book:', selectedBook);
    console.log('File:', file);

    if (!selectedDay || !selectedBook || !file) {
      setMessage('모든 항목을 선택하고 파일을 첨부해주세요!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // selectedBook을 사용하여 API 요청 URL 설정
      const url = `https://admin.5l3t-mjbm.click/add_sn/${selectedBook}`;
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('업로드 실패');

      const data = await response.json();
      const { upload_url } = data; // 응답에서 URL 받기

      // EPUB 파일을 upload_url로 업로드
      const epubUploadResponse = await fetch(upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/epub+zip', // EPUB 파일 형식 지정
        },
        body: file, // 실제 EPUB 파일 객체를 전송
      });

      if (!epubUploadResponse.ok) throw new Error('파일 업로드 실패');

      alert('성공적으로 업데이트 되었습니다.');
    } catch (error) {
      console.error('업로드 실패:', error);
      setMessage('파일 업로드 중 오류가 발생했습니다.');
    }
  };


  return (
    <div>
      <Header />
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>연재소설 업데이트</h2>

        {/* 요일 선택 */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="day-select">요일 선택:</label>
          <select
            id="day-select"
            value={selectedDay}
            onChange={handleDayChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">-- 요일 선택 --</option>
            <option value="Monday">월요일</option>
            <option value="Tuesday">화요일</option>
            <option value="Wednesday">수요일</option>
            <option value="Thursday">목요일</option>
            <option value="Friday">금요일</option>
            <option value="Saturday">토요일</option>
            <option value="Sunday">일요일</option>
          </select>
        </div>

        {/* 책 선택 */}
        {selectedDay && (
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="book-select">책 선택:</label>
            <select
              id="book-select"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            >
              <option value="">-- 책 선택 --</option>
              {serialBooks.map((book, index) => (
                <option key={index} value={book.series_name}>
                  {book.series_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* EPUB 파일 첨부 */}
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="file-upload">EPUB 파일:</label>
          <input type="file" name="epubFile" onChange={handleFileChange} />
        </div>

        {/* 제출 버튼 */}
        <button type="submit">
          업로드
        </button>
      </form>

    </div>
  );
};

export default Update;
