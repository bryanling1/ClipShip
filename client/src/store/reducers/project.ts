import { Project } from './types';
import { ProjectAction } from '../actions';

export const initState: Project = {
  id: null,
  name: null,
};

const projectReducer = (state: Project = initState, action: ProjectAction): Project => {
  switch (action.type) {
    default:
      return state;
  }
};

export default projectReducer;
