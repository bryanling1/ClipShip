import { Clip } from '../models/project';
import { http } from 'follow-redirects';
import Ffmpeg, { TextPosition, TimelineText } from '../classes/ffmpeg';
import fs from 'fs';
import path from 'path';

class TwitchClips {
  private downloadLinks: string[];
  private ffmpeg: Ffmpeg;
  constructor(private clips: Clip[], private dir: string, private fontFile: string) {
    this.downloadLinks = [];
    this.setDownloadLinks();
    this.ffmpeg = new Ffmpeg();
  }

  private setDownloadLinks(): void {
    for (const clip of this.clips) {
      this.downloadLinks.push(`${clip.thumbnailUrl.split('-preview', 1)}.mp4`);
    }
  }

  private async download() {
    let count = 0;
    const promises: Promise<void>[] = [];
    for (const downloadUrl of this.downloadLinks) {
      const downloadPath = this.dir + `${count}.mp4`;
      const file = fs.createWriteStream(downloadPath);
      const promise: Promise<void> = new Promise((resolve, reject) => {
        http.get(downloadUrl, (response) => {
          promises.push();
          const stream = response.pipe(file);
          stream.on('finish', function () {
            stream.close();
            resolve();
          });
        });
      });
      promises.push(promise);
      count++;
    }
    return Promise.all(promises);
  }

  private getTimelineTextsFromClips(): TimelineText[] {
    let total = 0;
    const out: TimelineText[] = [];
    for (const clip of this.clips) {
      const len = clip.end - clip.start;
      out.push({ text: clip.broadcaster, start: total, end: total + len });
      total += len;
    }
    return out;
  }

  public setFontFile(file: string) {
    this.fontFile = file;
  }

  public async clipsToVideo(): Promise<any> {
    await this.download();
    this.ffmpeg.setAttrs({ fontFile: this.fontFile });
    await this.ffmpeg.trimDir(
      this.dir,
      this.clips.map((clip) => ({ start: clip.start, end: clip.end }))
    );
    await this.ffmpeg.addTextDir(
      this.dir,
      this.clips.map((clip, i) => ({
        content: clip.broadcaster + i,
        position: clip.labelPosition || (0 as TextPosition),
      }))
    );
    return this.ffmpeg.concatDir(this.dir, this.dir, 'output.mp4', true);
  }
}

export default TwitchClips;
