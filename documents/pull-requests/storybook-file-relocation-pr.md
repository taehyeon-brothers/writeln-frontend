## Summary

스토리북 파일 구조 개선: 스토리 파일을 컴포넌트 파일과 같은 디렉토리에 배치

## PR 유형 및 세부 작업 내용

- [x] 코드 리팩토링
- [x] 파일 혹은 폴더명 수정
- [x] 파일 혹은 폴더 삭제

### 세부 내용

1. `.storybook/main.ts` 파일 수정

   - 스토리 파일 경로 패턴 변경
   - 기존: `"../stories/**/*.mdx"`, `"../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"`
   - 변경: `"../components/**/*.mdx"`, `"../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"`, `"../pages/**/*.mdx"`, `"../pages/**/*.stories.@(js|jsx|mjs|ts|tsx)"`

2. 기존 스토리 파일 이동

   - `stories/sign-in-page.stories.tsx` → `pages/auth/pages/sign-in-page.stories.tsx`
   - `stories/feed.stories.tsx` → `pages/feed/components/feed-content.stories.tsx`
   - 각 스토리 파일의 import 경로 수정 (상대 경로로 변경)

3. 빈 stories 디렉토리 제거

4. 변경 후 정상 작동 확인
   - Storybook 실행하여 모든 스토리가 제대로 로드되는지 확인

## 기대 효과

- **Collocation**: 관련 파일들이 함께 위치하여 코드 탐색 및 관리 용이성 향상
- **개발 효율성**: 컴포넌트와 스토리를 함께 작업할 때 파일 전환 최소화
- **유지보수성**: 컴포넌트 변경 시 관련 스토리 파일도 함께 확인하고 수정 가능
- **확장성**: 새로운 컴포넌트 추가 시 같은 디렉토리에 스토리 파일 생성 가능
