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
