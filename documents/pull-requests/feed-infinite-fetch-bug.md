## Feed Content Stories 무한 Fetching 이슈

### 문제 상황

`feed-content.stories.tsx` 실행 시 API 요청이 무한히 발생하는 현상이 발견되었습니다.

### 원인 분석

현재 코드에서 다음과 같은 이슈들이 확인됩니다:

1. MSW Handler에서 이미지 변환 과정

   - `imageUrlToBase64` 함수를 통한 이미지 변환 과정에서 실제 HTTP 요청이 발생
   - 이미지 변환 중 에러 발생 시 placeholder 이미지로 대체되는 과정에서 추가 요청 발생 가능

2. Storybook 환경에서의 React Query/SWR 동작
   - 데이터 fetching 로직이 컴포넌트 마운트/언마운트 시 재실행될 가능성
   - 캐싱 설정이 적절하지 않아 불필요한 재요청이 발생할 수 있음

### 해결 방안

1. MSW Handler 최적화

```typescript
const createHandlers = (pageSize: number, maxPages: number) => [
  http.get(
    `${process.env.NEXT_PUBLIC_API_URL}/daily/all`,
    async ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");

      // 캐시 컨트롤 헤더 추가
      const headers = new Headers({
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "application/json",
      });

      if (page > maxPages) {
        return new HttpResponse(
          JSON.stringify({
            dailies: [],
            currentPage: page,
            isEnd: true,
          }),
          { headers }
        );
      }

      const dailies = Array.from({ length: pageSize }, (_, i) => {
        const daily = generateMockDaily(page, i);
        const details = generateMockDailyDetail(daily.dailyId);

        return {
          ...daily,
          ...details,
          // Base64 변환 대신 고정 이미지 URL 사용
          imageUrl: `https://picsum.photos/seed/${daily.dailyId}/800/600`,
        };
      });

      return new HttpResponse(
        JSON.stringify({
          dailies,
          currentPage: page,
          isEnd: page === maxPages,
        }),
        { headers }
      );
    }
  ),
];
```

2. 컴포넌트 수정 사항

- React Query/SWR의 캐싱 설정 검토
- 불필요한 리렌더링 방지를 위한 메모이제이션 적용
- 데이터 fetching 조건 최적화

### 구현 계획

1. MSW Handler 수정

   - Base64 변환 로직 제거
   - 캐시 컨트롤 헤더 추가
   - 이미지 URL 직접 반환 방식으로 변경

2. Story 설정 개선

   - 각 Story variant에 대한 적절한 데이터 크기 설정
   - 불필요한 네트워크 요청 최소화

3. 테스트 계획
   - 수정된 코드에서 네트워크 요청 횟수 모니터링
   - 브라우저 개발자 도구를 통한 요청 패턴 분석
   - 메모리 사용량 모니터링

### 예상되는 효과

- 불필요한 네트워크 요청 감소
- Storybook 실행 시 성능 개선
- 개발 환경에서의 안정성 향상

### 관련 이슈

- MSW 설정 최적화
- React Query/SWR 캐싱 전략 개선
- 이미지 처리 로직 개선
