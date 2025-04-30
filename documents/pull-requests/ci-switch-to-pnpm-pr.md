## Summary

CI 워크플로우의 패키지 매니저를 yarn에서 pnpm으로 변경했습니다. 현재 프로젝트의 package.json에서 packageManager가 pnpm으로 설정되어 있지만, CI 워크플로우에서는 yarn을 사용하여 빌드 실패가 발생하는 문제를 해결했습니다.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정

- 세부 내용
  - lint.yml: yarn 캐시 및 명령어를 pnpm으로 변경
  - build.yml: yarn 캐시 및 명령어를 pnpm으로 변경
  - storybook.yml: yarn 캐시 및 명령어를 pnpm으로 변경

## test 완료 여부

- [x] 로컬에서 pnpm 명령어로 빌드 및 테스트 실행 확인
- [x] GitHub Actions 워크플로우 실행 확인 필요

## 리뷰 요구사항

- CI 워크플로우 변경사항 검토
- pnpm 명령어 사용이 적절한지 확인
- 캐시 설정이 올바른지 확인
