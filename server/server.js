const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;  // 서버 포트

// CORS 설정 (React 앱과 서버 간의 요청을 허용)
app.use(cors());

// MySQL 데이터베이스 연결
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // MySQL 사용자명
  password: '4291',  // MySQL 비밀번호
  database: 'book_store',  // 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 오류:', err);
  } else {
    console.log('MySQL 데이터베이스에 연결됨');
  }
});

// serial_books 테이블에서 책 목록 가져오기
app.get('/api/serial_books', (req, res) => {
  db.query('SELECT * FROM serial_books', (err, results) => {
    if (err) {
      res.status(500).send('데이터를 불러오는 데 오류가 발생했습니다.');
    } else {
      res.json(results);
    }
  });
});

// ebook 테이블에서 책 목록 가져오기
app.get('/api/ebook', (req, res) => {
  db.query('SELECT * FROM ebook', (err, results) => {
    if (err) {
      res.status(500).send('데이터를 불러오는 데 오류가 발생했습니다.');
    } else {
      res.json(results);
    }
  });
});

// 검색 API 추가
app.get('/api/search', (req, res) => {
  const searchTerm = req.query.q;
  const query = `
      SELECT * FROM ebook WHERE title LIKE ? 
      UNION 
      SELECT * FROM serial_books WHERE title LIKE ?
  `;
  db.query(query, [`%${searchTerm}%`, `%${searchTerm}%`], (err, results) => {
      if (err) {
          console.error('검색 중 오류 발생:', err);
          return res.status(500).json({ error: '검색 중 오류가 발생했습니다.' });
      }
      res.json(results);
  });
});


// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중`);
});
