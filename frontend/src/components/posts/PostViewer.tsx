import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { postState, writeState } from '../../modules/write';
import { readPost, removePost } from '../../lib/api/posts';
import { SubInfo, Tags } from '../common';
import PostActionButtons from './PostActionButtons';
import { userState } from '../../modules/auth';
import { isLike, isNotLike } from '../../../public/assets';
import { like, notLike } from '../../lib/api/liking';
import { check } from '../../lib/api/auth';
import CommentList from './comments/CommentList';

const PostViewerWrapper = styled.div`
  margin-top: 4rem;
  #files {
    width: 100%;
    max-height: 31rem;
    display: block;
    overflow-x: scroll;
    margin-bottom: 1rem;
    white-space: nowrap;
    > embed {
      object-fit: cover;
      width: 100%;
      height: auto;
      max-height: 31rem;
    }
  }
  .additional {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
    span {
      margin-right: 4px;
    }
  }
  ul {
    padding: 0;
  }
`;

const PostHead = styled.div`
  border-bottom: 1px solid gray;
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: #343a40;
`;

const PostViewer: FC<
  RouteComponentProps & {
    match: {
      params: {
        postId: string;
      };
    };
    history: {
      push: (p: string) => {};
    };
  }
> = ({ match, history }) => {
  const { postId } = match.params;
  const [error, setError] = useState('');
  const user = useRecoilValue(userState);
  const [post, setPost] = useRecoilState(postState);
  const [write, setWrite] = useRecoilState(writeState);
  const [liking, setLiking] = useState(false);
  useEffect(() => {
    readPost(postId)
      .then((res) => {
        setPost(res.data);
        check()
          .then((userRes) => {
            let user = {
              email: userRes.data.email,
              loginType: userRes.data.loginType,
              profileImage: userRes.data.profileImage,
              username: userRes.data.username,
              workoutDays: userRes.data.workoutDays,
            };
            if (user) {
              if (
                res.data.likeUsers.findIndex((e) => e === user.email) === -1
              ) {
                setLiking(false);
              } else {
                setLiking(true);
              }
            } else setLiking(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('not found');
          return;
        }
        setError('error');
      });
  }, []);
  const onEdit = () => {
    setWrite({
      title: post.title,
      body: post.body,
      tags: post.tags,
      files: new FormData(),
      filesUrl: post.files,
      isPrivate: post.isPrivate,
      originalPostId: post.id,
      isEditMode: true,
    });
    history.push('/write');
  };
  const onRemove = () => {
    removePost(postId)
      .then((res) => history.push('/'))
      .catch((err) => console.log(err));
  };

  const onLikeHandler = () => {
    if (user.username === '') {
      return alert('로그인 후 이용해주세요.');
    }
    if (liking) {
      notLike(postId)
        .then((res) => {
          setPost(res.data);
          setLiking(false);
        })
        .catch((err) => console.log(err));
    } else {
      like(postId)
        .then((res) => {
          setLiking(true);
          setPost(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  if (error === 'not found')
    return (
      <PostViewerWrapper>
        <div className="container">존재하지 않는 포스트입니다.</div>
      </PostViewerWrapper>
    );
  else if (error === 'error')
    return (
      <PostViewerWrapper>
        <div className="container">오류 발생!</div>
      </PostViewerWrapper>
    );
  if (!Object.keys(post).length) return null;

  return (
    <PostViewerWrapper>
      <div className="container">
        <PostHead>
          <h1>{post.title}</h1>
          <SubInfo
            username={post.user.username}
            profileImage={post.user.profileImage}
            publishedDate={post.publishedDate}
            hasMarginTop
          />
          <Tags tags={post.tags} />
        </PostHead>
        <div className="additional">
          <span>{post.likes}</span>
          <img src={liking ? isLike : isNotLike} onClick={onLikeHandler} />
          {(user && user.email) === (post && post.user.email) && (
            <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
          )}
        </div>

        <div id="files">
          {post.files &&
            post.files.length !== 0 &&
            post.files.map((f) => (
              <embed src={`${process.env.SERVER_URL}/${f}`} key={f} />
            ))}
        </div>
        <PostContent dangerouslySetInnerHTML={{ __html: post.body }} />
        <CommentList />
      </div>
    </PostViewerWrapper>
  );
};

export default withRouter(PostViewer);
