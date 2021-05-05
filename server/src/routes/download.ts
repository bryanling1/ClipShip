import AdmZip from 'adm-zip';
import Project from '../models/project';
import TwichClips from '../classes/twitchClips';
import execSh from 'exec-sh';
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/download', async (req, res) => {
  const { clips, id, seperate } = req.body;
  if (clips.length > 0) {
    const dir = path.join(__dirname, `../temps/clips-${id}/`);
    if (fs.existsSync(dir)) {
      res.sendStatus(400);
      return;
    }
    fs.mkdirSync(dir);
    const twitchClips = new TwichClips(clips, dir, 'src/styles/fonts/oswald.ttf');
    const outPath = await twitchClips.clipsToVideo(seperate || false);
    if (seperate) {
      const zip = new AdmZip();
      let files = fs.readdirSync(outPath);
      files = files.map((file) => path.resolve(`${outPath}/${file}`));
      for (const file of files) {
        zip.addLocalFile(file);
      }
      const data = zip.toBuffer();
      res.write(data);
      res.end();
      execSh(`rm -rf ${dir}`);
    } else {
      res.download(path.resolve(outPath), function () {
        execSh(`rm -rf ${dir}`);
      });
    }
  } else {
    res.sendStatus(400);
  }
});

export { router as downloadsRouter };
