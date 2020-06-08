import { atom } from 'recoil';

export const writeState = atom<{
  title: string;
  body: string;
  tags: string[];
  files: FormData;
  isPrivate: boolean;
}>({
  key: 'write/writeState',
  default: {
    title: '',
    body: '',
    tags: [],
    files: new FormData(),
    isPrivate: false,
  },
});

const foo = 1;
export default foo;
