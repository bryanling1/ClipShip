import { Clip } from '../models/project';
import { https } from 'follow-redirects';
import Ffmpeg from '../classes/ffmpeg';
import fs from 'fs';

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
        https.get(downloadUrl, (response) => {
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

  public setFontFile(file: string) {
    this.fontFile = file;
  }

  public async clipsToVideo(): Promise<any> {
    await this.download();
    await this.ffmpeg.resizeDir(this.dir, 1920, 1080);
    this.ffmpeg.setAttrs({ fontFile: this.fontFile });
    const trims = this.clips.map((clip) => ({
      start: clip.duration !== clip.end - clip.start ? clip.start : null,
      end: clip.duration !== clip.end - clip.start ? clip.end : null,
    }));
    await this.ffmpeg.trimDir(this.dir, trims);
    await this.ffmpeg.addTextDir(
      this.dir,
      this.clips.map((clip, i) => ({
        content: clip.label || clip.labelGlobal ? clip.broadcaster : null,
        position: clip.labelGlobal
          ? clip.labelGlobalPosition
            ? clip.labelGlobalPosition
            : 0
          : clip.labelPosition
          ? clip.labelPosition
          : 0,
      }))
    );
    return this.ffmpeg.concatDir(this.dir, this.dir, 'output.mp4');
  }
}

export default TwitchClips;
