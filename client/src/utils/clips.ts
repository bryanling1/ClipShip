import { Clip } from '../store/reducers/types';
import _ from 'lodash';

export const areClipsSame = (clips1: Clip[], clips2: Clip[]): boolean => {
  if (clips1.length !== clips2.length) return false;
  for (let i = 0; i < clips1.length; i++) {
    if (!_.isEqual(_.omit(clips1[i], ['id']), _.omit(clips2[i], ['id']))) {
      return false;
    }
  }
  return true;
};
