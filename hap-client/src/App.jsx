import { useState } from "react";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [situation, setSituation] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [records, setRecords] = useState([]);
  const [showRecords, setShowRecords] = useState(false);
  const [toast, setToast] = useState("");

  const primaryOptions = ["혼자", "가족과 함께", "친구와 함께", "연인과 함께", "지인과 함께"];
  const secondaryOptions = ["고요함", "활기참", "자유로움", "감사함", "신남", "설렘"];

  const emotionColors = {
    고요함: { bg: "#E6F0FA", shadow: "rgba(98, 150, 204, 0.3)" },
    활기참: { bg: "#E9F5EC", shadow: "rgba(98, 204, 136, 0.3)" },
    자유로움: { bg: "#FDF6E3", shadow: "rgba(204, 176, 98, 0.3)" },
    감사함: { bg: "#FFF2E1", shadow: "rgba(204, 160, 98, 0.3)" },
    신남: { bg: "#FFE6EC", shadow: "rgba(204, 98, 128, 0.3)" },
    설렘: { bg: "#F8E6FF", shadow: "rgba(163, 98, 204, 0.3)" },
  };

  // 공통 버튼 스타일
  const buttonStyle = (isSelected) => ({
    padding: "12px 20px",
    margin: "6px 0",
    borderRadius: "10px",
    width: "200px",
    border: isSelected ? "2px solid #5B6C8C" : "1px solid #CCC",
    backgroundColor: isSelected ? "#EDF0F4" : "#FFF",
    color: "#333",
    cursor: "pointer",
    fontSize: "15px",
    transition: "all 0.3s ease",
  });

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
        params: { primary, secondary, situation, color: selectedColor, user_id: userId || "anonymous" },
      });
      showToast("기록이 저장되었어요 💚");
      setPrimary("");
      setSecondary("");
      setSituation("");
      setColors([]);
      setSelectedColor("");
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

  // ✅ 토스트
  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(""), 2000);
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

      {/* 메인 컨테이너 */}
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
            fontSize: "30px",      // 👈 추가 (기존보다 작게)
            marginBottom: "32px",
            color: "#333",
          }}
        >
          오늘의 행복을 기록해볼까요?
        </h1>


        {/* 사용자 이름 */}
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

        {/* 3️⃣ 상황 입력 */}
        <div style={{ marginBottom: "20px" }}>
          <h3>3️⃣ 그때의 상황을 간단히 적어볼까요?</h3>
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

        {/* 색상 팔레트 */}
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

        {/* 📖 기록 보기 버튼 */}
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
      </div>
    </div>
  );
}

export default App;
