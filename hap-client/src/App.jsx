import { useState } from "react";
import axios from "axios";

function App() {
  // ✅ 상태 관리
  const [location, setLocation] = useState("");
  const [customLocation, setCustomLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [situation, setSituation] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);
  const [toast, setToast] = useState("");

  // ✅ 선택지
  const primaryOptions = ["혼자", "가족과 함께", "친구와 함께", "연인과 함께", "지인과 함께"];
  const secondaryOptions = ["고요함", "활기참", "자유로움", "감사함", "신남", "설렘"];
  const locationOptions = [
    "집",
    "공원",
    "카페",
    "학교",
    "직장",
    "바다",
    "산",
    "도서관",
    "식당",
    "산책길",
    "직접 입력하기",
  ];

  // ✅ 공통 버튼 스타일
  const buttonStyle = (isSelected) => ({
    margin: "6px",
    padding: "10px 20px",
    borderRadius: "12px",
    border: isSelected ? "2px solid #5B6C8C" : "1px solid #C8C8C8",
    backgroundColor: isSelected ? "#EDF0F4" : "#FFFFFF",
    color: isSelected ? "#334155" : "#3A3A3A",
    cursor: "pointer",
    fontFamily: "'Noto Sans KR', sans-serif",
    transition: "all 0.25s ease",
    boxShadow: isSelected
      ? "0 2px 8px rgba(91,108,140,0.2)"
      : "0 1px 4px rgba(0,0,0,0.05)",
  });

  const locationButtonStyle = buttonStyle;

  // ✅ 토스트 함수
  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(""), 2000);
  };

  // 🎨 팔레트 요청
  const handlePalette = async () => {
    if (!primary || !secondary) return alert("감정을 모두 선택해주세요!");
    try {
      const res = await axios.post("http://127.0.0.1:8000/palette", { primary, secondary });
      setColors(res.data.colors);
      setSelectedColor("");
      showToast("팔레트가 생성되었어요 🎨");
    } catch {
      showToast("서버와 연결할 수 없어요 😢");
    }
  };

  // 💾 기록 저장
  const handleSave = async () => {
    if (!selectedColor) return alert("색상을 선택해주세요!");
    try {
      await axios.post("http://127.0.0.1:8000/record", null, {
        params: {
          primary,
          secondary,
          situation,
          color: selectedColor,
          location,
          user_id: userId || "anonymous",
        },
      });
      showToast("기록이 저장되었어요 💚");

      // 입력 초기화
      setPrimary("");
      setSecondary("");
      setSituation("");
      setLocation("");
      setSelectedLocation("");
      setCustomLocation("");
      setSelectedColor("");
      setColors([]);
    } catch {
      showToast("저장 중 문제가 발생했어요 😢");
    }
  };

  // 📖 기록 보기
  const handleFetchRecords = async () => {
    if (showRecords) {
      setShowRecords(false);
      return;
    }
    try {
      const res = await axios.get("http://127.0.0.1:8000/records");
      setRecords(res.data);
      setShowRecords(true);
      showToast("기록을 불러왔어요 📚");
    } catch {
      showToast("기록을 불러올 수 없어요 😢");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        background: "linear-gradient(to bottom right, #FAF9F6, #F4F1EE)",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* 💬 토스트 알림 */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#4B5563",
            color: "white",
            padding: "10px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            fontSize: "15px",
            opacity: toast ? 1 : 0,
            transition: "opacity 0.5s ease",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}

      {/* 메인 카드 */}
      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          maxWidth: "700px",
          borderRadius: "18px",
          padding: "40px 60px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontWeight: 600,
            fontSize: "30px",
            marginBottom: "32px",
            color: "#333",
          }}
        >
          오늘의 행복을 기록해볼까요?
        </h1>

        {/* 👤 사용자 이름 */}
        <div style={{ marginBottom: "30px" }}>
          <h3>👤 사용자 이름</h3>
          <input
            type="text"
            placeholder="예: minji, hong"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={{
              width: "60%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #D0D0D0",
              textAlign: "center",
            }}
          />
        </div>

        {/* 1️⃣ 누구와 함께 */}
        <div style={{ marginBottom: "30px" }}>
          <h3>1️⃣ 누구와 함께 있었나요?</h3>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
            {primaryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setPrimary(opt)}
                style={buttonStyle(primary === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 2️⃣ 어떤 감정이었나요 */}
        <div style={{ marginBottom: "30px" }}>
          <h3>2️⃣ 어떤 감정이었나요?</h3>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
            {secondaryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSecondary(opt)}
                style={buttonStyle(secondary === opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 3️⃣ 어디에서 있었나요 */}
        <div style={{ marginBottom: "30px" }}>
          <h3>3️⃣ 어디에서 있었나요?</h3>
          {locationOptions.map((option) => (
            <button
              key={option}
              style={locationButtonStyle(selectedLocation === option)}
              onClick={() => {
                setSelectedLocation(option);
                if (option === "직접 입력하기") {
                  setCustomLocation("");
                  setLocation("");
                } else {
                  setLocation(option);
                }
              }}
            >
              {option}
            </button>
          ))}

          {/* 직접 입력 */}
          {selectedLocation === "직접 입력하기" && (
            <div style={{ marginTop: "15px" }}>
              <input
                type="text"
                placeholder="직접 입력해주세요 (예: 전시회, 강변 등)"
                value={customLocation}
                onChange={(e) => {
                  setCustomLocation(e.target.value);
                  setLocation(e.target.value);
                }}
                style={{
                  width: "60%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #D0D0D0",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              />
            </div>
          )}
        </div>

        {/* 4️⃣ 상황 입력 */}
        <div style={{ marginBottom: "20px" }}>
          <h3>4️⃣ 그때의 상황을 간단히 적어볼까요?</h3>
          <input
            type="text"
            placeholder="예: 저녁 바람을 맞으며 산책했어요 🌿"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            style={{
              width: "80%",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #D0D0D0",
            }}
          />
        </div>

        {/* 🎨 팔레트 보기 */}
        <button
          onClick={handlePalette}
          style={{
            backgroundColor: "#5B6C8C",
            color: "white",
            padding: "12px 28px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          팔레트 보기 🎨
        </button>

        {/* 🎨 색상 팔레트 */}
        {colors.length > 0 && (
          <>
            <p style={{ marginBottom: "10px", color: "#4B5563" }}>
              그때의 무드와 어울리는 색상을 선택해보세요 🎨
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    backgroundColor: color,
                    width: "80px",
                    height: "80px",
                    borderRadius: "14px",
                    border: selectedColor === color ? "3px solid #5B6C8C" : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                ></div>
              ))}
            </div>
          </>
        )}

        {/* 💾 저장 버튼 */}
        {selectedColor && (
          <button
            onClick={handleSave}
            style={{
              marginTop: "20px",
              padding: "12px 28px",
              borderRadius: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            이 행복을 기록할래요 💚
          </button>
        )}

        {/* 📖 기록 보기 */}
        <div style={{ marginTop: "40px" }}>
          <button
            onClick={handleFetchRecords}
            style={{
              backgroundColor: "#809BCE",
              color: "white",
              padding: "12px 28px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {showRecords ? "기록 닫기 🔒" : "내 기록 보기 📖"}
          </button>
        </div>
        {/* 🗂️ 기록 리스트 */}
          {showRecords && records.length > 0 && (
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {records.map((rec) => (
                <div
                  key={rec.id}
                  style={{
                    width: "80%",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "18px",
                    margin: "8px 0",
                    textAlign: "left",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderLeft: `8px solid ${rec.color || "#CCC"}`,
                  }}
                >
                  <p style={{ fontWeight: "bold", marginBottom: "6px" }}>
                    👥 {rec.primary} | 😊 {rec.secondary}
                  </p>
                  <p>📍 {rec.location || "장소 미기록"}</p>  {/* ✅ 장소 표시 추가 */}
                  <p>🗒️ {rec.situation}</p>
                  <small style={{ color: "#666" }}>
                    {new Date(rec.created_at).toLocaleString("ko-KR", {
                      timeZone: "Asia/Seoul",
                    })}
                  </small>
                </div>
              ))}
            </div>
          )}

      </div>
    </div>
  );
}

export default App;
