import React, { FC, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginPage, PostListPage, PostPage, WritePage, NoMatch } from './pages';
import { Header } from './components/common';
import { writeState } from './modules/write';

const App: FC<{}> = () => {
  const location = useLocation();
  const [write, setWrite] = useRecoilState(writeState);
  useEffect(() => {
    if (location.pathname !== '/write') {
      setWrite({
        title: '',
        body: '',
        tags: [],
        files: new FormData(),
        isPrivate: false,
        isEditMode: false,
      });
    }
  }, [location]);
  return (
    <>
      <Header />
      <Switch>
        <Route component={PostListPage} path={['/@:username', '/']} exact />
        <Route component={LoginPage} path="/login" />
        <Route component={WritePage} path="/write" />
        <Route component={PostPage} path="/@:username/:postId" />
        <Route component={NoMatch} />
      </Switch>
    </>
  );
};

export default App;
