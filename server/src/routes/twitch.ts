import Project from '../models/project';
import Twitch from '../classes/twitch';
import express from 'express';

const router = express.Router();

router.get('/getClips', async (req, res) => {
  const { game, limit } = req.query;
  if (game && limit) {
    const clips = await Twitch.getClipsByGame(game as string, parseInt(limit as string), 1);
    res.send(clips);
  } else {
    res.sendStatus(400);
  }
});

export { router as twitchRouter };
