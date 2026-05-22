# AIVLE_Mini-Project_4
AI 책 표지 자동 생성 기반 도서 관리 시스템
미니프로젝트 4차 20조

> **KT AIVLE School 4차 미니프로젝트**
> React 프론트엔드와 가상 REST API 서버(`json-server`)를 연동하여 도서 데이터를 관리하고, OpenAI 이미지 생성 API를 통해 내용 기반의 AI 책 표지를 자동 생성하는 웹 애플리케이션

## Role
김나현	API(등록, 수정)	발표자료
김민정	UI/UX	
송지수	UI/UX	
윤서영	AI(이미지변환&DB)	서기
이성호	PM, 배포	조장
이수연	API(조회, 삭제)	발표자료
이영창	AI(OpenAI api 연동)	발표자

---

## System Environment
* **Client:** React (Vite 기반 SPA 개발 환경)
* **Backend & DB:** `json-server` (Port: `3000`) ➡️ 로컬 `db.json` 파일에 데이터 영구 저장
* **External AI API:** OpenAI 이미지 생성 API (`dall-e-3` 모델 규격 적용)

### 아키텍처 및 데이터 흐름 명세
1. **기본 CRUD 흐름:** React 브라우저와 `json-server` 간의 REST API 통신을 통해 `db.json` 데이터를 실시간으로 관리.
2. **AI 표지 생성 및 반영 흐름 (4-Step):**
   * **Step 1 (요청):** 도서 내용(`content`)을 기반으로 커스텀 프롬프트를 조립하여 OpenAI API에 전송 (`POST`)
   * **Step 2 (수신):** OpenAI 서버로부터 Base64 데이터(`b64_json`) 수신
   * **Step 3 (변환):** 브라우저가 직접 렌더링하고 저장할 수 있는 `Data URL` 포맷 스트링으로 즉시 인코딩
   * **Step 4 (갱신):** `PATCH /books/${id}` 요청을 통해 `db.json` 내 해당 도서의 `coverImageUrl` 필드만 타겟팅하여 부분 업데이트 후 화면 동기화

---

## 설계 문서 & Workflow
[documents](https://www.notion.so/monomyth/4-368edd169846801a940fe74bc85db78e?source=copy_link)