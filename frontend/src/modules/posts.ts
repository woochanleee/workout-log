import { atom } from 'recoil';

export type postType = {
  body?: string;
  comments?: [];
  files?: string[];
  id?: number;
  isPrivate?: boolean;
  likeUsers?: [];
  likes?: number;
  publishedDate?: Date;
  tags?: [];
  title?: string;
  user?: {
    workoutDays?: number;
    username?: string;
    email?: string;
    loginType?: string;
    profileImage?: string
  };
};

export const postsState = atom<{
  posts: postType[];
  lastPage: number;
}>({
  key: 'posts/postsState',
  default: {
    posts: [],
    lastPage: 1,
  },
});
