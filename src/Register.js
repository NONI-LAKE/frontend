import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const Registration = () => {
    const [bookType, setBookType] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        author: '',
        publisher: '',
        publishDate: '',
        isbn: '',
        thumbnail: '',
        rating: '',
        ratingCount: '',
        description: '',
        epubFile: null,
        releaseFrequency: '', // 연재물에 해당
        commentCount: '', // 연재물에 해당
        hashtags: [], // 연재물에 해당
        firstEpubFile: null, // 연재물에 해당
    });

    const navigate = useNavigate();

    const handleBookTypeChange = (e) => {
        setBookType(e.target.value);
        setFormData({
            ...formData,
            releaseFrequency: '',
            commentCount: '',
            hashtags: [],
            firstEpubFile: null,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const handleHashtagChange = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            setFormData({
                ...formData,
                hashtags: [...formData.hashtags, e.target.value],
            });
            e.target.value = '';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // 여기에서 실제 API 호출로 데이터를 서버에 전송하거나 다른 처리를 할 수 있습니다.
        // 예시로 console.log로 데이터를 출력하고 있습니다.
        navigate('/'); // 제출 후 홈 페이지로 이동
    };

    return (
        
        <div className="registration-form">

            <Header />
            <h1>신규 작품 등록</h1>
            <form onSubmit={handleSubmit}>
                {/* 연재물 / 일반도서 선택 */}
                <div className="form-group">
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="일반도서"
                                checked={bookType === '일반도서'}
                                onChange={handleBookTypeChange}
                            />
                            일반도서
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="연재물"
                                checked={bookType === '연재물'}
                                onChange={handleBookTypeChange}
                            />
                            연재물
                        </label>
                    </div>
                </div>

                {/* 공통 입력 항목들 */}
                <div className="form-group">
                    <label>작품 제목</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>장르</label>
                    <input
                        type="text"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>저자</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>출판사</label>
                    <input
                        type="text"
                        name="publisher"
                        value={formData.publisher}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>출간일</label>
                    <input
                        type="date"
                        name="publishDate"
                        value={formData.publishDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* 공통 파일 첨부 */}
                <div className="form-group">
                    <label>썸네일 (base64) 텍스트</label>
                    <input
                        type="text"
                        name="thumbnail"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>별점</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        min="0"
                        max="5"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>별점 참여 수</label>
                    <input
                        type="number"
                        name="ratingCount"
                        value={formData.ratingCount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>작품 소개</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                {/* 연재물 전용 입력 항목들 */}
                {bookType === '연재물' && (
                    <>
                        <div className="form-group">
                            <label>연재 주기</label>
                            <input
                                type="text"
                                name="releaseFrequency"
                                value={formData.releaseFrequency}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>댓글 수</label>
                            <input
                                type="number"
                                name="commentCount"
                                value={formData.commentCount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>해시태그</label>
                            <input
                                type="text"
                                onKeyDown={handleHashtagChange}
                                placeholder="엔터로 해시태그 추가"
                            />
                            <ul>
                                {formData.hashtags.map((hashtag, index) => (
                                    <li key={index}>{hashtag}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="form-group">
                            <label>첫 화 epub 파일 첨부</label>
                            <input
                                type="file"
                                name="firstEpubFile"
                                accept=".epub"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                    </>
                )}

                {/* 일반도서 전용 epub 파일 첨부 */}
                {bookType === '일반도서' && (
                    <div className="form-group">
                        <label>epub 파일 첨부</label>
                        <input
                            type="file"
                            name="epubFile"
                            accept=".epub"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                )}

                <div className="form-group">
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;