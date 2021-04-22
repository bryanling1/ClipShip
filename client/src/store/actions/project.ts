export enum ProjectActions {
  EMPTY,
  SET_PROJECT,
  SET_PROJECT_ERROR,
}

interface EmptyAction {
  type: ProjectActions.EMPTY;
}

interface SetProject {
  id: string;
  name: string;
}

interface SetProjectAction {
  type: ProjectActions.SET_PROJECT;
  payload: SetProject;
}

interface SetProjectErrorAction {
  type: ProjectActions.SET_PROJECT_ERROR;
  val: boolean;
}

export type ProjectAction = EmptyAction | SetProjectAction | SetProjectErrorAction;

export function setProject(id: string, name: string): ProjectAction {
  return { type: ProjectActions.SET_PROJECT, payload: { id, name } };
}

export function setProjectError(val: boolean): ProjectAction {
  return { type: ProjectActions.SET_PROJECT_ERROR, val };
}
