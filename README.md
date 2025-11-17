#REACT 란
- 유저 인터페이스를 위한 자바 라이브러리
 : A JavaScript library for building user interfaces.
- 2013년 : 오픈소스
- 2015년 : 모바일  리액트 네이티브 
- 2019년 : 그전 클래스 -> 함수 
- 2022년 : SSR+ v18 

리액트 , 리액트 네이티브, 리액트+일렉트론

SPA : single page application
CSR : client side Rendering (다운로드 받아서 되는거라서 클라이언트에서 )
gstby Nesty를 통해 ssr 적용가능하다

#프레임워크 VS 라이브러리
routing, http client, state management ui --> angular 프레임워크
단점
- 권장되는 것을 모두 공부해야한다는 것..
- 자율성이 떨어진다.

library는 작은 솔루션 단위를 말한다.
react 는 UI 만들어주기위한 도구
필요한 라이브러리를 골라서 쓸수 있다.
UI만 배우니깐 금방배운다?

#리액트 철학
UI를 표현하고 이벤트를 반응하는 라이브러리
 - A JavaScript library for building user interfaces
   Renders UI and responds to events.
- UI를 commenent로 만드는 라이브러리
리액트의 컴포넌트 란
- A highly conhesive building block for UIs loosely coupled with other components.
 : 초고의 응집된 유연성있는 블럭
 - 독립적, 고립적, 재사용성-==> 이런 컴포넌트를 만들어나가는 것
리액티의 기본 컴포넌트 
- root > navbar ,content > log,button 등등 의 구조 형태로 컴포터넌트로 만듦
- 컴포넌트 단위
    - 재사용성 DRY : Don't Repeat Yourself
    - 단일책임 SR  : Single Responsibility

#리엑트 동작원리
- 데이터- 내부 상태state
       - 외부로 전달 받는 props
- render -> 상태변동 시 -> reRender

#리액트 dom tree
  virtural dom tree --> 이전 tree비교후 변동시 --> dom Tree 
#기본 프레임(사용자 편의성) : 1초에 60 프레임

#리액트 훅
2019년 이전 => 클래스 형태
2019년 이후 => 함수 형태
클래스 컴포넌트의 단점 -this 바인딩, life-cycle로직 재사용 힘듬, 상속이나 composition
함수 컴포넌트 - 리액트훅 
   - Hooks are functions that let you "hook into" react state and lifecycle feature from function component(재사용가능한 갈고리 연결)
#훅
 - useState : 상태관리 로직
 - useEffect : 컴포넌트 생애주기 관리 로직
 - useUser : 서버에서 받아온 사용자
 - Hooks은 (함수들은) 값의 재사용이 아니라 "로직의 재사용"을 위한 것이다.

 #개발환경 설정
 