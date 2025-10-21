🌿 HAP — Happiness Palette

“하나의 감정에도 여러 빛깔이 있다.”

HAP은 사용자의 ‘행복한 순간’을 색으로 기록하는 감정 기록 앱입니다.
감정을 선택하고, 어울리는 색을 고르고, 그 순간의 이야기를 남기세요.

같은 감정이라도 다른 색을 띠며,
각 색은 사용자의 하루를 은은하게 비춰줍니다. 🌈

🧭 프로젝트 개요
항목	내용
프로젝트명	HAP (Happiness Palette)
프로젝트 목적	사용자의 감정을 색으로 시각화하여 기록하고, 개인의 행복 패턴을 탐색
핵심 아이디어	“감정 = 색의 조합”이라는 관점으로, 정량적 데이터가 아닌 감정의 결을 기록
핵심 가치	조용한 자기인식, 비생산적 시간의 긍정적 전환, 감정의 시각화 경험
⚙️ 기술 스택
🖥️ Frontend

React (Vite)

Axios (API 통신)

Recharts (감정 통계 시각화 예정)

Vanilla CSS (프로토타입 단계)

💾 Backend

FastAPI (Python)

SQLite (로컬 데이터베이스)

SQLAlchemy (ORM)

Uvicorn (서버 실행기)

🧱 구조
hap/
 ├── hap-server/                # 백엔드 (FastAPI)
 │   ├── main.py                # FastAPI 진입점
 │   ├── models/                # 데이터 모델 정의
 │   ├── routers/               # API 라우터 (record, palette 등)
 │   ├── core/database.py       # DB 연결 설정
 │   └── hap.db                 # SQLite DB
 │
 └── hap-client/                # 프론트엔드 (React)
     ├── src/
     │   ├── App.jsx            # 메인 UI 로직
     │   └── assets/            # 정적 자원
     └── package.json

🎨 Color System

HAP Color System v1.0

감정을 단일 색으로 정의하지 않고,
공통된 20개의 색상군을 기반으로
감정별로 다섯 가지 색을 조합해 감정의 다층성을 표현합니다.


🎞️ 필름톤 + 파스텔톤을 기반으로, 감정 간 색의 중복을 허용해
감정의 연결성과 인간적인 모호함을 표현합니다.

🧩 기능 요약
기능	설명	상태
감정 선택	‘누구와’, ‘어떤 감정이었는가’ 2단계 선택	✅ 완료
팔레트 생성	감정 조합에 맞는 색상 5개 표시	✅ 완료
감정 기록	텍스트 + 색상 + 감정 정보 DB 저장	✅ 완료
기록 보기	시간순으로 감정 기록 목록 표시	✅ 완료
기록 수정	인라인 편집 및 즉시 반영	✅ 완료
기록 삭제	삭제 후 리스트 자동 갱신	✅ 완료
감정 통계	감정별 기록 비율 및 색상 분석 (Recharts 예정)	🚧 예정
🔄 실행 방법
1️⃣ 백엔드 실행
cd hap-server
uvicorn main:app --reload

2️⃣ 프론트엔드 실행
cd hap-client
npm run dev

3️⃣ 접속

👉 http://127.0.0.1:5173

📖 API 요약
Method	Endpoint	설명
POST	/record	감정 기록 저장
GET	/records	감정 기록 조회
PUT	/record/{id}	감정 기록 수정
DELETE	/record/{id}	감정 기록 삭제
POST	/palette	감정별 색상 팔레트 생성
🌿 철학적 가치

우리는 생산성의 언어에서 벗어나,
비생산적인 순간을 기록하고,
그 속의 ‘감정의 결’을 시각화한다.

HAP은 “기억의 색깔”을 통해
사용자가 자신을 이해하도록 돕는 조용한 감정 기록 도구입니다.

🧠 향후 개발 로드맵
분류	내용
💾 DB 전환	SQLite → PostgreSQL (확장성 확보)
📱 모바일화	React Native or Flutter 클라이언트 구현
📊 감정 리포트	색상/시간 기반 감정 트렌드 시각화
🔔 리마인드 기능	“오늘의 행복” 알림 및 회고 UX
🌈 색상 발전	AI 기반 개인 감정-색상 학습 기능
🧑‍💻 팀 메모 (협업 시 참고)

Frontend → Backend 데이터 흐름은 Axios를 통해 연결

DB의 EmotionRecord 모델이 모든 사용자 감정 데이터를 관리

감정-색상 매핑은 palette_router.py에서 변경 가능

확장 시 FastAPI → Spring Migration 계획 고려 중

📜 License

MIT License
Copyright © 2025 HAP