import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { writeState } from '../../modules/write';
import { writePost, updatePost } from '../../lib/api/posts';
import { userState } from '../../modules/auth';

const WriteActionButtonsBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
  button {
    padding: 0.25rem 0.75rem;
  }
`;

const WriteActionButtons: FC<RouteComponentProps> = ({ history }) => {
  const [post, setPost] = useRecoilState(writeState);
  const [user, setUser] = useRecoilState(userState);
  const onCancel = () => {
    history.goBack();
  };
  const onPublish = useCallback(() => {
    post.files.set('title', post.title);
    post.files.set('body', post.body);
    post.files.set('isPrivate', JSON.stringify(post.isPrivate));
    if (post.tags.length === 1) {
      post.files.append('tags', process.env.DUMMY_TAG);
    }
    [...new Set(post.tags)].forEach((t) => post.files.append('tags', t));
    if (post.body === '<p><br></p>') return alert('내용은 공백일 수 없습니다.');
    if (post.isEditMode) {
      updatePost(post.files, post.originalPostId)
        .then((res) => {
          setPost({
            title: '',
            body: '',
            tags: [],
            files: new FormData(),
            isPrivate: false,
            isEditMode: false,
          });
          history.push(`/@${res.data.user.username}/${res.data.id}`);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response);
          alert('수정하기에 실패하였습니다.');
        });
      return;
    }
    writePost(post.files)
      .then((res) => {
        console.log(res);
        setPost({
          title: '',
          body: '',
          tags: [],
          files: new FormData(),
          isPrivate: false,
          isEditMode: false,
        });
        setUser({ ...res.data.user });
        history.push(`/@${res.data.user.username}/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert('글쓰기에 실패하였습니다.');
      });
  }, [post]);
  return (
    <WriteActionButtonsBlock>
      <button className="btn btn-sm btn-success" onClick={onPublish}>
        {post.isEditMode ? '포스트 수정' : '포스트 등록'}
      </button>
      <button className="btn btn-sm btn-dark" onClick={onCancel}>
        취소
      </button>
    </WriteActionButtonsBlock>
  );
};

export default withRouter(WriteActionButtons);
