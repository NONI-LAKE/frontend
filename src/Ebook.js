import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ebook.css';
import Header from './Header';
import BannerImage from './NormalBanner.jpg';

const Ebook = () => {
  const [ebooks, setEbooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://backend.5l3t-mjbm.click/books/home/gb')
      .then(response => response.json())
      .then(data => setEbooks(data))
      .catch(error => console.error('데이터 불러오기 오류:', error));
  }, []);

  const handleLibraryClick = () => {
    navigate('/library');
  };

// Ebook.js
const handleBookClick = async (book) => {
  try {
      const response = await fetch(`https://backend.5l3t-mjbm.click/general_book/search/${encodeURIComponent(book.book_name)}`);
      if (!response.ok) throw new Error('Failed to fetch book details');
      const bookDetails = await response.json();
      navigate('/book-detail-general', { state: { book: bookDetails } });
  } catch (error) {
      console.error('Error fetching book details:', error);
  }
};

  return (
    <div className="Ebook">
      <Header onLibraryClick={handleLibraryClick} />

<div className="book-list">
    {ebooks.map(book => (
        <div className="book-item" key={book.book_id}>
            <img 
                src={book.thumbnail || `https://picsum.photos/160/160?random=${book.book_id}`} 
                alt={`Book Thumbnail ${book.book_name}`} 
                onClick={() => handleBookClick(book)} 
            />
            <div className="book-title" onClick={() => handleBookClick(book)}>
                {book.book_name}
            </div>
            <div className="book-author">
                {book.book_author}
            </div>
        </div>
    ))}
</div>


      <div className="desired-photo-container">
        <img src={BannerImage} alt="원하는 사진" className="desired-photo" />
      </div>
    </div>
  );
};

export default Ebook;
