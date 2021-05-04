import Project from '../models/project';
import Twitch from '../classes/twitch';
import express from 'express';

const router = express.Router();

router.get('/getClips', async (req, res) => {
  const { search, limit, useGame, start, end } = req.query;
  if (search && limit && start !== undefined && end !== undefined && useGame !== undefined) {
    if (useGame === 'true') {
      const clips = await Twitch.getClipsByGame(
        search as string,
        parseInt(limit as string),
        parseInt(start as string),
        parseInt(end as string)
      );
      res.send(clips);
    } else {
      const clips = await Twitch.getClipsByChannel(
        search as string,
        parseInt(limit as string),
        parseInt(start as string),
        parseInt(end as string)
      );
      res.send(clips);
    }
  } else {
    res.sendStatus(400);
  }
});

export { router as twitchRouter };
