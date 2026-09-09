# 공통 이슈 해결 노트

## Maven 명령을 찾을 수 없음

### 증상

PowerShell에서 `mvn`을 실행했을 때 명령을 찾을 수 없었다.

### 일반 원인

- Maven이 설치되지 않았다.
- Maven은 설치됐지만 `<MAVEN_HOME>\bin`이 사용자 또는 시스템 `PATH`에 없다.
- IDE의 내장 Maven만 사용하고 있어 터미널에서는 Maven을 찾지 못한다.

### 해결 절차

1. `mvn.cmd`가 있는 Maven 설치 폴더를 확인한다.
2. `MAVEN_HOME`을 Maven 설치 폴더로 설정한다.
3. `PATH`에 `%MAVEN_HOME%\bin`을 추가한다.
4. 새 PowerShell을 열고 `mvn -v`로 확인한다.

프로젝트별 실제 해결 기록: [mvc3_2 이슈](../mvc3_2/docs/ISSUES.md)

## PowerShell에서 npm.ps1 실행 차단

### 증상

Node.js 설치 후 PowerShell에서 `npm --version`을 실행하면 스크립트 실행이 비활성화되어 `npm.ps1`을 불러올 수 없다는 보안 오류가 발생한다.

### 원인

PowerShell은 명령 탐색 시 Node.js 설치 폴더의 `npm.ps1`을 선택하지만, 현재 실행 정책이 PowerShell 스크립트 실행을 허용하지 않는다. Node.js 또는 npm 설치 실패는 아니다.

### 해결 방법

실행 정책을 변경할 필요가 없다면 PowerShell에서 다음처럼 명령 확장자를 명시한다.

```powershell
npm.cmd --version
npm.cmd install
```

명령 프롬프트(`cmd.exe`)에서는 기존처럼 `npm`을 사용할 수 있다. 실행 정책 변경은 시스템 보안 설정에 영향을 주므로 필요성과 조직 정책을 확인한 후 별도로 결정한다.
