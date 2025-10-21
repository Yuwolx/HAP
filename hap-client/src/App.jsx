import { useState } from "react";
import axios from "axios";



function App() {
  const [userId, setUserId] = useState("");
  // 🔹 상태 정의
  const [primary, setPrimary] = useState("");
  const [secondary, setSecondary] = useState("");
  const [situation, setSituation] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  // 🔹 선택지 리스트 (행복 중심)
  const primaryOptions = [
    "혼자",
    "가족과 함께",
    "친구와 함께",
    "연인과 함께",
    "지인과 함께",
  ];

  const secondaryOptions = [
    "고요함",
    "활기참",
    "자유로움",
    "감사함",
    "신남",
    "설렘",
  ];

  // 🔹 버튼 스타일 공통 함수
  const buttonStyle = (isSelected) => ({
    margin: "6px",
    padding: "10px 20px",
    borderRadius: "12px",
    border: isSelected ? "3px solid #3F51B5" : "1px solid #ccc",
    backgroundColor: isSelected ? "#E8EAF6" : "#fff",
    color: isSelected ? "#3F51B5" : "#000",
    cursor: "pointer",
    transition: "all 0.2s ease",
  });

  // 🔹 팔레트 요청
  const handlePalette = async () => {
    if (!primary || !secondary)
      return alert("감정을 모두 선택해주세요!");

    try {
      const res = await axios.post("http://127.0.0.1:8000/palette", {
        primary,
        secondary,
      });
      setColors(res.data.colors);
      setSelectedColor(""); // 새 팔레트 불러올 때 선택 초기화
      setMessage("팔레트가 생성되었어요 🎨");
    } catch (err) {
      console.error(err);
      setMessage("서버와 연결할 수 없어요 😢");
    }
  };

  // 🔹 기록 저장
  const handleSave = async () => {
    if (!selectedColor)
      return alert("색상을 하나 선택해주세요!");

    try {
      await axios.post("http://127.0.0.1:8000/record", null, {
        params: { primary, secondary, situation, color: selectedColor, user_id: userId || "anonymous" },
      });
      setMessage("기록이 저장되었어요 💾");
    } catch (err) {
      console.error(err);
      setMessage("저장 중 문제가 발생했어요 😢");
    }
  };

  // 🔹 기록 조회
  const handleFetchRecords = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/records");
      setRecords(res.data);
      setMessage("기록을 불러왔어요 📚");
    } catch (err) {
      console.error(err);
      setMessage("기록을 불러올 수 없어요 😢");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>오늘의 행복을 기록해볼까요?</h1>

      <div>
        <h3>👤 사용자 이름</h3>
        <input
          type="text"
          placeholder="예: minji, hong"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            width: "40%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />
      </div>

      {/* 1️⃣ 누구와 함께 */}
      <div>
        <h3>1️⃣ 누구와 함께 있었나요?</h3>
        {primaryOptions.map((option) => (
          <button
            key={option}
            style={buttonStyle(primary === option)}
            onClick={() => setPrimary(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* 2️⃣ 어떤 감정이었나요 */}
      <div>
        <h3>2️⃣ 어떤 감정이었나요?</h3>
        {secondaryOptions.map((option) => (
          <button
            key={option}
            style={buttonStyle(secondary === option)}
            onClick={() => setSecondary(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* 3️⃣ 상황 입력 */}
      <div>
        <h3>3️⃣ 그때의 상황을 간단히 적어볼까요?</h3>
        <input
          type="text"
          placeholder="예: 가족들과 저녁을 함께 먹으며 웃었어요"
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          style={{
            width: "60%",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            marginTop: "5px",
          }}
        />
      </div>

      {/* 4️⃣ 팔레트 보기 버튼 */}
      <div>
        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#3F51B5",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handlePalette}
        >
          팔레트 보기 🎨
        </button>
      </div>

      <p style={{ marginTop: "10px", color: "#333" }}>{message}</p>

      {/* 🎨 팔레트 표시 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexWrap: "wrap",
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
              borderRadius: "12px",
              margin: "8px",
              border:
                selectedColor === color
                  ? "4px solid #3F51B5"
                  : "2px solid transparent",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          ></div>
        ))}
      </div>

      {/* 💾 저장 버튼 */}
      {colors.length > 0 && (
        <button
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          이 행복을 기록할래요 💚
        </button>
      )}

      {/* 📖 기록 보기 */}
      <div>
        <button
          style={{
            marginTop: "40px",
            padding: "12px 24px",
            borderRadius: "8px",
            backgroundColor: "#009688",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleFetchRecords}
        >
          내 기록 보기 📖
        </button>
      </div>

      {/* 기록 리스트 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {records.map((rec) => (
          <div
            key={rec.id}
            style={{
              width: "60%",
              backgroundColor: "#fafafa",
              borderRadius: "12px",
              padding: "16px",
              margin: "8px 0",
              textAlign: "left",
              boxShadow: "0 0 6px rgba(0,0,0,0.1)",
              borderLeft: `8px solid ${rec.color || "#ccc"}`,
            }}
          >
            <p>
              <strong>👥 {rec.primary}</strong> | 😊 {rec.secondary}
            </p>
            <p>🗒️ {rec.situation}</p>
            <small style={{ color: "#555" }}>
              {new Date(rec.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
