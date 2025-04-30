## Summary

매칭 기능을 위한 기본 구조를 구현했습니다. 매칭 버튼을 통해 서버에 매칭 요청을 보내고, 결과를 받아올 수 있는 기능을 추가했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

  - 매칭 API 타입 및 함수 추가
  - 매칭 버튼 컴포넌트 추가
  - 매칭 페이지 및 라우트 추가
  - 서버 액션 추가
  - 하단 네비게이션 수정

- [x] 코드 리팩토링
  - 기존 메시지 버튼을 매칭 버튼으로 변경
  - 서버 액션을 통한 API 호출 구조 개선

## 세부 작업 내용

1. API 구조 추가

   - `src/matches/api/types.ts`: 매칭 응답 타입 정의
   - `src/matches/api/index.ts`: 매칭 API 함수 구현

2. 컴포넌트 추가

   - `src/matches/components/matching-button.tsx`: 매칭 버튼 컴포넌트 구현
   - `src/matches/pages/request-match-page.tsx`: 매칭 요청 페이지 구현
   - `app/matches/page.tsx`: 매칭 라우트 구현

3. 서버 액션 추가

   - `src/matches/actions/index.ts`: 매칭 요청 서버 액션 구현

4. 하단 네비게이션 수정
   - `src/base/components/footer.tsx`: 메시지 버튼을 매칭 버튼으로 변경
   - `src/base/components/footer-container.tsx`: 탭 타입 업데이트
