import React, { FC, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Button } from 'reactstrap';
import styled from 'styled-components';
import { GoogleAPI, GoogleLogin } from 'react-google-oauth';
import { useRecoilState } from 'recoil';
import Marquee from 'react-double-marquee';
import { userState } from '../../modules/auth';
import * as authApi from '../../lib/api/auth';

const Spacer = styled.div`
  height: 61px;
`;

const LogoutBlock = styled.div`
  cursor: pointer;
`;

const HeaaderWrapper = styled.header`
  svg {
    vertical-align: unset;
  }
  .dropdown-menu {
    margin-top: 0;
    margin-bottom: 1rem;
    padding: 0;
    &.show {
      display: inline-block;
    }
  }
  .dropdown-menu > li + li {
    margin-top: 0.25rem;
  }

  .dropdown.pull-left {
    display: inline-block;
  }
  .form-inline {
    display: flex;
    background-color: #28a745 !important;
    z-index: 1000;
  }
  .nav-item.greet {
    width: 4rem !important;
  }
  .greet {
    white-space: nowrap;
    padding: 0.5rem 0;
    > div {
      width: 20rem;
      height: 100%;
      display: flex;
      align-items: center;
      color: white;
    }
  }
`;

const Header: FC<{}> = () => {
  const [user, setUser] = useRecoilState(userState);
  const loginHandler = useCallback((data) => {
    const { Ut } = data;
    authApi
      .login({
        username: Ut.Bd,
        email: Ut.Eu,
        profileImage: Ut.iL,
      })
      .then((res) => {
        setUser({
          profileImage: res.data.profileImage,
          workoutDays: res.data.workoutDays,
          username: res.data.username,
          email: res.data.email,
          loginType: res.data.loginType,
        });
      })
      .catch((err) => console.log(err));
    authApi
      .check()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  const logoutHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      authApi
        .logout()
        .then((res) => {
          localStorage.removeItem('user');
          setUser({
            username: '',
            workoutDays: 0,
            profileImage: '',
            email: '',
            loginType: '',
          });
        })
        .catch((err) => console.log(err));
    },
    [],
  );
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
  }, [user]);
  useEffect(() => {
    if (user.username.length) {
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user]);
  return (
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
              {user.username.length ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      activeStyle={activeStyle}
                      className="nav-link"
                      to="/write"
                    >
                      <span className="mb-0">WRITE</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeStyle={activeStyle}
                      className="nav-link"
                      to="/mypage"
                    >
                      <span className="mb-0">MYPAGE</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <LogoutBlock
                      className="nav-link"
                      onClickCapture={logoutHandler}
                    >
                      <span className="mb-0">LOGOUT</span>
                    </LogoutBlock>
                  </li>
                  <li className="nav-item greet">
                    <Marquee>
                      {user.username}님 안녕하세요. {user.workoutDays}일째
                      운동중입니다!💪
                    </Marquee>
                  </li>
                </>
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
    </>
  );
};

export default Header;