## Summary

Footer 컴포넌트에 페이지 네비게이션 기능을 추가했습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가

세부 내용:

1. Footer 컴포넌트 네비게이션 기능 추가
   - Home 버튼 클릭시 "/" 경로로 이동
   - Profile 버튼 클릭시 "/profile/edit" 경로로 이동
   - 함수명 변경: `onTabChange` 호출 부분을 `handleClick` 함수로 분리하여 라우팅 로직 추가

## 테스트 완료 여부

- [x] Footer 네비게이션 동작 확인
  - Home 버튼 클릭시 메인 페이지로 이동
  - Profile 버튼 클릭시 프로필 수정 페이지로 이동
  - Messages 버튼은 기존 동작 유지
