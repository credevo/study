# Polymer 1.x 정적 테스트

빌드 도구 없이 Polymer `1.11.3`을 CDN에서 불러오는 예제입니다.

## 실행

Python이 설치된 터미널에서 다음 명령을 실행합니다.

```bash
cd D:/00000_DEV/study/polymer
python server.py
```

Windows에서 `python` 명령이 인식되지 않고 Python Launcher가 설치되어 있다면 다음 명령을 사용합니다.

```powershell
py server.py
```

그런 다음 브라우저에서 <http://localhost:8080>을 엽니다. 서버를 끄려면 실행한 터미널에서 `Ctrl+C`를 누릅니다.

## 테스트

서버를 실행한 상태에서 다음 주소를 엽니다.

<http://localhost:8080/tests/hello-polymer-test.html>

테스트 페이지가 컴포넌트 생성, 속성 바인딩, 초기값, 메서드 호출 및 버튼 클릭을 자동으로 검사하고 성공/실패 결과를 화면에 표시합니다.

## 구성

- `index.html`: 테스트 페이지와 Web Components 폴리필 로드
- `src/hello-polymer.html`: Polymer 1.x 방식의 사용자 정의 엘리먼트
- `tests/hello-polymer-test.html`: 브라우저에서 실행하는 자동 테스트
- `server.py`: Python 정적 파일 서버

CDN 리소스를 사용하므로 페이지를 처음 열 때 인터넷 연결이 필요합니다.
