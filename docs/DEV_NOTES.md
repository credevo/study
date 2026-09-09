# 공통 개발 지식 노트

## 개발 환경

### JDK와 컴파일 대상 버전

빌드에 사용하는 JDK와 결과물의 Java 호환 버전은 다를 수 있다. Maven Compiler Plugin의 `source`와 `target`을 `1.7`로 설정하면 JDK 8에서 빌드해도 Java 7 바이트코드를 만들 수 있다. 다만 Java 7에서 실행할 예정이라면 Java 8 전용 API를 사용하지 않아야 하며, 최종적으로 실제 Java 7 환경에서도 검증해야 한다.

## 빌드와 배포

### Maven

Maven은 `pom.xml`에 선언한 라이브러리와 빌드 규칙을 처리한다. 직접 선언하지 않은 전이 의존성도 자동으로 내려받고, 일반적으로 사용자 Maven 저장소(`%USERPROFILE%\.m2\repository`)에 보관한다.

자주 쓰는 명령:

```powershell
mvn -v
mvn clean package
mvn compile
```

### WAR와 Tomcat

WAR는 Java 웹 애플리케이션 배포 파일이다. Tomcat의 `webapps`에 WAR를 배포하면 애플리케이션 컨텍스트 경로로 접근할 수 있다. 예를 들어 `sample.war`는 보통 `/sample/` 경로로 배포된다.

서버 시작 후에는 브라우저 또는 아래 명령으로 HTTP 응답을 확인한다.

```powershell
Invoke-WebRequest -UseBasicParsing 'http://localhost:8080/<context-path>/'
```

`HTTP 200`과 기대한 HTML 응답을 함께 확인해야 단순히 Tomcat 프로세스가 시작된 것뿐 아니라 애플리케이션 배포와 Spring MVC 요청 처리까지 검증할 수 있다.

## 라이브러리와 의존성

### Maven 방식과 수동 JAR 방식

Maven 방식의 JAR 원본은 보통 `.m2\repository`에 있고, WAR를 만들 때 `WEB-INF/lib`에 복사된다. 수동 방식은 JAR를 프로젝트의 `WEB-INF/lib`에 직접 보관한다.

수동 전환 시에는 런타임 라이브러리와 전이 의존성을 빠짐없이 포함해야 한다. 반대로 Tomcat이 제공하는 Servlet API는 중복 배포하지 않도록 주의한다.

## 호환성

Spring MVC 3.2 같은 레거시 Spring은 `javax.servlet` 기반이다. Tomcat 10 이상은 `jakarta.servlet` 기반이므로 그대로 호환되지 않는다. 레거시 프로젝트는 사용하는 Spring, JDK, Servlet API, Tomcat 버전을 하나의 조합으로 검토해야 한다.

## 정적 웹페이지

### 단일 HTML 파일 구성

작은 소개 페이지는 HTML 문서의 `<style>` 요소에 CSS를 포함하면 배포 파일 수를 줄일 수 있다. `header`, `main`, `section`, `article`, `footer` 같은 시맨틱 요소를 사용하고, `viewport` 메타 태그와 미디어 쿼리로 모바일 화면을 함께 지원한다.

## Node.js

### Windows LTS 설치

Windows 패키지 관리자를 사용할 수 있으면 다음 명령으로 Node.js LTS와 npm을 함께 설치할 수 있다.

```powershell
winget install --id OpenJS.NodeJS.LTS --exact
```

설치 후 새 터미널을 열어 PATH 변경을 반영하고 버전을 확인한다.

```powershell
node --version
npm --version
```

2026-09-10 기준 이 환경에서는 Node.js `v24.19.0`, npm `11.17.0`이 설치되었으며 실행 파일 경로는 `C:\Program Files\nodejs\`이다.
