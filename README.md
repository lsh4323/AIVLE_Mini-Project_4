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

---

## 핵심 기능 가이드 (Features & Functionalities)

### 1. 스마트 도서 대시보드 (Book Dashboard)

- **실시간 도서 로드 (REQ-001, REQ-002):** 웹 애플리케이션에 접속하는 즉시 로컬 가상 데이터베이스(`json-server`)와 비동기 통신을 수행하여 등록된 모든 도서 목록을 메인 화면에 그리드 형태로 안전하게 출력
- **검색 및 다중 카테고리 필터 (REQ-004):** 자바스크립트 내장 함수인 `Array.prototype.filter()`를 활용하여, 제목 및 저자 명에 기반한 키워드 검색과 소설/인문학 등의 장르별 태그 필터링을 실시간 리렌더링으로 지원
- **클라이언트 사이드 페이지네이션 (REQ-005):** 한 번에 너무 많은 도서가 로드되어 브라우저 성능이 저하되는 현상을 방지하기 위해 1페이지당 노출 데이터 수를 **6개**로 엄격히 제한하고, `slice()` 메서드를 활용한 분할 네비게이션을 구현

### 2. 직관적인 도서 등록 및 유효성 검증 (Book Registration)

- **유효성 검사 서포트 (REQ-003, REQ-006, REQ-008):** 도서 등록 버튼을 클릭하면 컴포넌트 라우팅을 통해 입력 폼으로 전환되며, 저장 시 공백이나 누락된 필드가 없도록 프론트엔드 단에서 강력한 필수 값 검증(Validation)을 수행
- **안전한 데이터 적재 (REQ-007, DOC-001):** 유효성 검사를 통과한 데이터는 고유 ID, 생성일자(`createdAt`) 정보와 함께 구조화된 페이로드로 매핑되어 백엔드 서버에 성공적으로 안정적 기록(`POST`)을 완료
- **AI 기반 태그 자동 생성 (REQ-009):** 사용자가 도서 줄거리를 길게 작성하면, OpenAI API가 본문 맥락을 인공지능으로 분석하여 정해진 도서 분류 체계 안에서 가장 적합한 카테고리 태그를 최대 3개까지 추출하여 자동으로 태깅

### 3. 상세 정보 조회 및 편집 시스템 (View & Edit Management)

- **단일 엔티티 상세 라우팅 (REQ-010, REQ-011):** 목록에서 특정 도서를 클릭하면 해당 도서의 고유 ID 값을 쿼리 매개변수로서 상세 페이지로 진입하면서 제목·저자·줄거리·AI 책 표지 일러스트 등의 메타데이터를 출력
- **동적 인라인 편집 모드 (REQ-012, REQ-013):** '수정' 버튼 클릭 시 별도의 화면 이동 없이 입력 필드가 활성화되는 동적 컴포넌트 모드 전환 기술을 채택했고, 수정 완료 시 변경 사항과 수정 시점(`updatedAt`)을 함께 매핑하여 반영(`PATCH`)
- **오클릭 방지 삭제 인터랙션 (REQ-014):** '삭제' 버튼을 누를 경우 브라우저 팝업 경고(Confirm alert)창을 먼저 실행하여 사용자의 실수로 인한 데이터 유실을 방지하고, 승인 시 안전하게 데이터를 삭제(`DELETE`).

### 4. 핵심 AI 맞춤형 표지 생성 (AI Cover Generation)

- **화질 제어 및 API 통신 (REQ-015):** 상세 페이지 내부에서 개인 OpenAI API 키를 직접 입력하고 원하는 표지 이미지의 해상도 옵션(Low / Medium / High 콤보 박스)을 유연하게 조절하여 서버에 요청을 송신하도록 유도
- **줄거리 기반 키워드 이미지 변환 (REQ-016):** 가동된 AI 엔진은 도서 본문 시나리오의 전체적인 분위기, 주인공 정보, 핵심 사건 등의 텍스트 맥락을 완벽히 파악하여 세상에 단 하나뿐인 책 표지 그래픽을 설계
- **중복 방지 런타임 비활성화 (REQ-017):** 비동기 API 요청이 들어간 순간 버튼 텍스트가 즉시 `'생성 중...'`으로 스위칭되며 완료 전까지 모든 클릭 제어권을 잠금(`disabled`) 처리하여 다중 호출로 인한 서버 낭비 방지
- **실시간 인코딩 반영 (REQ-018):** 성공적으로 생성된 이미지 데이터는 즉각 바이너리 base64 형태로 전달되어 메인 목록 대시보드와 상세 뷰 스크린 영역 전체에 걸쳐 지연 없이 실시간 실사 화면으로 리렌더링 및 동기화

## 요구사항 정의서


---

