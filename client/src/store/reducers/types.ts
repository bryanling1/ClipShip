import { Position } from '../../components/types';

export interface Clip {
  id: string;
  url: string;
  start: number;
  end: number;
  length: number;
  label: boolean;
  labelContent: string | null;
  labelPosition: Position | null;
  labelGlobalPosition: Position | null;
  thumbnailUrl: string;
  title: string;
  broadcaster: string;
}
