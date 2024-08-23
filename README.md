# 💡PoketMonSNS (Next.js를 이용한 App Router 기반 프로젝트)

👇👇👇👇👇👇👇👇

[프로젝트 접속하기](https://poketmon-sns.vercel.app)

👆👆👆👆👆👆👆👆

## 📎 구현 기능 
<h5> 로그인, 회원가입
<h5> 글 작성, 삭제 및 수정
<h5> 좋아요 기능
<h5> 크레딧을 통한 포켓몬 구매, 대표 포켓몬 지정
<h5> 개인정보 수정, 팔로우, 인기글
  

## 📕 컴포넌트 구조
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
<br/>

## 📍 사용한 기술 스택
| NEXT | TypeScript | RTK | MySQL | Next Auth | PRISMA | Chart | SCSS |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| ![nextdotjs 1](https://user-images.githubusercontent.com/100519998/227893505-a722af05-52a0-4a34-960c-677257fabbc1.svg) |![typescript_original_logo_icon_146317](https://github.com/user-attachments/assets/0f421419-8e8a-469d-85b9-7cc20ab50293) |![redux 1](https://github.com/user-attachments/assets/17e7376d-be43-4aa7-b037-25899faa6bfe) |![mysql 1](https://user-images.githubusercontent.com/100519998/227893543-29dfd37d-6944-4e3e-9566-d014ea43cb97.svg) | ![logo-sm 1](https://user-images.githubusercontent.com/100519998/233239793-0210fbeb-cbbe-45de-ad15-7f0fe0007ea8.png) |![prisma 1](https://user-images.githubusercontent.com/100519998/227893615-81bc93ab-ede2-41f9-bfb0-6ca64b8fa9b4.svg) | ![chartdotjs 1](https://user-images.githubusercontent.com/100519998/227893748-28255020-ace6-483d-91db-5c708a2681c3.svg) | ![sass 1](https://user-images.githubusercontent.com/100519998/227893866-945f1042-3dbd-4a54-8be7-4a15bfb78d8c.svg) |

