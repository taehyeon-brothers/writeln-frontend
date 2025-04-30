## Summary

CI 워크플로우의 패키지 매니저를 yarn에서 pnpm으로 변경했습니다. 현재 프로젝트의 package.json에서 packageManager가 pnpm으로 설정되어 있지만, CI 워크플로우에서는 yarn을 사용하여 빌드 실패가 발생하는 문제를 해결했습니다.

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정

- 세부 내용
  - lint.yml: yarn 캐시 및 명령어를 pnpm으로 변경
  - build.yml: yarn 캐시 및 명령어를 pnpm으로 변경
  - storybook.yml: yarn 캐시 및 명령어를 pnpm으로 변경
  - pnpm/action-setup@v4를 사용하여 pnpm 설치
  - actions/setup-node@v4의 pnpm 캐싱 기능 활용
  - pnpm 6.10.0 이상 버전에서 지원되는 캐싱 기능 사용

## test 완료 여부

- [x] 로컬에서 pnpm 명령어로 빌드 및 테스트 실행 확인
- [x] GitHub Actions 워크플로우 실행 확인 필요

## 리뷰 요구사항

- CI 워크플로우 변경사항 검토
- pnpm 명령어 사용이 적절한지 확인
- 캐시 설정이 올바른지 확인
- pnpm-lock.yaml 파일이 커밋되어 있는지 확인 (pnpm 캐싱을 위해 필수)

## 참고사항

- pnpm 6.10.0 이상 버전에서 캐싱이 지원됩니다.
- CI 환경에서는 `--frozen-lockfile` 옵션이 자동으로 추가됩니다.
- pnpm-lock.yaml 파일이 변경된 경우 `--frozen-lockfile` 옵션을 명시적으로 전달해야 합니다.

## 참고 문서

- [GitHub Actions setup-node Advanced Usage - Caching packages data](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#caching-packages-data)
