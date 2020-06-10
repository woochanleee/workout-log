import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Link } from 'react-router-dom';

const SubInfoBlock = styled.div<{ hasMarginTop: boolean }>`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}
  a {
    color: gray !important;
  }

  span + span:before {
    color: gray;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`;

const SubInfo: FC<{
  username: string;
  publishedDate: Date;
  hasMarginTop?: boolean;
}> = ({ username, publishedDate, hasMarginTop }) => {
  return (
    <SubInfoBlock hasMarginTop={hasMarginTop}>
      <span>
        <b>
          <Link to={`/@${username}`}>{username}</Link>
        </b>
      </span>
      <span>{new Date(publishedDate).toLocaleDateString()}</span>
    </SubInfoBlock>
  );
};

export default SubInfo;
