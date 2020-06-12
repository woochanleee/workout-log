import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import CommentItem from './CommentItem';
import {
  writeComment,
  listComments,
  writeRecomment,
  updateRecomment,
  updateComment,
} from '../../../lib/api/comments';
import { commentsState, commentType } from '../../../modules/comments';
import { userState } from '../../../modules/auth';

const CommentListWrapper = styled.div`
  padding: 0 15px;
  margin-right: -15px;
  margin-left: -15px;
  > div {
    border-top: 1px solid gray;
  }
  .reviews {
    color: #555;
    font-weight: bold;
    margin: 10px auto 20px;
  }
  .nav-tabs > li {
    float: left;
    margin-bottom: -1px;
  }
  .nav > li {
    position: relative;
    display: block;
  }
  .nav-tabs > li.active > h4 {
    margin-bottom: 0;
    padding-bottom: 0;
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
  }
  .nav-tabs > li > h4 {
    margin-right: 2px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
  }
  .nav > li > h4 {
    position: relative;
    display: block;
    padding: 10px 15px;
  }
  .page-header {
    position: relative;
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eee;
  }
  .page-header {
    div {
      display: flex;
      align-items: flex-end;
      textarea {
        flex: 1;
        min-height: 50px;
        height: auto;
        outline: none;
      }
      button {
        height: 37px;
        margin-left: 8px;
      }
    }
  }
  .tab-content {
    border: 1px solid #ddd;
    border-top: none;
    padding: 50px 15px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const CommentList: FC<{}> = () => {
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const [commentId, setCommentId] = useState(0);
  const [recommentId, setRecommentId] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useRecoilState(commentsState);
  const [isRecommentMode, setIsRecommentMode] = useState(false);
  const user = useRecoilValue(userState);
  const commentChangeHandler = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const initMode = useCallback(() => {
    setIsEditMode(false);
    setIsReplyMode(false);
    setCommentId(0);
    setRecommentId(0);
    setIsRecommentMode(false);
    setCommentText('');
  }, []);
  const commentSubmitHandler = useCallback(() => {
    if (!user.email) return alert('로그인 후 이용해주세요.');
    if (!commentText) return alert('1자 이상 입력해주세요.');

    if (isRecommentMode) {
      if (isEditMode) {
        updateRecomment(postId, commentId, recommentId, commentText)
          .then((res) => {
            setCommentsList(res.data);
            initMode();
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (isReplyMode) {
        writeRecomment(postId, commentId, commentText)
          .then((res) => {
            console.log(res);
            console.log(
              commentsList.map((c) => {
                if (c.id === commentId)
                  return {
                    ...c,
                    recomments: [
                      ...c.recomments,
                      {
                        ...res.data,
                      },
                    ],
                  };
                else return c;
              }),
            );
            setCommentsList(
              commentsList.map((c) => {
                if (c.id === commentId)
                  return {
                    ...c,
                    recomments: [
                      ...c.recomments,
                      {
                        ...res.data,
                      },
                    ],
                  };
                else return c;
              }),
            );
            ($(`.tab-content > ul > div > .c-${res.data.id}`) as any).addClass(
              'show',
            );
            initMode();
          })
          .catch((err) => console.log(err));
        return;
      }
      if (isEditMode) {
        updateComment(postId, commentId, commentText)
          .then((res) => {
            setCommentsList(res.data);
            initMode();
          })
          .catch((err) => console.log(err));
        return;
      }
      writeComment(postId, commentText)
        .then((res) => {
          setCommentsList([
            ...commentsList,
            {
              ...res.data,
            },
          ]);
          initMode();
        })
        .catch((err) => console.log(err.response));
    }
  }, [
    isRecommentMode,
    isReplyMode,
    isEditMode,
    commentId,
    recommentId,
    commentText,
  ]);
  useEffect(() => {
    listComments(postId)
      .then((res) => {
        setCommentsList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CommentListWrapper>
      <div>
        <div className="page-header">
          <h3 className="reviews">
            {isEditMode && '수정 하기'}
            {isReplyMode && '대댓글 달기'}
            {!isEditMode && !isReplyMode && '댓글 달기'}
          </h3>
          <div>
            <textarea
              value={commentText}
              onChange={commentChangeHandler}
            ></textarea>
            {(isEditMode || isReplyMode) && (
              <button className="btn btn-danger" onClick={initMode}>
                취소
              </button>
            )}
            <button className="btn btn-success" onClick={commentSubmitHandler}>
              {isEditMode ? '수정' : '작성'}
            </button>
          </div>
        </div>
        <div className="comment-tab">
          <ul className="nav nav-tabs" role="tablist">
            <li className="active">
              <h4 className="reviews text-capitalize">Comments</h4>
            </li>
          </ul>
          <div className="tab-content">
            <ul>
              {commentsList.map(
                (
                  d: commentType & {
                    recomments: commentType[];
                  },
                ) => (
                  <CommentItem
                    setCommentId={setCommentId}
                    setRecommentId={setRecommentId}
                    isReplyMode={isReplyMode}
                    isEditMode={isEditMode}
                    setIsReplyMode={setIsReplyMode}
                    setIsEditMode={setIsEditMode}
                    key={`c_${d.id}`}
                    data={d}
                    hasRecomment={d.recomments.length ? true : false}
                    setIsRecommentMode={setIsRecommentMode}
                  />
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </CommentListWrapper>
  );
};
export default CommentList;
