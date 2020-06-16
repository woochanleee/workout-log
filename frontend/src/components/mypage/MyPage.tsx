import React, { FC, useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { googleIcon } from '../../../public/assets';
import { userState } from '../../modules/auth';
import { update, leave } from '../../lib/api/auth';
import client from '../../lib/api/client';
import AskWithDrawModal from './AskWithDrawModal';

const MyPageWrapper = styled.div`
  .container {
    padding-top: 2rem;
  }
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 50%;
  }
  .mb-0 {
    img {
      width: 20px;
      height: 20px;
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
  }
`;

enum loginType {
  'gmail.com' = googleIcon,
}
const MyPage: FC<{}> = () => {
  const [user, setUser] = useRecoilState(userState);
  const history = useHistory();
  const [file, setFile] = useState<File>();
  const [name, setName] = useState(user.username);
  const [modal, setModal] = useState(false);
  const onChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const imageChangeHandler = useCallback(() => {
    const inputEl = document.createElement('input');
    inputEl.setAttribute('type', 'file');
    inputEl.setAttribute('accept', '.gif, .jpg, .png');
    inputEl.click();
    inputEl.onchange = () => {
      const imageDiv = document.querySelector('#profile-block');
      imageDiv.innerHTML = '';
      function readURL(input: any) {
        if (input.files && input.files[0]) {
          setFile(input.files[0]);
          const reader = new FileReader();
          reader.onload = function (e: any) {
            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', e.target.result);
            imageDiv.appendChild(imgEl);
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
      readURL(inputEl);
    };
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.set('username', name);
      formData.set('file', file);
      update(formData)
        .then((res) => {
          setUser(res.data);
          history.push('/');
        })
        .catch((err) => console.log(err.response));
    },
    [name, file],
  );
  useEffect(() => {
    const dataURLtoFile = (dataurl, fileName) => {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], fileName, { type: mime });
    };

    if (user.profileImage.indexOf(':') === -1)
      client
        .get(`/${user.profileImage}`, { responseType: 'blob' })
        .then(function (response) {
          var reader = new window.FileReader();
          reader.readAsDataURL(response.data);
          reader.onload = function () {
            var imageDataUrl = reader.result;
            setFile(dataURLtoFile(imageDataUrl, user.profileImage));
          };
        })
        .catch((err) => console.log(err));
  }, []);
  if (!user.email) {
    history.goBack();
    return null;
  }
  const withDrawAccount = useCallback(() => {
    leave()
      .then((res) => {
        setModal(true);
        setUser({
          username: '',
          workoutDays: 0,
          profileImage: '',
          email: '',
          loginType: '',
        });
        localStorage.removeItem('user');
        history.push('/');
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <MyPageWrapper>
        <div className="container">
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: '140px' }}>
                            <div
                              id="profile-block"
                              className="d-flex justify-content-center align-items-center rounded"
                              style={{
                                height: '140px',
                                backgroundColor: 'rgb(233, 236, 239)',
                              }}
                            >
                              <img
                                src={
                                  user.profileImage.indexOf(':') !== -1
                                    ? user.profileImage
                                    : `${process.env.SERVER_URL}/${user.profileImage}`
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              {user.username}
                            </h4>
                            <p className="mb-0">
                              {user.email}&nbsp;
                              <img src={loginType[user.loginType]} />
                            </p>
                            <div className="text-muted"></div>
                            <div className="mt-2">
                              <button
                                className="btn btn-success"
                                type="button"
                                onClick={imageChangeHandler}
                              >
                                <span>사진 변경</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item active nav-link">
                          내 정보 수정
                        </li>
                        <button
                          className="btn btn-danger"
                          onClick={() => setModal(true)}
                        >
                          회원 탈퇴
                        </button>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="name">이름</label>
                                      <input
                                        id="name"
                                        className="form-control"
                                        type="text"
                                        placeholder="이름"
                                        value={name}
                                        onChange={onChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                {' '}
                                <button
                                  className="btn btn-success"
                                  type="submit"
                                  onClick={onSubmit}
                                >
                                  저장
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MyPageWrapper>
      <AskWithDrawModal
        visible={modal}
        onCancel={() => setModal(false)}
        onConfirm={withDrawAccount}
      />
    </>
  );
};

export default MyPage;
