import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { writeState } from '../../modules/write';
import { writePost } from '../../lib/api/posts';

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
  const onCancel = () => {
    history.goBack();
  };
  const onPublish = useCallback(() => {
    const { title, body, tags, files, isPrivate } = post;
    files.set('title', title);
    files.set('body', body);
    files.set('isPrivate', JSON.stringify(isPrivate));
    tags.forEach((t) => files.append('tags', t));
    if (body === '<p><br></p>') return alert('내용은 공백일 수 없습니다.');
    writePost(files)
      .then((res) => {
        console.log(res);
        setPost({
          title: '',
          body: '',
          tags: [],
          files: new FormData(),
          isPrivate: false,
        });
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
        포스트 등록
      </button>
      <button className="btn btn-sm btn-dark" onClick={onCancel}>
        취소
      </button>
    </WriteActionButtonsBlock>
  );
};

export default withRouter(WriteActionButtons);
