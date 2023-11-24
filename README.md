
## Nextjs Boilerplate

### 폴더 구조
```shell
.
├── __mocks__                       # 테스트용 모킹 파일
├── .husky                          # Husky 설정
├── .storybook                      # Storybook 설정
├── .vscode                         # VSCode 설정
├── cypress                         # Cypress 테스트 설정
├── public                          # 공용 에셋 폴더(서비스워커 포함)
├── src
│   ├── _examples                   # 예제 코드
│   └── components                  # 컴포넌트 폴더(Atom Design Pattern)
│       ├── atoms                   # 원자 컴포넌트
│       ├── molecules               # 분자 컴포넌트
│       ├── organisms               # 유기체 컴포넌트
│       └── templates               # 템플릿 컴포넌트
│   ├── hooks                       # 커스텀 훅 폴더
│   ├── pages                       # Next.js 페이지
│   ├── pages.test                  # Next.js 페이지 테스트 (Next.js 페이지로 처리되지 않도록 함)
│   └── store                       # 상태 관리 폴더
│       ├── client                  # 클라이언트 상태 관리(Zustand)
│       └── server                  # 서버 상태 관리
│           ├── common              # 공통 상태 관리
│           └── features            # 기능별 상태 관리
│               └── ...             # 기능별 상태 관리 폴더
│   ├── styles                      # 스타일 폴더
│   ├── types                       # 타입 정의 폴더
│   └── utils                       # 유틸리티 함수(프로젝트 공통 정의 포함)
├── .dockerignore                   # Docker 빌드 시 제외할 파일
├── .eslintignore                   # ESLint 무시할 파일
├── .eslintrc                       # ESLint 설정
├── .gitignore                      # Git 무시할 파일
├── .gitlab-ci.yml                  # GitLab CI 설정
├── commitlint.config.js            # Commitlint 설정
├── cypress.config.js               # Cypress 설정
├── Dockerfile                      # Docker 설정
├── jest.config.js                  # Jest 설정
├── jest.setup.ts                   # Jest 설정
├── LICENSE                         # 라이선스
├── lint-staged.config.js           # Lint-staged 설정
├── next-env.d.ts                   # Next.js 설정
├── next-sitemap.config.js          # Next.js Sitemap 설정
├── next.config.js                  # Next.js 설정
├── package.json                    # 프로젝트 설정
├── README.md                       # 리드미 파일
├── server.js                       # 로컬 Https 서버 설정
└── tsconfig.json                   # TypeScript 설정
```

### 프로젝트 초기 설정하기

프로젝트를 초기 설정하기 위해서는 다음 단계를 따라 진행해주세요.

