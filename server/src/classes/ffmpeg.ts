import execSh from 'exec-sh';
import execa from 'execa';
import fs from 'fs';
import path from 'path';

const execShpromise = execSh.promise;
export enum TextPosition {
  LEFT_TOP,
  CENTER_TOP,
  RIGHT_TOP,
  LEFT_BOTTOM,
  CENTER_BOTTOM,
  RIGHT_BOTTOM,
}

interface FfmpegAttrs {
  fontFile?: string;
  fontColor?: string;
  fontSize?: number;
  fontOutlineWidth?: number;
  fontOutlineColor?: string;
  fontPosition?: TextPosition;
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
  private fontPosition: TextPosition;
  private fontPadding: number;

  constructor() {
    this.fontFile = '';
    this.fontColor = 'white';
    this.fontSize = 100;
    this.fontOutlineWidth = 10;
    this.fontOutlineColor = 'black';
    this.fontPosition = TextPosition.LEFT_TOP;
    this.fontPadding = 20;
  }

  public async resizeDir(dir: string, width: number, height: number) {
    //get files in dir;
    const TEMP_FILE_STRING = '_123467365253124134';
    const tempFiles: string[] = [];
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const temp_file_name =
        path.basename(file).split('.').slice(0, -1).join('.') +
        TEMP_FILE_STRING +
        path.extname(file);
      const temp_file = path.join(path.dirname(file), temp_file_name);
      tempFiles.push(temp_file);
      const COMMAND = `ffmpeg -i ${file} -vf scale=${width}:${height} -vcodec libx264 -crf 25 ${temp_file}`;
      promises.push(async () => {
        await execShpromise(COMMAND);
      });
    }
    await promises.reduce((p, fn) => p.then(fn), Promise.resolve());
    //delete the original files
    const promises_delete: Promise<any>[] = [];
    for (const file of tempFiles.map((file) => file.replace(TEMP_FILE_STRING, ''))) {
      promises.push(execShpromise(`rm -f ${file}`));
    }
    await Promise.all(promises_delete);
    //rename all the temp files
    const promises_rename: Promise<any>[] = [];
    for (let i = 0; i < tempFiles.length; i++) {
      promises_rename.push(
        execShpromise(`mv ${tempFiles[i]} ${tempFiles[i].replace(TEMP_FILE_STRING, '')}`)
      );
    }
    return Promise.all(promises_rename);
  }
  public async concatDir(dir: string, out_dir: string, filename: string): Promise<string> {
    //get files in dir;
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
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
    const tempFiles: string[] = [];
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
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
        tempFiles.push(temp_file);
        const COMMAND = `ffmpeg -ss ${trim.start} -t ${
          trim.end - trim.start
        } -i ${file} -c copy ${temp_file}`;
        console.log(COMMAND);
        promises.push(async () => {
          await execShpromise(COMMAND);
        });
      }
    }
    await promises.reduce((p, fn) => p.then(fn), Promise.resolve());
    //delete the original files
    const promises_delete: Promise<any>[] = [];
    for (const file of tempFiles.map((file) => file.replace(TEMP_FILE_STRING, ''))) {
      promises.push(execShpromise(`rm -f ${file}`));
    }
    await Promise.all(promises_delete);
    //rename all the temp files
    const promises_rename: Promise<any>[] = [];
    for (let i = 0; i < tempFiles.length; i++) {
      promises_rename.push(
        execShpromise(`mv ${tempFiles[i]} ${tempFiles[i].replace(TEMP_FILE_STRING, '')}`)
      );
    }
    return Promise.all(promises_rename);
  }

  public async addTextDir(
    dir: string,
    text: { content: string | null; position: TextPosition }[]
  ): Promise<any> {
    const TEMP_FILE_STRING = '_123467365253124134';
    const tempFiles: string[] = [];
    let files = fs.readdirSync(dir);
    files = files.map((file) => path.resolve(`${dir}/${file}`));
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
      tempFiles.push(temp_file_dest);
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
      });
    }
    await promises.reduce((p, fn) => p.then(fn), Promise.resolve());
    //delete the original files
    const promises_delete: Promise<any>[] = [];
    for (const file of tempFiles.map((file) => file.replace(TEMP_FILE_STRING, ''))) {
      promises.push(execShpromise(`rm -f ${file}`));
    }
    await Promise.all(promises_delete);
    //rename all the temp files
    const promises_rename: Promise<any>[] = [];
    for (let i = 0; i < tempFiles.length; i++) {
      promises_rename.push(
        execShpromise(`mv ${tempFiles[i]}  ${tempFiles[i].replace(TEMP_FILE_STRING, '')}`)
      );
    }
    return Promise.all(promises_rename);
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

  private getFontPosition(position: TextPosition): string {
    switch (position) {
      case TextPosition.LEFT_TOP:
        return `x=${this.fontPadding}:y=${this.fontPadding}`;
      case TextPosition.CENTER_TOP:
        return `x=(w-text_w)/2:y=${this.fontPadding}`;
      case TextPosition.RIGHT_TOP:
        return `x=w-tw-${this.fontPadding}:y=${this.fontPadding}`;
      case TextPosition.LEFT_BOTTOM:
        return `x=${this.fontPadding}:y=h-th-${this.fontPadding}`;
      case TextPosition.CENTER_BOTTOM:
        return `x=(w-text_w)/2:y=h-th-${this.fontPadding}`;
      case TextPosition.RIGHT_BOTTOM:
        return `x=w-tw-${this.fontPadding}:y=h-th-${this.fontPadding}`;
      default:
        return `x=${this.fontPadding}:y=${this.fontPadding}`;
    }
  }
}

export default Ffmpeg;
