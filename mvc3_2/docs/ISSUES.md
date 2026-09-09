# mvc3_2 이슈 해결 기록

## 2026-09-09 — Maven 명령을 찾을 수 없음

### 증상

초기 PowerShell 환경에서 `Get-Command mvn`의 결과가 없었고 Maven 빌드를 실행할 수 없었다.

### 원인

Maven이 설치되지 않았거나 사용자 `PATH`에 Maven 실행 파일 경로가 등록되지 않은 상태였다.

### 해결

- Apache Maven `3.6.3`을 `D:\00000_DEV\study\tools\apache-maven-3.6.3`에 설치
- 사용자 `MAVEN_HOME`을 설치 경로로 설정
- 사용자 `PATH`에 `D:\00000_DEV\study\tools\apache-maven-3.6.3\bin` 등록

### 검증

`mvn -v`에서 Maven 3.6.3과 JDK 8 정보를 확인했고, 프로젝트에서 `mvn clean package`를 실행해 `BUILD SUCCESS`와 `target\mvc3_2.war` 생성을 확인했다.

공통 해결 방법: [study 공통 이슈 노트](../../docs/ISSUES.md)
