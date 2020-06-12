import { atom } from 'recoil';

export const writeState = atom<{
  title: string;
  body: string;
  tags: string[];
  files: FormData;
  filesUrl?: string[];
  isPrivate: boolean;
  originalPostId?: number,
  isEditMode: boolean,
}>({
  key: 'write/writeState',
  default: {
    title: '',
    body: '',
    tags: [],
    files: new FormData(),
    isPrivate: false,
    isEditMode: false,
  },
});

export const postState = atom<{
  id?: number,
  files?: string[];
  tags?: string[];
  likeUsers?: any;
  likes?: number;
  isPrivate?: boolean;
  title?: string;
  body?: string;
  user?: {
    workoutDays?: number;
    username?: string;
    email?: string;
    loginType?: string;
    profileImage?: string;
  };
  comments?: [];
  publishedDate?: Date;
}>({
  key: 'write/postState',
  default: {},
});

const foo = 1;

export default foo;