1. **Node.js 설치**: 프로젝트를 실행하기 위해 Node.js가 설치되어 있어야 합니다. Node.js 공식 웹사이트(https://nodejs.org)에서 Node.js 설치 버전(20 권장)을 다운로드하고 설치합니다.

2. **Yarn 설치**: 프로젝트의 패키지 의존성을 관리하기 위해 Yarn을 사용합니다. 터미널에서 다음 명령어를 실행하여 Yarn을 전역으로 설치합니다:

   ```shell
   npm install -g yarn
   ```
3. **프로젝트 복제**: 프로젝트를 복제합니다. 프로젝트를 복제하기 위해 다음 명령어를 실행합니다:

   ```shell
   git clone <your-project-git-url>
   ```
4. **프로젝트 디렉토리로 이동**: 프로젝트의 `package.json` 파일이 위치한 디렉토리로 이동합니다.  

   ```shell
   cd <your-project-name>
   ```

5. **의존성 설치**: 프로젝트의 의존성을 설치하기 위해 다음 명령어를 실행합니다:

   ```shell
   yarn install
   ```

6. **프로젝트 실행**: 의존성 설치가 완료되면 다음 명령어를 사용하여 프로젝트를 실행할 수 있습니다:

   ```shell
   yarn dev
   ```

7. **앱 이름 변경**: 프로젝트 내 `nextjs-boilerplate` 를 검색하여, `nextjs-boilerplate`를 앱 이름으로 변경합니다.

프로젝트 초기 셋팅이 완료되었습니다. 이제 프로젝트를 개발하고 필요에 따라 스크립트를 사용할 수 있습니다.

---

### Branch, Commit 컨벤션 및 방법

- main 브랜치는 배포용 브랜치입니다. 배포용 브랜치에는 직접 커밋하지 않습니다.
- 브랜치 생성 시, `main` 브랜치로부터 생성합니다.
  ```shell
  git switch -c 'feature/DEAN-챌린지_메뉴_템플릿_구현'
  ```
   - 기능 개발 시, `feature/사용자명-기능명` 브랜치를 생성하여 작업합니다.
   - 버그 픽스 시, `fix/사용자명-버그명` 브랜치를 생성하여 작업합니다.
- 브랜치가 정상적으로 생성되면, `git push` 명령어를 사용하여 원격 저장소에 브랜치를 생성합니다.(현재 작업중인 브랜치 현황을 확인하기 용이합니다.)
  ```shell
  git push
  ```
- 커밋 메시지는 `commit` 명령어를 사용하여 작성합니다.
  ```shell
  yarn commit
  ```
   - 커밋 메시지는 `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`로 시작합니다.
   - `feat`: 새로운 기능 추가
   - `fix`: 버그 픽스
   - `docs`: 문서 수정
   - `style`: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
   - `refactor`: 코드 리팩토링
   - `test`: 테스트 코드, 리팩토링 테스트 코드 추가
   - `chore`: 빌드 업무 수정, 패키지 매니저 수정
- 커밋 메시지 본문에는 개행문자(`\n`)를 활용하여, 커밋의 상세 내용을 작성합니다.
   ```shell
    feat: 챌린지 메뉴 템플릿 구현
    - 챌린지 메뉴 템플릿 구현\n- 챌린지 메뉴 템플릿 스타일 구현\n- 챌린지 메뉴 템플릿 반응형 구현
    ```
- 커밋 메시지 작성이 완료되면, 원격 저장소로 `push` 하기 전, 로컬에서 단위 테스트를 진행합니다.
   ```shell
   yarn test
  ```
- 커밋 메시지 작성이 완료되면, 원격 저장소로 `push` 합니다.
   ```shell
   git push
   ```
- 브랜치 작업이 모두 완료되면, MR(Message Request)를 생성합니다.
   - MR의 제목은 `feat: 챌린지 메뉴 템플릿 구현`와 같이 작성합니다.
   - MR의 본문에는 `close #1`과 같이 이슈 번호를 작성합니다.
   - MR의 라벨은 `feature`로 설정합니다.
   - MR의 담당자는 `@`를 사용하여 지정합니다.
- MR이 완료되면, `main` 브랜치로 머지합니다.

---

### 각 script 사용 방법

- `dev`
   - 개발 서버를 시작합니다. 일반적으로 사용되는 포트가 없을 경우 3000번 포트를 사용합니다. 
- `https`
   - 로컬에서 HTTPS 프로토콜 환경에서 테스트가 필요할 경우, `dev` 명령어 대신 `https` 명령어를 실행합니다. https://localhost:3001 주소로 접속할 수 있습니다.
- `commit`
   - commitizen을 사용하여, 대화형으로 커밋 메시지를 작성합니다. 반드시 이 명령어를 통해서 커밋을 진행해야 합니다.
- `build-stats`
   - bundle analyzer를 통해, 빌드된 파일의 크기를 확인할 수 있습니다. 패키징 최적화를 위해 사용합니다.
- `lint`
   - 코드 스타일과 코드 품질을 점검합니다. 
- `format`
   - 코드 스타일을 자동으로 수정합니다.  린트 오류를 수정하고, `prettier`를 사용하여 JSON 및 YAML 파일을 수정합니다.
- `check-types`
   - TypeScript 타입 체크를 실행합니다. 
- `test`
   - 테스트를 실행합니다. `jest` 명령어를 실행합니다. 실제 CI/CD에서 사용되는 명령어입니다.
- `e2e`
   - 개발 서버를 시작하고 Cypress 테스트를 실행합니다. e2e(End-to-End) 테스트를 진행할 때 사용합니다.
- `storybook`
   - 스토리북을 개발 모드로 실행합니다. `storybook dev -p 6006` 명령어를 실행합니다. 각 컴포넌트의 디자인과 상태를 테스트할 때 사용합니다.

---

### 각 패키지 소개

#### 운영 종속성 (dependencies)
- `emotion`: CSS-in-JS 라이브러리입니다. Mui애서 사용되는 라이브러리입니다.
- `mui/icons-material`: Mui에서 사용되는 아이콘 라이브러리입니다.
- `mui/material`: Mui 라이브러리입니다. 프로젝트의 전반적인 디자인을 구성합니다.
- `bundle-analyzer`: Next.js 앱의 번들 분석을 위한 도구입니다.
- `testing-library`: 테스트를 위한 라이브러리입니다.
- `axios`: HTTP 클라이언트 라이브러리입니다. 서버와의 통신을 위해 사용됩니다.
- `react-query`: 서버 상태를 관리하기 위한 라이브러리입니다.
- `zustand`: 클라이언트 상태를 관리하기 위한 라이브러리입니다.
- `clsx`: CSS 클래스를 조건부로 결합하는 유틸리티입니다.
- `dayjs`: 날짜 및 시간을 다루기 위한 라이브러리입니다.
- `jest`: 테스트 프레임워크입니다.
- `next`: React 기반의 서버사이드 렌더링 프레임워크인 Next.js입니다. 이번 프로젝트의 핵심 라이브러리입니다.
- `next-pwa`: Next.js 앱을 PWA로 변환하기 위한 플러그인입니다.
- `next-seo`: Next.js 앱의 SEO를 관리하기 위한 라이브러리입니다.
- `next-sitemap`: Next.js 앱의 사이트맵을 생성하는 도구입니다. SEO를 위해 사용됩니다.
- `react`: React 라이브러리입니다.
- `react-dom`: React DOM 라이브러리입니다.

#### 개발 종속성 (devDependencies)
- `commitlint`: 개발 간 팀의 커밋 메시지를 통일하기 위한 도구입니다.
- `commitizen`: 커밋 메시지를 대화형으로 작성하기 위한 도구입니다.
- `percy`: UI 컴포넌트를 스냅샷으로 테스트하기 위한 도구입니다.
- `semantic-release`: 시맨틱 버전을 자동으로 관리하기 위한 도구입니다.
- `storybook`: UI 컴포넌트를 개발하기 위한 도구입니다.
- `cross-env`: 환경 변수를 설정하기 위한 도구입니다.
- `cypress`: e2e(End-to-End) 테스트를 위한 도구입니다.
- `eslint`: 코드 스타일을 검사하기 위한 도구입니다.
- `http-server`: 정적 파일을 서빙하기 위한 도구입니다.
- `husky`: Git Hooks(사전 정의된 Git 이벤트)를 사용하기 위한 도구입니다.
- `lint-staged`: Git에 커밋되기 전에 코드 스타일을 검사하기 위한 도구입니다.
- `prettier`: 코드 스타일을 자동으로 수정하기 위한 도구입니다.
