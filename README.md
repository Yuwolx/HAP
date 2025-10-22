# 🌿 HAP — 오늘의 행복을 기록하는 감정 다이어리

> **HAP**은 사용자가 하루 동안 느낀 행복의 순간을 간단히 기록하고,  
> 감정과 어울리는 색상 팔레트로 시각화하는 감정 기록 앱입니다.

---

## ✨ 주요 기능

- **감정 선택** : “누구와 함께 있었나요?”, “어떤 감정이었나요?”를 선택  
- **팔레트 생성** : 감정에 어울리는 색상 팔레트를 제시  
- **기록 저장** : 선택한 감정·색상·상황을 개인 데이터베이스에 저장  
- **기록 조회/수정/삭제** : 나의 감정 기록을 언제든 다시 확인  
- **UI 특징** : 파스텔톤 디자인, 세로형 플로우, 감정 기반 피드백  

---

## 🧩 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | React (Vite), Axios |
| **Backend** | FastAPI, Uvicorn |
| **Database** | SQLite (→ PostgreSQL로 확장 예정) |
| **Design** | Custom Inline Style (필름톤 파스텔 테마) |
| **Version Control** | Git + GitHub (브랜치 워크플로우 적용 예정) |

---

## 🗂️ 폴더 구조

<pre>
HAP/
├─ hap-client/         # React 프론트엔드
│  ├─ src/
│  │  └─ App.jsx       # 메인 UI 로직
│  └─ package.json
│
├─ hap-server/         # FastAPI 백엔드
│  ├─ main.py          # 서버 엔트리포인트
│  ├─ models/          # SQLAlchemy 모델 정의
│  ├─ routers/         # API 라우트
│  └─ core/            # DB 설정
│
└─ README.md
</pre>
