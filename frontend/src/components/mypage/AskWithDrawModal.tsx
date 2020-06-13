import React, { FC } from 'react';
import AskModal from '../common/AskModal';

const AskWithDrawModal: FC<{
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ visible, onConfirm, onCancel }) => {
  return (
    <AskModal
      visible={visible}
      title="회원 탈퇴"
      description="지금까지 올린 게시글이 삭제됩니다. 정말 탈퇴 하시겠습니까?"
      confirmText="탈퇴"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default AskWithDrawModal;
