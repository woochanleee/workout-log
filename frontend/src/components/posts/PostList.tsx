import React, { FC, useEffect } from 'react';
import qs from 'querystring';
import styled from 'styled-components';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { SubInfo, Tags } from '../common';
import { listPosts } from '../../lib/api/posts';
import { postsState, postType } from '../../modules/posts';
import Pagination from './Pagination';

const PostListWrapper = styled.div`
    margin-top 3rem;
    embed {
        width: 100%;
        max-height: 31rem;
        object-fit: cover;
        
    }
    a {
      color: #000000;
      text-decoration: none;
    }
`;

const PostItemBlock = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid gray;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: gray;
    }
  }
  p {
    margin-top: 2rem;
  }
  > div:last-child {
    white-space: nowrap;
    overflow-x: scroll;
  }
`;

const PostItem: FC<{ post: postType }> = ({ post }) => {
  const { publishedDate, user, tags, title, body, id, files } = post;
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${id}`}>{title}</Link>
      </h2>
      <SubInfo
        username={user.username}
        profileImage={user.profileImage}
        publishedDate={publishedDate}
      />
      <Tags tags={tags} />
      <p>{body}</p>
      <div>
        {files.length
          ? (files as any).map((f) => (
              <embed src={`${process.env.SERVER_URL}/${f}`} key={f} />
            ))
          : ''}
      </div>
    </PostItemBlock>
  );
};

const PostList: FC<
  RouteComponentProps & {
    location: {
      search: string;
    };
  }
> = ({ location }) => {
  const [posts, setPosts] = useRecoilState(postsState);
  let {
    tag,
    username = location.pathname.split('/@')[1],
    page = 1,
    useremail,
  } = qs.parse(location.search.slice(1));
  tag = tag as string;
  username = username as string;
  page = page as string;
  useEffect(() => {
    listPosts({ tag, username, page, useremail })
      .then((res) => {
        setPosts({
          posts: [...res.data],
          lastPage: parseInt(res.headers['last-page'], 10),
        });
      })
      .catch((err) => console.log(err));
  }, [location.search]);
  return (
    <PostListWrapper>
      <div className="container">
        <div>
          {posts.posts.length
            ? posts.posts.map((post) => <PostItem post={post} key={post.id} />)
            : ''}
        </div>
      </div>
      <Pagination
        page={parseInt(page, 10)}
        lastPage={posts.lastPage}
        username={username}
        tag={tag}
      />
    </PostListWrapper>
  );
};

export default withRouter(PostList);
