import { Clip } from '../models/project';
import axios from 'axios';

class Twitch {
  public token: string;
  constructor(private clientId: string | undefined, private clientSecret: string | undefined) {
    this.token = '';
  }

  public async getToken() {
    const response = await axios.post(
      `https://id.twitch.tv/oauth2/token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`
    );
    this.token = response.data.access_token;
  }
  public async getClipsByGame(game: string, limit: number, days: number) {
    const headers = {
      'Client-ID': this.clientId,
      Authorization: 'Bearer ' + this.token,
    };

    const response_gameId = await axios.get(
      `https://api.twitch.tv/helix/games?name=${encodeURI(game)}`,
      { headers }
    );

    if (!response_gameId.data) {
      return [];
    }

    const date1 = new Date();
    const date2 = new Date();
    date2.setDate(date1.getDate() - days);

    const params = {
      started_at: date2.toISOString(),
      ended_at: date1.toISOString(),
      game_id: response_gameId.data.data[0].id,
      first: limit,
    };

    const response = await axios.get('https://api.twitch.tv/helix/clips', { headers, params });

    if (response.data) {
      const out: Clip[] = [];
      for (const clip of response.data.data) {
        out.push({
          url: clip.embed_url,
          start: 0,
          end: clip.duration,
          length: clip.duation,
          label: false,
          labelContent: null,
          labelPosition: null,
          labelGlobalPosition: null,
          labelGlobal: false,
          thumbnailUrl: clip.thumbnail_url,
          title: clip.title,
          broadcaster: clip.broadcaster_name,
        });
      }
      return out;
    } else {
      return [];
    }
  }
}

export default new Twitch(process.env.CLIENT_ID, process.env.CLIENT_SECTRET);