## 디렉토리 구조
```
AIVLE_Mini-Project_4/
├── node_modules/          
├── mock.json  
└── src/
    ├── components/                  # [UI 컴포넌트] 재사용 가능한 레고 블록 단위
    │   ├── BookToListButton.jsx     # 목록으로 돌아가는 버튼 컴포넌트
    │   ├── BookDetail.jsx           # 도서 상세 내역 마크업 및 스타일
    │   ├── BookForm.jsx             # 도서 추가/수정용 순수 입력 폼 UI
    │   ├── BookItem.jsx             # 목록에서 쓰일 개별 도서 카드 UI
    │   ├── BookList.jsx             # 헤더 UI
    │   ├── Header.jsx             # 목록에서 쓰일 개별 도서 카드 UI
    │   └── Pagination.jsx           # 페이지네이션 컴포넌트
    │
    ├── screens/                     # [스크린] 독립적인 하나의 완성된 페이지 단위
    │   ├── BookAddScreen.jsx        # 도서 등록 페이지
    │   ├── BookEditScreen.jsx       # 도서 수정 기능
    │   ├── BookInfoScreen.jsx       # 도서 상세 조회 페이지
    │   └── HomeScreen.jsx           # 메인 대시보드/목록 페이지
    │
    ├── App.css                      # 전역 스타일시트
    ├── App.jsx                      # 실전용 최상위 데이터 통신 컨트롤러
    ├── AppMockTest.jsx              # [Mock]오프라인 자동 검증용 테스트 라우터
    └── main.jsx                     # 리액트 앱 진입점 및 스위치 (BrowserRouter 포함)
├── .gitignore                       # Git 추적 제외 설정 파일
├── .env                             # api key 등 환경 변수 파일
├── index.html                       # SPA 메인 HTML 뼈대 파일
├── package.json                     # 의존성 라이브러리 및 스크립트 설계도
├── package-lock.json                # 의존성 잠금 파일 (버전 고정)
└── vite.config.js                   # Vite 빌드 및 개발 서버 설정 파일
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
      "tags":["tag1", "tag2", "tag3"],
      "createdAt": "생성일자 (String / YYYY-MM-DD HH:mm)",
      "updatedAt": "수정일자 (String / YYYY-MM-DD HH:mm)"
    }
  ]
}
```
---

## 아키텍처 및 데이터 흐름 명세
1. **기본 CRUD 흐름:** React 브라우저와 `json-server` 간의 REST API 통신을 통해 `db.json` 데이터를 실시간으로 관리.
2. **AI 표지 생성 및 반영 흐름 (4-Step):**
   * **Step 1 (요청):** 도서 내용(`content`)을 기반으로 커스텀 프롬프트를 조립하여 OpenAI API에 전송 (`POST`)
   * **Step 2 (수신):** OpenAI 서버로부터 Base64 데이터(`b64_json`) 수신
   * **Step 3 (변환):** 브라우저가 직접 렌더링하고 저장할 수 있는 `Data URL` 포맷 스트링으로 즉시 인코딩
   * **Step 4 (갱신):** `PATCH /books/${id}` 요청을 통해 `db.json` 내 해당 도서의 `coverImageUrl` 필드만 타겟팅하여 부분 업데이트 후 화면 동기화

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
<p>
<img width="5288" height="4440" alt="Image" src="https://github.com/user-attachments/assets/b382c558-7888-4434-9ef3-a5ce5535a525" />
</p>

---
## UI
<p>
<img width="1108" height="893" alt="Image" src="https://github.com/user-attachments/assets/caf2645e-535a-42ea-879c-367a2c45f6e9" />
</p>
<p>
<img width="1480" height="861" alt="Image" src="https://github.com/user-attachments/assets/9fade4fe-fba3-4a73-88b5-3e9771775a49" />
</p>
<p>
<img width="873" height="917" alt="Image" src="https://github.com/user-attachments/assets/87461a47-a4fa-49f2-8b59-6526b9b33234" />
</p>
<p>
<img width="855" height="906" alt="Image" src="https://github.com/user-attachments/assets/a29e713e-dd52-4762-a26d-0350b444a1ef" />
</p>

---
## 실행화면
<p>
<img width="2560" height="1600" alt="Image" src="https://github.com/user-attachments/assets/c2ae8d46-37fa-449d-a3f0-7a7df925affd" />
</p>
<p>
<img width="2235" height="997" alt="Image" src="https://github.com/user-attachments/assets/b907d5c9-cb94-4737-b794-c331ba3261ac" />
</p>
<p>
<img width="1582" height="1022" alt="Image" src="https://github.com/user-attachments/assets/49914c0b-cf3b-44ad-b7b6-3dd19cf252d3" />
</p>
<p>
<img width="1354" height="1005" alt="Image" src="https://github.com/user-attachments/assets/a0b6adf3-639f-4166-9a79-5cd281977b0f" />
</p>