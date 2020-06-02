import React, { FC } from 'react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  background: #000000;
  > h1 {
    font-size: 40px;
    color: #ffffff;
  }
`;

const App: React.FC<{}> = () => {
  return (
    <AppWrapper>
      <h1>Hello, world!</h1>
    </AppWrapper>
  );
};

export default App;
