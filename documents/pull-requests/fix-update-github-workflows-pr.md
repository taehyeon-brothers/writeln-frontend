## Summary

패키지 매니저를 yarn에서 pnpm으로 변경했으나 GitHub Actions 워크플로우가 여전히 yarn을 사용하고 있어 발생하는 빌드 오류를 수정했습니다.
모든 GitHub Actions 워크플로우(lint, build, storybook)를 pnpm과 Corepack을 사용하도록 업데이트했습니다.

## PR 유형 및 세부 작업 내용

- [x] 버그 수정
- [x] 빌드 부분 혹은 패키지 매니저 수정

### 세부 내용

- 모든 GitHub Actions 워크플로우 파일(.github/workflows/\*.yml)에서 다음 사항을 변경했습니다:
  - actions/setup-node의 cache 옵션을 'yarn'에서 'pnpm'으로 변경
  - Corepack을 활성화하는 단계 추가: `corepack enable`
  - pnpm을 package.json에 명시된 버전으로 설정하는 단계 추가: `corepack prepare pnpm@8.15.5 --activate`
  - 모든 yarn 명령어를 해당하는 pnpm 명령어로 변경 (예: yarn install → pnpm install)

## 문제 원인

이전에 프로젝트의 패키지 매니저를 yarn에서 pnpm으로 변경했으나, GitHub Actions 워크플로우 파일들은 업데이트하지 않았습니다.
이로 인해 GitHub Actions 실행 시 다음과 같은 오류가 발생했습니다:

```
This project's package.json defines "packageManager": "yarn@pnpm@8.15.5". However the current global version of Yarn is 1.22.22.

Presence of the "packageManager" field indicates that the project is meant to be used with Corepack, a tool included by default with all official Node.js distributions starting from 16.9 and 14.19.
Corepack must currently be enabled by running corepack enable in your terminal.
```

## 해결 방법

모든 GitHub Actions 워크플로우에 Corepack을 활성화하고 pnpm을 사용하도록 수정했습니다:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: 22.11.0
    cache: "pnpm"

- name: Enable Corepack
  run: corepack enable

- name: Setup pnpm
  run: corepack prepare pnpm@8.15.5 --activate

- name: Install dependencies
  run: pnpm install
```

## 테스트 완료 여부

- [x] GitHub Actions 워크플로우 설정 검토 완료
