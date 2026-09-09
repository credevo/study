# 학습 질문 이력

## 2026-09-09 — Spring MVC 3.2, Java 7, Maven

| 질문 | 핵심 답변 |
| --- | --- |
| Spring MVC 3.2를 로컬에서 실행할 수 있는가? | 가능하다. 레거시 조합으로 Java 7/8, Spring MVC 3.2, Tomcat 7~9를 맞춰 사용한다. |
| Maven 없이도 가능한가? | 가능하다. 필요한 JAR를 `WEB-INF/lib`에 직접 넣고 Tomcat에 배포한다. 다만 전이 의존성과 버전을 수동으로 관리해야 한다. |
| Java 7로 가능한가? | 가능하다. Spring 3.2는 Java 7을 지원한다. |
| Maven과 수동 JAR 방식을 함께 쓸 수 있는가? | 프로젝트 단위로 함께 운용할 수 있지만, 한 프로젝트에서 섞으면 중복 JAR와 버전 충돌 위험이 있어 권장하지 않는다. |
| Maven 프로젝트를 수동 프로젝트로 바꿀 수 있는가? | 가능하다. Maven으로 생성한 WAR의 런타임 라이브러리를 기준으로 수동 `WEB-INF/lib`를 구성한다. Servlet API처럼 WAS가 제공하는 라이브러리는 제외한다. |
| Maven은 어떻게 설치하는가? | Maven ZIP을 풀고 `bin` 경로를 사용자 `PATH`에 등록한 뒤 새 터미널에서 `mvn -v`로 확인한다. |
| 로컬 서버는 어떻게 확인하는가? | WAR를 Tomcat `webapps`에 배포하고 서버를 시작한 뒤, 브라우저 또는 `Invoke-WebRequest`로 URL의 HTTP 상태 코드와 응답 내용을 확인한다. |

관련 프로젝트 기록: [mvc3_2 프로젝트 이력](../mvc3_2/docs/PROJECT_HISTORY.md)

## 2026-09-09 — HTML 단일 파일 웹페이지

| 질문 | 핵심 답변 |
| --- | --- |
| HTML만 사용해 짧은 소개 페이지를 만들 수 있는가? | 가능하다. 한 HTML 파일 안에 시맨틱 마크업과 `<style>`을 함께 두면 별도 CSS·JavaScript 없이도 반응형 정적 페이지를 만들 수 있다. |

관련 프로젝트 기록: [codex-intro 프로젝트 이력](../codex-intro/docs/PROJECT_HISTORY.md)
