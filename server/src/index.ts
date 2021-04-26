import app from './app';
import mongoose from 'mongoose';
import twitch from './classes/twitch';

app.listen(5000, async () => {
  try {
    await mongoose.connect('mongodb://db:27017/clip-ship-projects', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    await twitch.getToken();
  } catch (err) {
    console.log(err);
  }

  console.log('Listening on port 5000');
});
