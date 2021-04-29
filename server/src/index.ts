import app from './app';
import mongoose from 'mongoose';
import twitch from './classes/twitch';

app.listen(5000, async () => {
  try {
    await mongoose.connect('mongodb://db:27017/clip-ship-projects', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    await twitch.getToken();
    // const result = await twitch.getClipsByGame('Pokémon Sword/Shield', 3, 1)
    // console.log(result);
    // "".split
  } catch (err) {
    console.log(err);
  }

  console.log('Listening on port 5000');
});
