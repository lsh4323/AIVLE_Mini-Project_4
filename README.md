# AIVLE_Mini-Project_4
AI 책 표지 자동 생성 기반 도서 관리 시스템
미니프로젝트 4차 20조

> **KT AIVLE School 4차 미니프로젝트**
> React 프론트엔드와 가상 REST API 서버(`json-server`)를 연동하여 도서 데이터를 관리하고, OpenAI 이미지 생성 API를 통해 내용 기반의 AI 책 표지를 자동 생성하는 웹 애플리케이션

## Role
| 이름 | 주 역할 (Role) | 담당 기능 및 파트 (Details) | 비고 |
| :---: | :---: | :--- | :---: |
| **이성호** | 👑 조장 / PM | 프로젝트 총괄 관리, 서비스 배포 환경 구축 | |
| **김나현** | 💻 Back-end (API) | 도서 등록 및 수정 기능 개발 (`POST`, `PATCH`) | 발표 자료 작성 |
| **이수연** | 💻 Back-end (API) | 도서 목록/상세 조회 및 삭제 기능 개발 (`GET`, `DELETE`) | 발표 자료 작성 |
| **이영창** | 🤖 AI Engineer | OpenAI API 프롬프트 엔지니어링 및 외부 연동 파이프라인 구축 | 발표 진행 |
| **윤서영** | 🤖 AI Engineer | AI 생성 이미지 데이터 인코딩 변환 및 DB 구조 매핑 | 서기 |
| **김민정** | 🎨 UI/UX Designer | 프론트엔드 와이어프레임 설계 및 컴포넌트 스타일링 구현 | |
| **송지수** | 🎨 UI/UX Designer | 프론트엔드 와이어프레임 설계 및 컴포넌트 스타일링 구현 | |

---

## System Environment
* **Client:** React (Vite 기반 SPA 개발 환경)
* **Backend & DB:** `json-server` (Port: `3000`) ➡️ 로컬 `db.json` 파일에 데이터 영구 저장
* **External AI API:** OpenAI 이미지 생성 API (`gpt-image-2` 모델 규격 적용)

### 아키텍처 및 데이터 흐름 명세
1. **기본 CRUD 흐름:** React 브라우저와 `json-server` 간의 REST API 통신을 통해 `db.json` 데이터를 실시간으로 관리.
2. **AI 표지 생성 및 반영 흐름 (4-Step):**
   * **Step 1 (요청):** 도서 내용(`content`)을 기반으로 커스텀 프롬프트를 조립하여 OpenAI API에 전송 (`POST`)
   * **Step 2 (수신):** OpenAI 서버로부터 Base64 데이터(`b64_json`) 수신
   * **Step 3 (변환):** 브라우저가 직접 렌더링하고 저장할 수 있는 `Data URL` 포맷 스트링으로 즉시 인코딩
   * **Step 4 (갱신):** `PATCH /books/${id}` 요청을 통해 `db.json` 내 해당 도서의 `coverImageUrl` 필드만 타겟팅하여 부분 업데이트 후 화면 동기화

---

## 요구사항 정의서


---

## 디렉토리 구조
```
AIVLE_Mini-Project_4/
├── node_modules/
├── db.json
└── src/
    ├── components/
    │   ├── BookDetail.jsx       # 도서 상세 내역 마크업 및 스타일
    │   ├── BookForm.jsx         # 도서 추가/수정용 순수 입력 폼 UI
    │   ├── BookItem.jsx         # 목록에서 쓰일 개별 도서 카드 UI
    │   └── BookList.jsx         # BookItem들을 모아서 정렬하는 리스트 UI
    ├── screens/
    │   ├── BookAddScreen.jsx    # 도서 등록 페이지
    │   ├── BookInfoScreen.jsx   # 도서 상세 조회 페이지
    │   └── HomeScreen.jsx       # 메인 대시보드 / 목록 페이지
    ├── App.css
    ├── App.jsx                  # 최상위 데이터 통신 컨트롤러
    ├── AppMockTest.jsx          # 오프라인 자동 검증용 테스트 라우터
    └── main.jsx                 # 리액트 앱 진입점 (BrowserRouter 포함)
├── .gitignore
├── index.html
├── json-server.json
├── package.json
├── package-lock.json
└── vite.config.js
```

## DB 구조
```
{
  "books": [
    {
      "id": "시스템 자동 생성 ID (String 또는 Number)",
      "title": "도서 제목 (String)",
      "author": "저자명 (String)",
      "content": "도서 본문 내용 (String)",
      "coverImageUrl": "AI로 생성된 이미지의 Data URL (String)",
      "createdAt": "생성일자 (String / YYYY-MM-DD HH:mm)",
      "updatedAt": "수정일자 (String / YYYY-MM-DD HH:mm)"
    }
  ]
}
```


## API 명세서
| 기능 | 메서드 | 경로 | 담당자 |
| :--- | :---: | :--- | :--- |
| 책 목록 조회 | GET | `/books` | 이수연 |
| 책 상세 조회 | GET | `/books/:id` | 이수연 |
| 책 추가 | POST | `/books` | 김나현 |
| 책 수정 | PATCH | `/books/:id` | 김나현 |
| 책 삭제 | DELETE | `/books/:id` | 이수연 |

###  HTTP status code
| 코드 | 설명 |
| :---: | :--- |
| **200** | 정상 / 성공 |
| **400** | 잘못된 요청 |
| **404** | 데이터 없음 |
| **429** | Rate Limit |
| **500** | 서버 오류 |

---
## Flow chart


---
## UI


---
## 실행화면