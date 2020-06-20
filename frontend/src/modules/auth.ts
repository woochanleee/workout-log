import { atom, selector } from 'recoil';

export const userState = atom<{
  username: string;
  workoutDays: number;
  profileImage: string;
  email: string;
  loginType: string;
}>({
  key: 'auth/userState',
  default: {
    username: '',
    workoutDays: 0,
    profileImage: '',
    email: '',
    loginType: '',
  },
});

export default {};
