import React, { FC } from 'react';
import styled from 'styled-components';
import qs from 'querystring';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { postsState } from '../../modules/posts';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  .disabled {
    background: #dee2e6;
    color: #adb5bd;
    cursor: not-allowed;
  }
`;

const PageNumber = styled.div``;

const buildLink = ({ username, page, tag }) => {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
};

const Pagination: FC<{
  page: number;
  lastPage: number;
  username: string;
  tag: string;
}> = ({ page, lastPage, username, tag }) => {
  if (lastPage === 0) lastPage = 1;
  const history = useHistory();
  return (
    <PaginationBlock>
      <button
        type="button"
        className={`btn ${
          page === 1 || page > lastPage ? 'disabled' : 'btn-dark'
        }`}
        onClick={() => {
          history.push(
            page === 1 || page > lastPage
              ? ''
              : buildLink({ username, tag, page: page - 1 }),
          );
        }}
      >
        이전
      </button>
      <PageNumber>{page}</PageNumber>
      <button
        type="button"
        className={`btn ${page >= lastPage ? 'disabled' : 'btn-dark'}`}
        onClick={() => {
          history.push(
            page >= lastPage
              ? ''
              : buildLink({ username, tag, page: page + 1 }),
          );
        }}
      >
        다음
      </button>
    </PaginationBlock>
  );
};

export default Pagination;
