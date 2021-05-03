import { Clip } from '../store/reducers/types';

export const getClipWidths = (clips: Clip[]): number[] => {
  const out: number[] = [];
  let total = 0;
  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    total += clip.end - clip.start;
  }

  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    out.push((clip.end - clip.start) / total);
  }

  return out;
};

export const getTotalTime = (clips: Clip[]): string => {
  let total = 0;
  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];
    total += clip.end - clip.start;
  }
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total - hours * 3600) / 60);
  const seconds = Math.floor(total - hours * 3600 - minutes * 60);

  if (hours > 0) {
    return `${hours}:${minutes >= 10 ? minutes : '0' + minutes.toString()}:${
      seconds >= 10 ? seconds : '0' + seconds.toString()
    }`;
  } else {
    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds.toString()}`;
  }
};

export const getMinutes = (clips: Clip[]): number => {
  let total = 0;
  for (const clip of clips) {
    total += (clip.end - clip.start) / 60;
  }
  return total;
};
