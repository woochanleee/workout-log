# workout-log(운동 일지)
- ~ 2020/07/23(목) 까지 [본 레포지토리](https://github.com/woochanleee/workout-log)
- 레포지토리 이전 -> [workout-log oraganization](https://github.com/workout-log)

[웹사이트](http://workoutlog.club)
http://workoutlog.club

#### 목차

1. [개요](#개요)
2. [의의](#의의)
3. [팀원 및 역할](#팀원-및-역할)
4. [기술 스택](#기술-스택)
5. [서비스 기능](#서비스-기능)
   - [회원](#회원)
   - [프로필](#프로필)
   - [타임라인](#타임라인)
   - [게시물](#게시물)
   - [검색](#계정)

## 개요

운동을 하고 글, 사진을 올리며 기록을 남기는 블로그형 사이트

## 의의

- 운동을 하고 글을 올리는 애플리케이션이 다양하지 않음, 예외) 운동스타그램
- 다른 사람들의 운동 기록을 보며 동기부여를 받을 수 있음
- 운동에 관련된 글을 중심으로 볼수 있음
- 글을 올림으로써 운동을 몇일 째 하는 중이고, 몇일 쉬었는지 확인할 수 있어 스스로 자극을 받음

## 팀원 및 역할

| 이름   | 역할              |
| ------ | ----------------- |
| 이우찬 | Frontend, Backend |

## 기술 스택

1. Backend
   - 언어 : JavaScript(Node.js, koa)
   - 배포 환경 : Amazon Web Service EC2, docker, dockhub
   - 데이터베이스 : mongodb
   - 인증 : JWT
2. Frontend
   - 라이브러리 : React
   - 언어 : HTML5, CSS3, JavaScript
   - 스타일 : bootstrap, styled-component
   - 패키지 관리 : Yarn
   - 통신 : Axios
   - 상태관리 : recoil

## 서비스 기능

#### 회원

- 로그인
  - (Google Oauth)
  - 이메일
  - 사용자 닉네임
  - 프로필 이미지

#### 프로필

- 프로필 사진
- 사용자 닉네임
- 운동일수
- 이메일

#### 타임라인

- 페이지네이션 형식(스크롤 당 10개씩)
  - 전체 사용자의 게시물 최근 순으로
  - 자신의 게시물 삭제 가능
  - 자신의 게시물 수정 가능
- ?tag=&page=&username=&user&useremail= 검색 가능

#### 게시물

- 게시물 작성
  - 사진 
- 게시물 삭제
- 게시물 좋아요
- 댓글 작성(사진 X)
- 수정, 삭제 가능
  - 대댓글 작성
    - 수정 삭제 가능
 

#### 계정

- 로그아웃
- 회원탈퇴
- 사용자 닉네임, 이미지 수정
