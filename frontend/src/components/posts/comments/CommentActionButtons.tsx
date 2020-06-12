import React, { FC, useState } from 'react';
import styled from 'styled-components';
import CommentRemoveModal from './CommentRemoveModal';

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #868e96;
  font-weight: bold;
  border: none;
  outline: none !important;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: #f1f3f5;
    color: #1098ad;
  }
  & + & {
    margin: 0 0.5rem 0 0.25rem;
  }
`;

const CommentActionButtons: FC<{
  onEdit: () => void;
  onRemove: () => void;
  isRecomment: boolean;
}> = ({ onEdit, onRemove, isRecomment = false }) => {
  const [modal, setModal] = useState(false);
  const onRemoveClick = () => {
    setModal(true);
  };
  const onCancel = () => {
    setModal(false);
  };
  const onConfirm = () => {
    setModal(false);
    onRemove();
  };
  return (
    <>
      <ActionButton onClick={onEdit}>수정</ActionButton>
      <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
      <CommentRemoveModal
        isRecomment={isRecomment}
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default CommentActionButtons;
