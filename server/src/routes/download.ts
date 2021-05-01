import Project from '../models/project';
import TwichClips from '../classes/twitchClips';
import execSh from 'exec-sh';
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/download', async (req, res) => {
  const { clips, id } = req.body;
  if (clips.length > 0) {
    const project = await Project.getProject(id as string);
    const dir = path.join(__dirname, `../temps/clips-${id}/`);
    if (fs.existsSync(dir)) {
      res.sendStatus(400);
      return;
    }
    if (project.clips) {
      fs.mkdirSync(dir);
      const twitchClips = new TwichClips(project.clips, dir, 'src/styles/fonts/oswald.ttf');
      const outPath = await twitchClips.clipsToVideo();
      res.download(outPath, function () {
        execSh(`rm -rf ${dir}`);
      });
    } else {
      res.sendStatus(400);
    }
  }
  res.sendStatus(200);
});

export { router as downloadsRouter };
