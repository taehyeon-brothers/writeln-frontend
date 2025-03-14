# 스토리북 파일 위치 옮기기

## 현재 상황 (AS-IS)

- 스토리 파일들이 전용 스토리 디렉토리인 `/stories`에 모여 있음
- 현재 `.storybook/main.ts` 설정에서 스토리 파일 경로가 `"../stories/**/*.mdx"`, `"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"`로 지정되어 있음
- 스토리 파일과 관련 컴포넌트 파일이 서로 다른 디렉토리에 분리되어 있어 관리가 어려움

## 개선 방향 (TO-BE)

- 스토리 파일을 해당 컴포넌트 파일과 같은 디렉토리에 위치시켜 관리 용이성 향상
- `.storybook/main.ts` 설정을 변경하여 컴포넌트 디렉토리에서 스토리 파일을 찾을 수 있도록 함
  - 새로운 경로 패턴: `"../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"`, `"../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"`
- 현재 존재하는 스토리 파일들을 해당 컴포넌트가 있는 디렉토리로 이동

## 작업 내용

1. `.storybook/main.ts` 파일 수정
   - 스토리 파일 경로 패턴 변경
2. 기존 스토리 파일 이동
   - `stories/sign-in-page.stories.tsx` → `app/sign-in/sign-in-page.stories.tsx`
   - `stories/feed.stories.tsx` → `app/feed/feed.stories.tsx`
3. 이동 후 정상 작동 확인
   - Storybook 실행하여 모든 스토리가 제대로 로드되는지 확인

## 기대 효과

- **Collocation**: 관련 파일들이 함께 위치하여 코드 탐색 및 관리 용이성 향상
- **개발 효율성**: 컴포넌트와 스토리를 함께 작업할 때 파일 전환 최소화
- **유지보수성**: 컴포넌트 변경 시 관련 스토리 파일도 함께 확인하고 수정 가능
- **확장성**: 새로운 컴포넌트 추가 시 같은 디렉토리에 스토리 파일 생성 가능

## 참고 사항

- 이 변경은 코드 기능에 영향을 주지 않으며, 개발 환경과 파일 구조만 개선함
- Storybook 모범 사례에 따라 컴포넌트와 스토리 파일을 함께 배치하는 방향으로 개선
