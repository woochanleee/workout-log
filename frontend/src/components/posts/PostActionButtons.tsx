import React, { FC, useState } from 'react';
import styled from 'styled-components';
import AskRemoveModal from './AskRemoveModal';

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
    margin-left: 0.25rem;
  }
`;

const PostActionButtons: FC<{
  onEdit: () => void;
  onRemove: () => void;
}> = ({ onEdit, onRemove }) => {
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
      <AskRemoveModal
        visible={modal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default PostActionButtons;
