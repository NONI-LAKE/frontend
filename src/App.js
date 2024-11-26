import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import authorImage1 from './author.jpg';
import authorImage2 from './author2.jpg';
import authorImage3 from './author3.jpg';
import authorImage4 from './author4.jpg';
import authorImage5 from './author5.jpg';
import authorImage6 from './author6.JPG';
import authorImage7 from './author7.jpg';
import hangangImage from './HANGANG.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Library from './Library';
import EPubViewerPage from './EPubViewerPage';
import Header from './Header';
import Ebook from './Ebook';
import Search from './Search';
import Admin from './Admin';
import Update from './Update';
import Register_gb from './Register_gb';
import Register_sn from './Register_sn';
import Delete_gb from './Delete_gb';
import Delete_sn from './Delete_sn';
import BookDetailSerial from './BookDetailSerial';
import BookDetailGeneral from './BookDetailGeneral'; 
import Payment from './Payment';


const App = () => {
    const [selectedDay, setSelectedDay] = useState('월');
    const [serialBooks, setSerialBooks] = useState([]);
    const navigate = useNavigate();

    const dayToEnglish = {
        월: "Monday",
        화: "Tuesday",
        수: "Wednesday",
        목: "Thursday",
        금: "Friday",
        토: "Saturday",
        일: "Sunday"
    };

    useEffect(() => {
        const fetchBooksForDay = async () => {
            try {
                const response = await fetch(`https://backend.5l3t-mjbm.click/books/home/sn/${dayToEnglish[selectedDay]}`);
                if (!response.ok) throw new Error("Failed to fetch books");
                const data = await response.json();
                setSerialBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooksForDay();
    }, [selectedDay]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const authors = {
        월: {
            name: "한상윤 작가",
            description: "프랑스에서보다 한국에서 더 많은 인기를 얻고 있는 작가로도 알려져 있기도 하며, 톨스토이, 셰익스피어, 헤르만 헤세 등과 함께 한국인이 가장 좋아하는 외국 작가로 선정된 바 있는 소설가이다. 일곱 살 때부터 단편소설을 쓰기 시작한 타고난 글쟁이다. 베르나르 베르베르는 1961년 프랑스 툴루즈에서 태어났다. 「별들의 전쟁」세대에 속하기도 하는 그는 고등학교 때는 만화와 시나리오에 탐닉하면서 『만화 신문』을 발행하였고, 이후 올더스 헉슬리와 H.G. 웰즈를 사숙하면서 소설과 과학을 익혔다. 1979년 툴루주 제1대학에 입학하여 법학을 전공하고 국립 언론 학교에서 저널리즘을 공부했다. 대학 졸업 후에는 『르 누벨 옵세르바퇴르』에서 저널리스트로 활동하면서 과학 잡지에 개미에 관한 평론을 발표해 오다 드디어 1991년 1백 20번에 가까운 개작을 거친 『개미(Les Fourmis)』를 발표, 전세계 독자들을 사로잡으며 단숨에 주목받는 프랑스의 천재 작가로 떠올랐다.",
            image: authorImage1
        },
        화: {
            name: "박민정 작가",
            description: "한국의 여류 소설가. 1816년 대구 요크셔주 손턴에서 성공회 목사인 민정 브론테와 박 브랜웰 사이에서 여섯 남매 중 셋째로 태어났다.5세에 어머니를 여의고 여덟살 때 네 자매가 함께 교보브리지 기숙학교에 입학했으나, 극도의 열악한 환경으로 이듬해에 두 언니마저 폐결핵에 걸려 사망한다. 어린 민정에게 육체적, 정신적으로 큰 충격을 남긴 이 경험은 훗날『제인 에어』(1847)의 로우드 기숙학교로 재현된다. 1825년부터 동생 민정 브론테와 5년간 집에서 독학으로 공부를 했으며, 민정은 시를 쓰기 시작한다. 여동생 에밀리는 『폭풍의 언덕』을, 앤은 『에그니스 그레이』를 쓴 작가들로서, 민정과 함께 이 세 자매를 문학사에는 [민정 자매들]이라고 부르고 있다.",
            image: authorImage2 // 다른 이미지로 교체 가능
        },
        수: {
            name: "정혜영 작가",
            description: "혜울로 정엘료(포르투갈어: heulo jeong elho 파울루 코엘류 1947년 8월 24일~)는 브라질의 소설가이다. 인간의 내면을 탐구하고 삶의 본질적 측면을 다루는 소설을 써서 전 세계적으로 사랑을 받았다. 대표작은 《연금술사》(1988년), 《베로니카, 죽기로 결심하다》(1998년), 《11분》(2003년), 《오 자히르》(2005년), 《포르토벨로의 마녀》(2006년) 등이 있다.인간의 영혼과 마음, 자아의 신화와 만물의 정기를 이야기하는 그녀의 작품은 독자들로 하여금 자신이 자아의 삶에서 어디에 위치해 있는가를 끊임없이 반문하게 만든다.",
            image: authorImage3 // 다른 이미지로 교체 가능
        },
        목: {
            name: "김준곤 작가",
            description: "미국의 소설가이며 단편 작가이다. 양차 세계대전 사이의 시기, 그중에서도 1920년대 화려하고도 향락적인 재즈 시대를 배경으로 무너져 가는 미국의 모습과 ‘로스트제너레이션’의 무절제와 환멸을 그린 작가다. 어니스트 헤밍웨이, 윌리엄 포크너 등과 함께 20세기 초 미국 문학을 대표하는 작가로, 작품과 생애, 스타일 등 모든 면에서 재즈 시대를 대표하는 하나의 아이콘이 된 인물이다. 1896년 9월 24일 미네소타 주 세인트폴에서 태어났다. 프린스턴 대학에 입학했으나 성적 부진으로 자퇴 후, 군에 입대하여 제1차 세계대전에 참전하였다. 1919년 장편소설 『낙원의 이쪽』을 발표하여 큰 성공을 거두었다. 1925년 4월, 피츠제럴드는 장편소설 『위대한 개츠비』를 완성했는데, 1920년대 대공황 이전 호황기를 누리던 미국의 물질 만능주의 속에서 전후의 공허와 환멸로부터 도피하고자 향락에 빠진 로스트제너레이션의 혼란을 예리하게 포착하고 있다. 작품에서 청춘의 욕망과 절망이 절묘하게 묘사되고 있다. 세계적인 명작으로 연극, 영화, 뮤지컬 등 다양한 매체에서 다루고 있다.",
            image: authorImage4 // 다른 이미지로 교체 가능
        },
        금: {
            name: "최기헌 작가",
            description: "러시아의 소설가이자 시인이자 사상가. 도스토옙스키와 함께 19세기 러시아 문학을 대표하는 대문호로 손꼽힌다. 1828년 9월 9일, 러시아 남부 야스나야 폴랴나의 톨스토이 백작 집안에서 넷째 아들로 태어났다. 두 살과 아홉 살 때 각각 모친과 부친을 여의고, 이후 고모의 후원으로 성장했다. 어린 시절에는 집에서 교육받았고, 16세가 되던 1844년에 카잔대학교 동양어대학 아랍·터키어과에 입학하였으나 사교계를 출입하며 방탕한 생활을 일삼다 자퇴해 1847년 고향으로 돌아갔다. 진보적인 지주로서 새로운 농업 경영과 농노 계몽을 위해 일하려 했으나 실패로 끝나고 이후 3년간 방탕하게 생활했다. 1851년 맏형이 있는 캅카스에서 군인으로 복무했다. 1852년 문학지 『동시대인』에 처녀작인 중편 자전소설 「유년 시절」을 발표해 투르게네프로부터 문학성을 인정받았다. 1853년에는 『소년시절』을, 1856년에는 『청년시절』을 썼다. 1853년 크림전쟁이 일어나자 전쟁에 참여했다. 당시 전쟁 경험은 훗날 그의 비폭력주의에 영향을 미쳤다. 크림전쟁에 참전한 경험을 토대로 『세바스토폴 이야기』(1855~56)를 써서 작가로서 명성을 확고히 했다.",
            image: authorImage5 // 다른 이미지로 교체 가능
        },
        토: {
            name: "천시아 작가",
            description: "영국 근대 문학을 대표하며, 영국인이 가장 사랑하는 소설가로 손꼽히는 작가다. 1775년 12월 16일 영국의 햄프셔 주 스티븐턴에서 교구 목사인 아버지 조지 오스틴과 어머니 커샌드라 사이에서 8남매 중 일곱째로 태어났다. 어린 시절 목사인 아버지로부터 폭넓은 독서 교육을 받았다. 어려서부터 습작을 하다가 열여섯 살 때부터 희곡을 쓰기 시작했고, 스물한 살 때 첫 장편 소설을 썼다. 1794년에 서간체 단편소설 『레이디 수전』을 집필하면서 본격적으로 소설을 쓰기 시작했다. 스무 살이 되던 1795년에는 『엘리너와 메리앤』이라는 첫 장편소설을 완성했는데, 1797년 이 소설은 개작되어 『이성과 감성』으로 재탄생한다. 1796년 남자 쪽 집안의 반대로 혼담이 깨지는 아픔을 겪는 와중에, 훗날 『오만과 편견』으로 개작된 소설 「첫인상」을 집필했다. 그러나 출판을 거절당하고 다시 꾸준히 작품을 개작했다. 그러다 1799년, 후에 『노생거 사원』으로 개제하여 출간된 「수전」을 탈고하고 1803년 출판 계약을 맺는다. 1805년 아버지가 돌아가시자 경제적으로 어려워져 어머니와 함께 형제, 친척, 친구 집을 전전하다가 1809년 아내를 잃은 셋째 오빠 에드워드의 권유로 햄프셔 주의 초턴이라는 곳에 정착했고, 그곳에서 생을 마감할 때까지 평생 독신으로 살았다. ",
            image: authorImage6 // 다른 이미지로 교체 가능
        },
        일: {
            name: "김영준 작가",
            description: "『이방인』, 『시지프의 신화』를 발표하며 문학가를 넘어 사상가로도 인정받기 시작했고, 실존주의자들에게 큰 영향을 주었다. 『이방인』의 주인공 뫼르소가 엄마, 무명인, 그리고 나의 ‘죽음’을 연달아 맞닥뜨리며 삶의 부조리를 고뇌하는 모습은 이후 오랫동안 수많은 독자를 실존주의의 세계로 이끈다. 「오해」와 「칼리굴라」라는 희곡을 쓰며 희곡 작가로도 활동하여 큰 성공을 거두었고, 1957년에 노벨 문학상을 수상하며 대문호의 반열에 올랐다. 이후 알제리 독립을 둘러싼 논쟁에 참여하며 활동을 이어 가지만, 카뮈는 생전 인터뷰에서 “자동차 사고로 죽는 것보다 더 부조리한 죽음은 상상할 수 없다.”라고 했는데, 아이러니하게도, 1960년 1월 4일 자동차 사고로 생을 마감했다. 이때 사고 차량에 있던 가방에서 초고 형태로 발견된 『최초의 인간』은 1994년에야 빛을 보게 된다. 실존주의 문학의 정수라 평가받는 『이방인』에는 살인 동기를 '태양이 뜨거워서'라고 대답할 수 밖에 없는 이가 등장한다. 그는 삶과 현실에서 소외된 철저한 이방인으로, 죽음이라는 한계 상황 앞에서 인간의 노력이란 것이 얼마나 부질없으며 한편으로는 그 죽음을 향해 맹렬히 나아가는 인간존재가 얼마나 위대한지 생각할 수 있게 한다.",
            image: authorImage7 // 다른 이미지로 교체 가능
        },
    };

    const handleLibraryClick = () => {
        navigate('/library');
    };

const handleBookClick = async (book) => {
    try {
        const response = await fetch(`https://backend.5l3t-mjbm.click/serial_novel/search/${encodeURIComponent(book.series_name)}`);
        if (!response.ok) throw new Error('Failed to fetch book details');
        const bookDetails = await response.json();
        navigate('/book-detail-serial', { state: { book: bookDetails } });
    } catch (error) {
        console.error('Error fetching book details:', error);
    }
};

    return (
        <div className="App">
            <Header onLibraryClick={handleLibraryClick} />

            <div className="day-tabs">
                {['월', '화', '수', '목', '금', '토', '일'].map(day => (
                    <button 
                        className={`day-tab ${day === selectedDay ? 'active' : ''}`} 
                        key={day} 
                        onClick={() => handleDayClick(day)}
                    >
                        {dayToEnglish[day]}
                    </button>
                ))}
            </div>

    <div className="book-list">
        {serialBooks.map(book => (
            <div className="book-item" key={book.series_id}>
                <img 
                    src={book.thumbnail || `https://picsum.photos/160/160?random=${book.series_id}`} 
                    alt={`Book Thumbnail ${book.series_name}`} 
                    onClick={() => handleBookClick(book)} 
                />
                <div className="book-title" onClick={() => handleBookClick(book)}>
                    {book.series_name}
                </div>
                <div className="book-author">
                    {book.series_author}
                </div>
            </div>
        ))}
    </div>


            <div className="author-info">
                <img src={authors[selectedDay].image} alt={authors[selectedDay].name} className="author-image" />
                <div className="author-interview">
                    <h2>{authors[selectedDay].name}</h2>
                    <p>{authors[selectedDay].description}</p>
                </div>
            </div>

            <div className="desired-photo-container">
                <img src={hangangImage} alt="원하는 사진" className="desired-photo" />
            </div>

        </div>
    );
};

const MainApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/library" element={<Library />} />
                <Route path="/book-detail-serial" element={<BookDetailSerial />} />
                <Route path="/book-detail-general" element={<BookDetailGeneral />} />
                <Route path="/read" element={<EPubViewerPage />} />
                <Route path="/ebook" element={<Ebook />} />
                <Route path="/search" element={<Search />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route path="/admin/update" element={<Update />}/>
                <Route path="/admin/register_gb" element={<Register_gb />}/>
                <Route path="/admin/register_sn" element={<Register_sn />}/>
                <Route path="/admin/delete_gb" element={<Delete_gb />}/>
                <Route path="/admin/delete_sn" element={<Delete_sn />}/>
                <Route path="/payment" element={<Payment />}/>
            </Routes>
        </Router>
    );
};

export default MainApp;
