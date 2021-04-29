import Project from '../models/project';
import TwichClips from '../classes/twitchClips';
import execSh from 'exec-sh';
import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.post('/download', async (req, res) => {
  const { id } = req.body;
  if (id) {
    const project = await Project.getProject(id);
    const dir = path.join(__dirname, `../temps/test/`);
    if (fs.existsSync(dir)) {
      res.sendStatus(400);
      return;
    }
    if (project.clips) {
      const twitchClips = new TwichClips(project.clips, dir, 'src/styles/fonts/oswald.ttf');
      const outPath = await twitchClips.clipsToVideo();
      res.download(outPath, function () {
        execSh(`rm -rf ${dir}`);
      });
    } else {
      res.sendStatus(400);
    }
  }
});

export { router as downloadsRouter };
