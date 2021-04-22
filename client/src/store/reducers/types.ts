import { Position } from '../../components/types';

export interface Clip {
  id: string;
  url: string;
  start: number;
  end: number;
  length: number;
  label: string;
  labelPosition: Position;
  labelGlobalPosition: Position;
  thumbnailUrl: string;
  title: string;
  broadcaster: string;
}
