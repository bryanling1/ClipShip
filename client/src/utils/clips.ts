import { Clip } from '../store/reducers/types';
import _ from 'lodash';

export const areClipsSame = (clips1: Clip[], clips2: Clip[]): boolean => {
  if (clips1.length !== clips2.length) return false;
  for (let i = 0; i < clips1.length; i++) {
    if (!_.isEqual(clips1[i], clips2[i])) {
      return false;
    }
  }
  return true;
};
