import React, { FC, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'reactstrap';
import styled from 'styled-components';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import { useRecoilState } from 'recoil';
import { authState } from '../modules/auth';
import * as authApi from '../lib/api/auth';
import Axios from 'axios';

const Spacer = styled.div`
  height: 56px;
`;

const HeaaderWrapper = styled.header`
  svg {
    vertical-align: unset;
  }
  .dropdown-menu {
    margin-top: 0;
    padding: 0;
    &.show {
      display: inline-block;
    }
  }
  .dropdown-menu > li + li {
    margin-top: 0.25rem;
  }
`;

const Header: FC<{}> = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const loginHandler = useCallback((data) => {
    const { Ut } = data;
    authApi
      .login({
        username: Ut.Bd,
        email: Ut.Eu,
        profileImage: Ut.iL,
      })
      .then((res) =>
        setAuth({
          profileImage: res.data.profileImage,
          workoutDays: res.data.workoutDays,
          username: res.data.username,
          email: res.data.email,
          loginType: res.data.loginType,
        }),
      )
      .catch((err) => console.log(err));
  }, []);
  const activeStyle = {
    color: '#fff',
  };
  const dropdownHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    ($('#navbarCollapse') as any).collapse('toggle');
  };
  useEffect(() => {
    $('.dropdown').hover(
      function () {
        $(this).addClass('show');
        $('.dropdown-menu').addClass('show');
        $('.dropdown-toggle').attr('aria-expanded', 'true');
      },
      function () {
        $(this).removeClass('show');
        $('.dropdown-menu').removeClass('show');
        $('.dropdown-toggle').attr('aria-expanded', 'false');
      },
    );
  }, []);
  return (
    // <header>
    //   <Nav className="navbar-expand-md navbar-dark fixed-top bg-dark">
    //     <Link to="/">workoutLog</Link>
    //     <a>로그인</a>
    //   </Nav>
    // </header>
    <>
      <HeaaderWrapper>
        <Nav className="navbar navbar-expand-md navbar-dark fixed-top bg-success">
          <NavLink className="navbar-brand" to="/">
            <span className="h3">workoutLog</span>
          </NavLink>
          <Button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded={true}
            aria-label="Toggle navigation"
            onClickCapture={dropdownHandler}
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              {Object.keys(auth).length ? (
                <li className="nav-item">
                  <NavLink
                    activeStyle={activeStyle}
                    className="nav-link"
                    to="/mypage"
                  >
                    <span className="mb-0">MYPAGE</span>
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <div className="dropdown pull-left">
                    <button
                      className="btn btn-default dropdown-toggle nav-link"
                      type="button"
                      data-toggle="dropdown"
                      data-hover="dropdown"
                      aria-expanded="false"
                    >
                      LOGIN
                    </button>
                    <ul
                      className="dropdown-menu dropdownhover-bottom d-print-inline-block"
                      role="menu"
                      aria-labelledby="dropdownMenu1"
                    >
                      <li>
                        <GoogleAPI
                          clientId={process.env.GOOGLE_CLIENT_ID}
                          onUpdateSigninStatus={(res) => console.log(res)}
                          onInitFailure={(err: any) => console.log(err)}
                        >
                          <GoogleLogin
                            onLoginSuccess={loginHandler}
                            onLoginFailure={(err) => console.log(err)}
                          />
                        </GoogleAPI>
                      </li>
                    </ul>
                  </div>
                </li>
              )}
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="ex) 닉네임, 태그"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-dark my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </Nav>
      </HeaaderWrapper>
      <Spacer />
      {console.log(auth)}
    </>
  );
};

export default Header;

{
  /* <header>
<Nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <NavLink className="navbar-brand" to="/">
    workoutLog
  </NavLink>
  <Button
    className="navbar-toggler collapsed"
    type="button"
    data-toggle="collapse"
    data-target="#navbarCollapse"
    aria-controls="navbarCollapse"
    aria-expanded={true}
    aria-label="Toggle navigation"
    onClickCapture={dropdownHandler}
  >
    <span className="navbar-toggler-icon"></span>
  </Button>
  <div className="navbar-collapse collapse" id="navbarCollapse">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink
          activeStyle={activeStyle}
          className="nav-link"
          to="/login"
        >
          LOGIN
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          activeStyle={activeStyle}
          className="nav-link"
          to="/mypage"
        >
          MYPAGE
        </NavLink>
      </li>
    </ul>
    <form className="form-inline mt-2 mt-md-0">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
    </form>
  </div>
</Nav>
</header> */
}
