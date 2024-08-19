### 설명
#### App Router 기반
<br/>

#### Pages
|페이지 명|역할|
|:---|:---|
|(Route)/page|로그인 페이지|
|(Route)/main/page|로그인 후 보여지는 화면|
<br/>

#### (Route)/main/
|컴포넌트 명|역할|
|:---|:---|
|_components/Headmeta.tsx|메타태그 변경 (탭 이름)|
|_components/Header|헤더|
|_components/Loading|로딩 컴포넌트|
|_components/Maincontents|로그인 후 컨텐츠 출력 위치|
|_components/Nav|좌측 네비게이션 (메뉴)|
|_components/Profile|프로필|
<br/>

### 각 컴포넌트 폴더 구조
|폴더명|역할|
|:--|:--|
|Header/Header|헤더 구조|
|Loading/Loding|로딩 컴포넌트|
|MainContents/MainContents.tsx|메인 콘텐츠 출력|
|MainContents/Board|게시글|
|MainContents/EditProfile|프로필 수정|
|MainContents/Encyclopedia|포켓몬도감|
|MainContents/Following|팔로우 목록|
|MainContents/MyPost|내가 작성한 글|
|MainContents/Trend|인기 글|
|MainContents/Tutorial|튜토리얼|
|MainContents/Write|작성하기|
|Nav/Nav|좌측 네비게이션|
|Profile/Profile|우측 프로필|
