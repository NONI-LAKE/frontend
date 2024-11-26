import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Header';

const Admin = () => {
    const navigate = useNavigate();
  
    return (
    
      <div className="admin-container">
        <Header />
        <h1 className="admin-title">관리자 사이트</h1>
        <div className="action-buttons">
          <button
            className="register-button"
            onClick={() => navigate('./register_gb')}
          >
            일반도서 신규 작품 등록
          </button>
          <button
            className="register-button"
            onClick={() => navigate('./register_sn')}
          >
            연재소설 신규 작품 등록
          </button>
          <button
            className="delete-button"
            onClick={() => navigate('./delete_gb')}
          >
            일반도서 삭제
          </button>
          <button
            className="delete-button"
            onClick={() => navigate('./delete_sn')}
          >
            연재소설 삭제
          </button>
          <button
            className="update-button"
            onClick={() => navigate('./update')}
          >
            연재소설 업데이트
          </button>
        </div>
      </div>
    );
  };
  
  export default Admin;