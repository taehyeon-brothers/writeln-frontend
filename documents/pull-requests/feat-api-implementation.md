## Summary

이 PR은 swagger.json 파일을 기반으로 ky를 이용한 API 함수와 TypeScript 타입을 구현합니다. 도메인별로 API 함수와 타입을 구성하여 코드의 구조화와 재사용성을 높였습니다.

## PR 유형 및 세부 작업 내용

- [x] 새로운 기능 추가
- [x] 코드 리팩토링
- [x] 문서 수정

### 세부 내용

1. **API 분석 문서 작성**

   - swagger.json 파일을 분석하여 API 구조와 데이터 타입을 문서화
   - 도메인별 엔드포인트와 데이터 타입 정리

2. **User 도메인 API 구현**

   - User 관련 TypeScript 타입 정의 (`UserResponse`, `UpdateUserRequest` 등)
   - User 프로필 조회 및 수정 API 함수 구현
   - 타입 안전성 보장을 위한 인터페이스 설계

3. **Daily 도메인 API 구현**

   - Daily 관련 TypeScript 타입 정의 (`DailyUploadResponse`, `TagAddRequest` 등)
   - Daily 콘텐츠 업로드, 조회, 태그 추가/삭제 API 함수 구현
   - 파일 업로드를 위한 FormData 처리 로직 구현

4. **Auth 도메인 API 구현 및 리팩토링**

   - Auth 관련 TypeScript 타입 정의 (`TokenResponse`, `RefreshTokenRequest` 등)
   - 토큰 갱신 및 Google 로그인 API 함수 구현
   - 기존 route 핸들러를 리팩토링하여 새로운 API 함수 사용
   - 하드코딩된 리다이렉트 URI를 상수로 대체

5. **코드 구조 개선**
   - 도메인별 디렉토리 구조 설계 (`src/{domain}/apis/`)
   - 일관된 API 함수 및 타입 네이밍 컨벤션 적용
   - 중복 코드 제거 및 재사용성 향상

## 테스트 완료 여부

- [x] 기존 Auth 관련 route 핸들러가 새로운 API 함수를 사용하도록 리팩토링하여 기능 검증
- [ ] 추가적인 통합 테스트 필요
