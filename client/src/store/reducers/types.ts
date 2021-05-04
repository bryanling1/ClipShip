import { Clip } from '@clipship/common';

export interface Project {
  id: string | null;
  name: string | null;
  error: boolean | null;
  selectedClip: number | null;
  dbClips: Clip[];
}

export interface StoreState {
  clips: Clip[];
  project: Project;
}
