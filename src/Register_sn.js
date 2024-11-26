import React, { useState } from 'react';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    author: '',
    publisher: '',
    pubdate: '',
    ISBN: '',
    upload_day: '',
    star: 0,
    star_count: 0,
    hashtag: '',
    intro: '',
    thumbnail:''
  });

  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null); // 에러 상태 추가

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // 숫자 필드 처리
    if (name === 'star' || name === 'star_count') {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0, // 숫자로 변환 (기본값 0)
      });
    }
    // 해시태그 처리
    else if (name === 'hashtag') {
      setFormData({
        ...formData,
        [name]: value.split(',').map((tag) => tag.trim()), // 쉼표로 구분된 해시태그 배열로 변환
      });
    } 
    // 파일 처리
    else if (name === 'epubFile' || name === 'thumbnailFile') {
      const file = files[0]; // 선택한 첫 번째 파일을 가져옴
      
      // epub 파일만 받기
      if (name === 'epubFile' && file && file.type !== 'application/epub+zip') {
        setError('EPUB 파일은 .epub 형식만 가능합니다.');
        return;
      }
    
      // 썸네일 파일은 .webp만 받기
      if (name === 'thumbnailFile' && file && file.type !== 'image/webp') {
        setError('썸네일 이미지는 .webp 형식만 가능합니다.');
        return;
      }
    
      // 에러가 없을 경우 formData에 파일 저장
      setError(null); // 에러 초기화
      setFormData({
        ...formData,
        [name]: file,  // value 대신 file 객체를 저장
      });
    }
    // 나머지 필드는 일반적인 텍스트 값으로 처리
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log('Form Data:', formData); // 디버깅용 로그
  
    // 파일이 없으면 제출을 하지 않음
    if (!formData.epubFile || !formData.thumbnailFile) {
      setError('EPUB 파일과 썸네일 이미지를 모두 첨부해야 합니다.');
      return;
    }
  
    // title에서 공백을 '+'로 대체
    const sanitizedTitle = formData.title.replace(/\s+/g, '+');
    const thumbnailUrl = `https://kyobodts-cda1-5l3t-mjbm-ap-northeast-2-s3.s3.ap-northeast-2.amazonaws.com/thumbnail/${sanitizedTitle}.webp`;
  
    // formData 복사본 생성 및 thumbnailFile, epubFile 제거
    const { thumbnailFile, epubFile, ...restData } = formData;
  
    // metadata 생성
    const metadata = { ...restData, thumbnail: thumbnailUrl };
  
    const jsonData = JSON.stringify({ metadata }, null, 2);
    setJsonOutput(jsonData);
  
    const url = `https://admin.5l3t-mjbm.click/register_sn/${formData.title}`;
  
    try {
      // 1. 서버에 메타데이터 전송하여 업로드 URL 받기
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      });
  
      if (!response.ok) {
        throw new Error(`요청 실패! 상태 코드: ${response.status}`);
      }
  
      const data = await response.json();
      const { epub_upload_url, thumbnail_upload_url } = data; // 응답에서 URL 받기
  
      // 2. EPUB 파일 업로드
      const epubUploadResponse = await fetch(epub_upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/epub+zip',
        },
        body: epubFile, // 실제 EPUB 파일 객체를 전송
      });
  
      if (!epubUploadResponse.ok) {
        throw new Error(`EPUB 파일 업로드 실패! 상태 코드: ${epubUploadResponse.status}`);
      }
  
      // 3. 썸네일 파일 업로드
      const thumbnailUploadResponse = await fetch(thumbnail_upload_url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/webp',
        },
        body: thumbnailFile, // 실제 썸네일 파일 객체를 전송
      });
  
      if (!thumbnailUploadResponse.ok) {
        throw new Error(`썸네일 파일 업로드 실패! 상태 코드: ${thumbnailUploadResponse.status}`);
      }
  
      alert('성공적으로 작품이 등록되었습니다.');
    } catch (error) {
      console.error('네트워크 또는 서버 오류:', error);
      alert(error.message);
    }
  };
  
  return (
    <div>
      <Header />
      <form className="admin-form" onSubmit={handleSubmit}>
        <h1>연재 소설 신규 작품 등록</h1>
        <div>
          제목:
          <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        </div>
        <div>
          장르:
          <input type="text" name="genre" placeholder="Genre" onChange={handleChange} />
        </div>
        <div>
          작가:
          <input type="text" name="author" placeholder="Author" onChange={handleChange} />
        </div>
        <div>
          출판사:
          <input type="text" name="publisher" placeholder="Publisher" onChange={handleChange} />
        </div>
        <div>
          출판일:
          <input type="text" name="pubdate" placeholder="Publication Date" onChange={handleChange} />
        </div>
        <div>
          ISBN:
          <input type="text" name="ISBN" placeholder="ISBN" onChange={handleChange} />
        </div>
        <div>
          업로드 요일:
          <input type="text" name="upload_day" placeholder="Upload Day" onChange={handleChange} />
        </div>
        <div>
          별점:
          <input type="number" name="star" placeholder="Star Rating" onChange={handleChange} />
        </div>
        <div>
          별점 수:
          <input type="number" name="star_count" placeholder="Star Count" onChange={handleChange} />
        </div>
        <div>
          해시태그:
          <input type="text" name="hashtag" placeholder="Hashtags (comma-separated)" onChange={handleChange} />
        </div>
        <div>
          소개글:
          <textarea name="intro" placeholder="Introduction" onChange={handleChange}></textarea>
        </div>
        <div>
          썸네일 이미지 (.webp):
          <input type="file" name="thumbnailFile" onChange={handleChange} />
        </div>
        <div>
          EPUB 파일 (.epub):
          <input type="file" name="epubFile" onChange={handleChange} />
        </div>
        <button type="submit">등록하기</button>

        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default Register;
