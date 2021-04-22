export enum ProjectActions {
  EMPTY,
}

interface EmptyAction {
  type: ProjectActions.EMPTY;
}

export type ProjectAction = EmptyAction;
