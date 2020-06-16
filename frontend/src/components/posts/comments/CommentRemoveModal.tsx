import React, { FC } from 'react';
import AskModal from '../../common/AskModal';

const CommentRemoveModal: FC<{
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isRecomment: boolean;
}> = ({ visible, onConfirm, onCancel, isRecomment = false }) => {
  return (
    <AskModal
      visible={visible}
      title={`${isRecomment ? '대댓글' : '댓글'} 삭제`}
      description={`${
        isRecomment ? '대댓글' : '댓글'
      }을 정말 삭제하시겠습니까?`}
      confirmText="삭제"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default CommentRemoveModal;
