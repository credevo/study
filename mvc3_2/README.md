# Spring MVC 3.2 Maven 프로젝트

Java 7과 Tomcat 7 기준의 최소 Spring MVC 3.2 WAR 프로젝트입니다.

## 빌드 및 실행

Maven 3.6.x와 JDK 7을 사용해 프로젝트 루트에서 실행합니다.

```powershell
mvn clean package
```

생성된 `target/mvc3_2.war`를 Tomcat 7의 `webapps` 폴더에 배포한 뒤 아래 주소로 접속합니다.

```
http://localhost:8080/mvc3_2/
```

`javax.servlet-api`는 Tomcat이 제공하므로 WAR에 포함되지 않습니다.
