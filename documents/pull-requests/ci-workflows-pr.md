## Summary

코드 품질 관리를 위한 CI 워크플로우를 추가했습니다. 이제 main 브랜치로 PR을 올리면 자동으로 lint, build, storybook 테스트가 실행됩니다. 이를 통해 코드 품질을 유지하고 버그를 조기에 발견할 수 있습니다.

연관된 이슈: N/A

## PR 유형 및 세부 작업 내용

- [x] 빌드 부분 혹은 패키지 매니저 수정

세부 내용:

1. GitHub Actions 워크플로우 디렉토리 구조 생성 (.github/workflows)
2. Lint 워크플로우 추가 - PR이 main 브랜치로 생성될 때 ESLint 검사 실행
3. Build 워크플로우 추가 - PR이 main 브랜치로 생성될 때 Next.js 빌드 실행
4. Storybook 테스트 워크플로우 추가 - PR이 main 브랜치로 생성될 때 Storybook 테스트 실행
5. Storybook CI 테스트를 위한 필요한 의존성 추가 (concurrently, http-server, wait-on, @storybook/test-runner)
6. package.json에 Storybook 테스트 스크립트 추가
7. .gitignore에 storybook-static 디렉토리 추가

## 테스트 완료 여부

- [x] Lint 워크플로우 로컬 테스트 완료
- [x] Build 워크플로우 로컬 테스트 완료
- [x] Storybook 테스트 워크플로우 로컬 테스트 완료

## 리뷰 요구사항

- GitHub Actions 워크플로우 구성이 적절한지 확인해주세요
- Node.js 버전(22.11.0)이 프로젝트에 적합한지 확인해주세요
- Storybook 테스트 스크립트가 올바르게 구성되었는지 확인해주세요
