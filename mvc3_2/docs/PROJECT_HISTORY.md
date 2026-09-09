# mvc3_2 프로젝트 이력

## 2026-09-09 — 프로젝트 초기 생성

- 결정: Spring MVC `3.2.18.RELEASE` 기반 Maven WAR 프로젝트로 생성
- 목적: Java 7 기반 레거시 Spring MVC 구조 학습 및 로컬 Tomcat 배포 연습
- 주요 파일: `pom.xml`, `WEB-INF/web.xml`, `WEB-INF/spring/servlet-context.xml`, `HomeController.java`, `home.jsp`
- 설정: Maven Compiler Plugin에서 `source`와 `target`을 `1.7`로 지정

## 2026-09-09 — Maven 설치 및 WAR 빌드 확인

- Maven 설치 위치: `D:\00000_DEV\study\tools\apache-maven-3.6.3`
- 사용자 환경 변수: `MAVEN_HOME` 설정 및 Maven `bin` 경로를 사용자 `PATH`에 등록
- 현재 빌드 JDK: `D:\jdk-8u501-windows-x64\jdk1.8.0_501`
- 실행 명령: `mvn clean package`
- 검증 결과: 빌드 성공, `target\mvc3_2.war` 생성 확인

## 2026-09-09 — 문서 체계 재구성

- 결정: 프로젝트 관련 지식과 이력을 `mvc3_2/docs/`에 분리
- 이유: 공통 학습 지식은 study 루트 `docs/`에, 프로젝트 고유 정보는 프로젝트 내부에 보관하기 위함
- 변경: 기존 `SETUP_NOTES.md`의 내용을 프로젝트별 문서와 공통 문서로 분리·이관

## 2026-09-09 — 로컬 Tomcat 배포 및 실행 확인

- Tomcat 설치 위치: `D:\00000_DEV\study\tools\apache-tomcat-7.0.109`
- 배포 파일: `target\mvc3_2.war`를 Tomcat `webapps\mvc3_2.war`로 배포
- 서버: Tomcat `7.0.109`, 기본 포트 `8080`
- 검증 URL: `http://localhost:8080/mvc3_2/`
- 검증 결과: HTTP `200`, `Spring MVC 3.2 is running.` HTML 응답 확인

공통 학습 요약: [LEARNING_HISTORY.md](../../docs/LEARNING_HISTORY.md)
