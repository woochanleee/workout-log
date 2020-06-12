import React, { FC } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import { commentType } from '../../../modules/comments';

const RecommentList: FC<{
  commentId: number;
  data: commentType[];
  isRecomment?: boolean;
  setIsReplyMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  isReplyMode?: boolean;
  isEditMode?: boolean;
  setCommentId?: React.Dispatch<React.SetStateAction<number>>;
  setIsRecommentMode?: React.Dispatch<React.SetStateAction<boolean>>;
  setRecommentId?: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  data,
  commentId,
  isRecomment,
  setIsReplyMode,
  setIsEditMode,
  isReplyMode,
  isEditMode,
  setCommentId,
  setIsRecommentMode,
  setRecommentId,
}) => {
  return (
    <>
      {data.map((d) => (
        <CommentItem
          key={`r_${d.id}`}
          data={d}
          hasRecomment={false}
          isRecomment={true}
          commentId={commentId}
          setCommentId={setCommentId}
          setRecommentId={setRecommentId}
          isReplyMode={isReplyMode}
          isEditMode={isEditMode}
          setIsReplyMode={setIsReplyMode}
          setIsEditMode={setIsEditMode}
          setIsRecommentMode={setIsRecommentMode}
        />
      ))}
    </>
  );
};

export default RecommentList;
