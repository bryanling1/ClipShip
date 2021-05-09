import { LabelPosition } from '@clipship/common';
import execSh from 'exec-sh';
import execa from 'execa';
import fs from 'fs';
import path from 'path';

const execShpromise = execSh.promise;

interface FfmpegAttrs {
  fontFile?: string;
  fontColor?: string;
  fontSize?: number;
  fontOutlineWidth?: number;
  fontOutlineColor?: string;
  fontPosition?: LabelPosition;
  fontPadding?: number;
}

export interface TimelineText {
  start: number;
  end: number;
  text: string;
}

class Ffmpeg {
  private fontFile: string;
  private fontColor: string;
  private fontSize: number;
  private fontOutlineWidth: number;
  private fontOutlineColor: string;
  private fontPosition: LabelPosition;
  private fontPadding: number;

  constructor() {
    this.fontFile = '';
    this.fontColor = 'white';
    this.fontSize = 100;
    this.fontOutlineWidth = 10;
    this.fontOutlineColor = 'black';
    this.fontPosition = LabelPosition.LEFT_TOP;
    this.fontPadding = 20;
  }

  private dirComparator(a: string, b: string): number {
    const expressionA = /\/?([0123456789]+)\.mp4/g;
    const expressionB = /\/?([0123456789]+)\.mp4/g;
    const numberStringA = expressionA.exec(a);
    const numberStringB = expressionB.exec(b);
    if (numberStringA !== null && numberStringB != null) {
      const numberA = parseInt(numberStringA[1]);
      const numberB = parseInt(numberStringB[1]);

      if (numberA === numberB) {
        return 0;
      } else if (numberA < numberB) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }

  public async resizeDir(dir: string, width: number, height: number) {
    //get files in dir;
    const TEMP_FILE_STRING = '_123467365253124134';
    let files = fs.readdirSync(dir).sort();
    files = files.map((file) => path.resolve(`${dir}/${file}`));
    files.sort(this.dirComparator);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const temp_file_name =
        path.basename(file).split('.').slice(0, -1).join('.') +
        TEMP_FILE_STRING +
        path.extname(file);
      const temp_file = path.join(path.dirname(file), temp_file_name);
      const COMMAND = `ffmpeg -i ${file} -vf scale=${width}:${height} -vcodec libx264 -acodec copy -async 1 -crf 25 ${temp_file}`;
      promises.push(async () => {
        await execShpromise(COMMAND);
        await execShpromise(`rm -f ${file}`);
        await execShpromise(`mv ${temp_file} ${temp_file.replace(TEMP_FILE_STRING, '')}`);
      });
    }
    return promises.reduce((p, fn) => p.then(fn), Promise.resolve());
  }
  public async concatDir(
    dir: string,
    out_dir: string,
    filename: string,
    outro_dir?: string
  ): Promise<string> {
    //get files in dir;
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
    files.sort(this.dirComparator);
    if (outro_dir) {
      let outro_files = fs.readdirSync(outro_dir);
      outro_files = outro_files.map((file) => path.resolve(`${outro_dir}/${file}`));
      outro_files.sort(this.dirComparator);
      files.push(...outro_files);
    }
    const files_str = files.map((file) => `-i ${file}`).join(' ');
    const filter_str_1 = files
      .map((file, index) => `[${index}:v]scale=1920:1080:force_original_aspect_ratio=1[v${index}];`)
      .join('');
    const filter_str_2 = files.map((file, index) => `[v${index}][${index}:a]`).join('');
    const outPath = path.join(out_dir, filename);
    await execShpromise(
      `ffmpeg ${files_str} -filter_complex '${filter_str_1}${filter_str_2}concat=n=${files.length}:v=1:a=1[v][a]' -map '[v]' -map '[a]' ${outPath}`
    );
    return outPath;
  }

