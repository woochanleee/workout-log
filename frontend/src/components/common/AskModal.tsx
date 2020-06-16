import React, { FC } from 'react';
import styled from 'styled-components';

const FullScreen = styled.div`
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AskModalBlock = styled.div`
  width: 320px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    > button + button {
      margin-left: 4px;
    }
  }
`;

const AskModal: FC<{
  visible: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({
  visible,
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}) => {
  return (
    <>
      {visible && (
        <FullScreen>
          <AskModalBlock>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="buttons">
              <button className="btn btn-danger" onClick={onCancel}>
                {cancelText}
              </button>
              <button className="btn btn-success" onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          </AskModalBlock>
        </FullScreen>
      )}
    </>
  );
};

export default AskModal;
