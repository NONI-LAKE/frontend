import React, { useState } from "react";
import "./Payment.css"; // CSS 파일 가져오기
import chipImage from "./chip.png"; // 이미지 가져오기
import visaImage from "./visa.png"; // 이미지 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 React Router 사용
const Payment = () => { //Payment컴포넌트. /payment 경로에 접근하면 Payment 컴포넌트가 화면에 나타남.
  const [cardNumber, setCardNumber] = useState("################");
  const [cardHolder, setCardHolder] = useState("full name");
  const [expMonth, setExpMonth] = useState("mm");
  const [expYear, setExpYear] = useState("yy");
  const [cvv, setCvv] = useState("");
  const [isCvvFocused, setIsCvvFocused] = useState(false);
    //useState를 사용해 상태(state) 정의 및 관리
  const navigate = useNavigate(); // React Router의 네비게이션 훅
  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    const confirmed = window.confirm("결제가 완료되었습니다. 확인을 누르면 메인 페이지로 이동합니다.");
    if (confirmed) { //window.confirm을 사용해 결제가 완료된 후 확인 메시지를 띄움.
      navigate("/"); // App.js 또는 메인 페이지로 이동
    }
  };
  return (
    <div className="container">
      {/* 카드 UI */}
      <div className="card-container">
        {/* 카드 앞면 */}
        <div
          className="front"
          style={{
            transform: isCvvFocused ? "perspective(1000px) rotateY(-180deg)" : "",
          }}
        >
          <div className="image">
            <img src={chipImage} alt="Chip" />
            <img src={visaImage} alt="Visa" />
          </div>
          <div className="card-number-box">{cardNumber}</div>
          <div className="flexbox">
            <div className="box">
              <span>card holder</span>
              <div className="card-holder-name">{cardHolder}</div>
            </div>
            <div className="box">
              <span>expires</span>
              <div className="expiration">
                <span className="exp-month">{expMonth}</span>
                <span className="exp-year">{expYear}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 카드 뒷면 */}
        <div
          className="back"
          style={{
            transform: isCvvFocused ? "perspective(1000px) rotateY(0deg)" : "",
          }}
        >
          <div className="stripe"></div>
          <div className="box">
            <span>cvv</span>
            <div className="cvv-box">{cvv}</div>
            <img src={visaImage} alt="Visa" />
          </div>
        </div>
      </div>
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit}>
        <div className="inputBox">
          <span>card number</span>
          <input
            type="text"
            maxLength="16"
            className="card-number-input"
            onChange={(e) => setCardNumber(e.target.value || "################")}
            //onChange에서, 사용자가 카드 번호 입력란에 값을 입력할 때마다 setCardNumber 함수가 호출됨.
            //이후, 위의 const [cardNumber, setCardNumber] = useState("################"); 에서 상태값이 변경됨.
          />
        </div>
        <div className="inputBox">
          <span>card holder</span>
          <input
            type="text"
            className="card-holder-input"
            onChange={(e) => setCardHolder(e.target.value || "full name")}
          />
        </div>
        <div className="flexbox">
          <div className="inputBox">
            <span>expiration mm</span>
            <select
              className="month-input"
              onChange={(e) => setExpMonth(e.target.value || "mm")}
            >
              <option value="month" disabled selected>
                month
              </option>
              {[...Array(12).keys()].map((month) => (
                <option key={month + 1} value={(month + 1).toString().padStart(2, "0")}>
                  {(month + 1).toString().padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>
          <div className="inputBox">
            <span>expiration yy</span>
            <select
              className="year-input"
              onChange={(e) => setExpYear(e.target.value || "yy")}
            >
              <option value="year" disabled selected>
                year
              </option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <option key={year} value={year.toString().slice(2)}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="inputBox">
            <span>cvv</span>
            <input
              type="text"
              maxLength="4"
              className="cvv-input"
              onFocus={() => setIsCvvFocused(true)}
              onBlur={() => setIsCvvFocused(false)}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
        <input type="submit" value="submit" className="submit-btn" />
      </form>
    </div>
  );
};
export default Payment;