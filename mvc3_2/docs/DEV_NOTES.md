# mvc3_2 개발 지식 노트

## 현재 기술 구성

| 항목 | 값 |
| --- | --- |
| 프레임워크 | Spring MVC `3.2.18.RELEASE` |
| 패키징 | WAR |
| 컴파일 대상 | Java 7 |
| 현재 빌드 JDK | JDK 8 |
| Maven | 3.6.3 |
| 권장 WAS | Tomcat 7 |
| Servlet API | `javax.servlet-api:3.0.1` (`provided`) |

## 요청 처리 구조

```text
브라우저 GET /
  → Tomcat
  → DispatcherServlet (WEB-INF/web.xml)
  → HomeController
  → InternalResourceViewResolver
  → WEB-INF/views/home.jsp
  → HTML 응답
```

## 프로젝트 핵심 파일

- `pom.xml`: Spring MVC 의존성, Java 7 컴파일 옵션, WAR 빌드 설정
- `src/main/webapp/WEB-INF/web.xml`: `DispatcherServlet`을 `/`에 매핑
- `src/main/webapp/WEB-INF/spring/servlet-context.xml`: 컨트롤러 검색, MVC annotation, JSP ViewResolver 설정
- `src/main/java/com/example/mvc32/web/HomeController.java`: 루트 URL을 처리하고 `home` 뷰를 반환
- `src/main/webapp/WEB-INF/views/home.jsp`: Model의 `message`를 표시

## 빌드 및 배포

```powershell
mvn clean package
```

빌드 산출물은 `target/mvc3_2.war`이다. Tomcat 7의 `webapps`에 배포한 뒤 아래 URL로 접근한다.

```text
http://localhost:8080/mvc3_2/
```

현재 로컬 서버는 `D:\00000_DEV\study\tools\apache-tomcat-7.0.109`에 설치된 Tomcat `7.0.109`으로 실행 중이다. 서버를 중지하려면 아래 명령을 실행한다.

```powershell
& 'D:\00000_DEV\study\tools\apache-tomcat-7.0.109\bin\shutdown.bat'
```

서버가 시작됐는지뿐 아니라 애플리케이션이 정상 배포됐는지도 확인하려면 다음 명령을 사용한다.

```powershell
Invoke-WebRequest -UseBasicParsing 'http://localhost:8080/mvc3_2/'
```

## 프로젝트 전용 주의 사항

- 현재 JDK 8로 Java 7 대상 빌드를 수행한다. 실제 Java 7 서버 배포 전에는 JDK 7에서 다시 검증한다.
- `javax.servlet-api`는 Tomcat이 제공하므로 WAR 내부에 중복 포함하지 않는다.
- Tomcat 10 이상은 Jakarta Servlet 기반이므로 이 프로젝트의 `javax` 기반 설정과 직접 호환되지 않는다.
