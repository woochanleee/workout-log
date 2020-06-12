import { atom } from 'recoil';

export type commentType = {
  id?: number;
  publishedDate?: Date;
  text?: string;
  isEdited?: boolean;
  user?: {
    username?: string;
    workoutDays?: number;
    profileImage?: string;
    email?: string;
    loginType?: string;
  }
  recomments?: commentType[]
};

export const commentsState = atom<commentType[]>({
  key: 'comments/commentsState',
  default: [],
});
