import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import RecommentList from './ReCommentList';
import CommentActionButtons from './CommentActionButtons';
import { commentType, commentsState } from '../../../modules/comments';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '../../../modules/auth';
import { deleteRecomment, deleteComment } from '../../../lib/api/comments';

const CommentItemBlock = styled.li`
  list-style: none;
  .pull-left {
    margin-right: 10px;
  }
  .pull-left {
    float: left !important;
  }
  .media,
  .media-object {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  .media-object {
    display: block;
  }
  .img-circle {
    border-radius: 50%;
  }
  img {
    vertical-align: middle;
    border: 0;
    cursor: pointer;
  }
  .media-body {
    position: relative;
  }
  .media,
  .media-body {
    overflow: hidden;
    zoom: 1;
  }
  .well-lg {
    padding: 24px;
    border-radius: 6px;
  }
  .well {
    min-height: 20px;
    padding: 19px;
    margin-bottom: 20px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  }
  .reviews {
    color: #555;
    font-weight: bold;
    margin: 10px auto 20px;
  }
  .text-uppercase {
    text-transform: uppercase;
  }
  .media-date {
    position: absolute;
    right: 25px;
    top: 25px;
  }
  .media-comment {
    margin-bottom: 20px;
    line-break: anywhere;
  }
  .btn-circle {
    font-weight: bold;
    font-size: 12px;
    padding: 6px 15px;
    border-radius: 20px;
  }
  .btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
  }
  .btn-circle span {
    padding-right: 6px;
  }
  .glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .btn-info {
    color: #fff;
    background-color: #5bc0de;
    border-color: #46b8da;
  }
  .glyphicon-share-alt:before {
    content: 're';
  }
  .btn-info:hover,
  .btn-info:focus,
  .btn-info:active,
  .btn-info.active,
  .open > .dropdown-toggle.btn-info {
    color: #fff;
    background-color: #31b0d5;
    border-color: #269abc;
  }
  .btn-warning {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
  .btn-warning:hover,
  .btn-warning:focus,
  .btn-warning:active,
  .btn-warning.active,
  .open > .dropdown-toggle.btn-warning {
    color: #fff;
    background-color: #ec971f;
    border-color: #d58512;
  }
  .glyphicon-comment:before {
    content: '\e111';
  }
  .btn.btn-info.btn-circle.text-uppercase {
    margin-right: 8px;
  }
  .collapse.show {
    display: block;
  }
`;

const RecommentBlock = styled.div`
  margin-left: 1rem;
`;

const CommentItem: FC<{
  data: commentType & {
    recomments?: commentType[];
  };
  hasRecomment?: boolean;
  isRecomment?: boolean;
  setIsReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isReplyMode?: boolean;
  isEditMode?: boolean;
  commentId?: number;
  setCommentId?: React.Dispatch<React.SetStateAction<number>>;
  setIsRecommentMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setRecommentId?: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  data,
  hasRecomment = false,
  isRecomment = false,
  setIsEditMode,
  setIsReplyMode,
  isEditMode,
  isReplyMode,
  commentId,
  setCommentId,
  setIsRecommentMode,
  setRecommentId,
}) => {
  const [commentsList, setCommentsList] = useRecoilState(commentsState);
  const user = useRecoilValue(userState);
  const openRecommentHandler = useCallback(() => {
    ($(`.tab-content > ul > div > .c-${data.id}`) as any).collapse('toggle');
  }, []);
  const onReplyHandler = useCallback(() => {
    $('textarea').focus();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setIsEditMode(false);
    setIsReplyMode(true);
    if (isRecomment) setCommentId(commentId);
    else setCommentId(data.id);
  }, [data, isRecomment]);
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const history = useHistory();
  const onEdit = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (isRecomment) {
      setIsReplyMode(false);
      setIsEditMode(true);
      setIsRecommentMode(true);
      setRecommentId(data.id);
      setCommentId(commentId);
    } else {
      setIsReplyMode(false);
      setIsEditMode(true);
      setCommentId(data.id);
    }

    $('textarea').focus();
  }, []);
  const onRemove = useCallback(() => {
    if (isRecomment) {
      deleteRecomment(postId, commentId, data.id)
        .then((res) => {
          console.log(res.data);
          setCommentsList(res.data.comments);
        })
        .catch((err) => console.log(err));
      return;
    }
    deleteComment(postId, data.id)
      .then((res) => {
        console.log(res.data);
        setCommentsList(res.data.comments);
      })
      .catch((err) => console.log(err));
  }, [location, isRecomment]);
  useEffect(() => {
    if (
      isRecomment &&
      [...$(`.tab-content > ul > div > .c-${commentId}`)].some(
        (el) => [...el.classList].indexOf('show') !== -1,
      )
    ) {
      console.log('shit~_!~_~_#!#!)~#_~!_#~_#');
      $(`.tab-content > ul > div > .c-1`).addClass('show');
    }
  }, [data]);
  return (
    <>
      <CommentItemBlock
        className={isRecomment ? `collapse c-${commentId}` : ''}
      >
        <img
          className="pull-left media-object img-circle"
          src={`${
            data.user.profileImage.indexOf(':')
              ? `${data.user.profileImage}`
              : `${process.env.SERVER_URL}/${data.user.profileImage}`
          }`}
          alt="profile"
          onClick={() => history.push(`/@${data.user.username}`)}
        />

        <div className="media-body">
          <div className="well well-lg">
            <h4 className="media-heading text-uppercase reviews">
              {data.user.username}
            </h4>
            <ul className="media-date text-uppercase reviews list-inline">
              {user.email && user.email === data.user.email ? (
                <CommentActionButtons
                  isRecomment={isRecomment}
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ) : (
                ''
              )}
              {data.isEdited && `수정됨 • `}

              {new Date(data.publishedDate).toLocaleDateString()}
            </ul>
            <p className="media-comment">{data.text}</p>
            <span
              className="btn btn-info btn-circle text-uppercase"
              id="reply"
              onClick={onReplyHandler}
            >
              <span className="glyphicon glyphicon-share-alt"></span> Reply
            </span>
            {!isRecomment && data.recomments.length ? (
              <span
                className="btn btn-warning btn-circle text-uppercase"
                data-toggle="collapse"
                onClick={hasRecomment ? openRecommentHandler : () => undefined}
              >
                <span className="glyphicon glyphicon-comment"></span>{' '}
                {data.recomments.length} comments
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
      </CommentItemBlock>
      <RecommentBlock>
        {hasRecomment && (
          <RecommentList
            setCommentId={setCommentId}
            setRecommentId={setRecommentId}
            isReplyMode={isReplyMode}
            isEditMode={isEditMode}
            setIsReplyMode={setIsReplyMode}
            setIsEditMode={setIsEditMode}
            setIsRecommentMode={setIsRecommentMode}
            commentId={data.id}
            data={data.recomments}
          />
        )}
      </RecommentBlock>
    </>
  );
};
export default CommentItem;