  public async trimDir(
    dir: string,
    trims: { start: number | null; end: number | null }[]
  ): Promise<any> {
    //get files in dir;
    const TEMP_FILE_STRING = '_123467365253124134';
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
    files.sort(this.dirComparator);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const trim = trims[i];
      if (trim.start !== null && trim.end !== null) {
        const temp_file_name =
          path.basename(file).split('.').slice(0, -1).join('.') +
          TEMP_FILE_STRING +
          path.extname(file);
        const temp_file = path.join(path.dirname(file), temp_file_name);
        const COMMAND = `ffmpeg -ss ${trim.start} -i ${file} -t ${
          trim.end - trim.start
        } -c copy -acodec copy -async 1 ${temp_file} `;
        promises.push(async () => {
          await execShpromise(COMMAND);
          await execShpromise(`rm -f ${file}`);
          await execShpromise(`mv ${temp_file} ${temp_file.replace(TEMP_FILE_STRING, '')}`);
        });
      }
    }
    return promises.reduce((p, fn) => p.then(fn), Promise.resolve());
  }

  public async addTextDir(
    dir: string,
    text: { content: string | null; position: LabelPosition }[]
  ): Promise<any> {
    const TEMP_FILE_STRING = '_123467365253124134';
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
    files.sort(this.dirComparator);
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = text[i].content;
      if (!content) {
        continue;
      }
      const temp_file_name =
        path.basename(file).split('.').slice(0, -1).join('.') +
        TEMP_FILE_STRING +
        path.extname(file);
      const temp_file_dest = path.join(dir, temp_file_name);
      const textCommand = `fontfile=${this.fontFile}:text=\'${content}\':fontcolor=${
        this.fontColor
      }:fontsize=${this.fontSize}:bordercolor=${this.fontOutlineColor}:borderw=${
        this.fontOutlineWidth
      }:${this.getFontPosition(text[i].position)}`;
      const args: string[] = [
        '-i',
        file,
        '-safe',
        `0`,
        '-vf',
        `drawtext=\'${textCommand}\'`,
        '-c:a',
        'copy',
        temp_file_dest,
      ];
      promises.push(async () => {
        await execa('ffmpeg', args).catch((err) => console.log(err));
        await execShpromise(`rm -f ${file}`);
        await execShpromise(
          `mv ${temp_file_dest}  ${temp_file_dest.replace(TEMP_FILE_STRING, '')}`
        );
      });
    }
    return promises.reduce((p, fn) => p.then(fn), Promise.resolve());
  }

  public setAttrs(attrs: FfmpegAttrs) {
    this.fontFile = attrs.fontFile ? attrs.fontFile : this.fontFile;
    this.fontColor = attrs.fontColor ? attrs.fontColor : this.fontColor;
    this.fontSize = attrs.fontSize ? attrs.fontSize : this.fontSize;
    this.fontOutlineWidth = attrs.fontOutlineWidth ? attrs.fontOutlineWidth : this.fontOutlineWidth;
    this.fontOutlineColor = attrs.fontOutlineColor ? attrs.fontOutlineColor : this.fontOutlineColor;
    this.fontPosition = attrs.fontPosition ? attrs.fontPosition : this.fontPosition;
    this.fontPadding = attrs.fontPadding ? attrs.fontPadding : this.fontPadding;
  }

  private getFontPosition(position: LabelPosition): string {
    switch (position) {
      case LabelPosition.LEFT_TOP:
        return `x=${this.fontPadding}:y=${this.fontPadding}`;
      case LabelPosition.CENTER_TOP:
        return `x=(w-text_w)/2:y=${this.fontPadding}`;
      case LabelPosition.RIGHT_TOP:
        return `x=w-tw-${this.fontPadding}:y=${this.fontPadding}`;
      case LabelPosition.LEFT_BOTTOM:
        return `x=${this.fontPadding}:y=h-th-${this.fontPadding}`;
      case LabelPosition.CENTER_BOTTOM:
        return `x=(w-text_w)/2:y=h-th-${this.fontPadding}`;
      case LabelPosition.RIGHT_BOTTOM:
        return `x=w-tw-${this.fontPadding}:y=h-th-${this.fontPadding}`;
      default:
        return `x=${this.fontPadding}:y=${this.fontPadding}`;
    }
  }
}

export default Ffmpeg;
