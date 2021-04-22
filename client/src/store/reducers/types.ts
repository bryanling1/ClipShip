import { Position } from '../../components/types';

export enum LabelPosition {
  LEFT_TOP,
  CENTER_TOP,
  RIGHT_TOP,
  LEFT_BOTTOM,
  CENTER_BOTTOM,
  RIGHT_BOTTOM,
}

export interface Clip {
  id: string;
  url: string;
  start: number;
  end: number;
  length: number;
  label: boolean;
  labelContent: string | null;
  labelPosition: LabelPosition | null;
  labelGlobalPosition: LabelPosition | null;
  labelGlobal: boolean;
  thumbnailUrl: string;
  title: string;
  broadcaster: string;
}

export interface Project {
  id: string | null;
  name: string | null;
}
