import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, PostListPage, PostPage, WritePage, NoMatch } from './pages';
import './style.css';

const App: FC<{}> = () => (
  <Switch>
    <Route component={PostListPage} path={['/@:username', '/']} exact />
    <Route component={LoginPage} path="/login" />
    <Route component={WritePage} path="/write" />
    <Route component={PostPage} path="/@:username/:postId" />
    <Route component={NoMatch} />
  </Switch>
);

export default App;
