import { Clip } from '@clipship/common';
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
  public async getClipsByGame(search: string, limit: number, start: number, end: number) {
    const headers = {
      'Client-ID': this.clientId,
      Authorization: 'Bearer ' + this.token,
    };

    const response_gameId = await axios.get(
      `https://api.twitch.tv/helix/games?name=${encodeURI(search)}`,
      { headers }
    );

    if (!response_gameId.data || !response_gameId.data.data[0]) {
      return [];
    }

    let date1 = new Date();
    let date2 = new Date();
    if (start) {
      date1 = new Date(start);
    }
    if (end) {
      date2 = new Date(end);
    } else {
      date2.setDate(date1.getDate() - 1);
    }

    const params = {
      started_at: date2.toISOString(),
      ended_at: date1.toISOString(),
      game_id: response_gameId?.data.data[0].id,
      first: limit,
    };

    const response = await axios.get('https://api.twitch.tv/helix/clips', { headers, params });
    if (response?.data) {
      const out: Clip[] = [];
      for (const clip of response.data.data) {
        out.push({
          id: clip.tracking_id,
          url: clip.embed_url,
          start: 0,
          end: clip.duration,
          duration: clip.duration,
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

  public async getClipsByChannel(search: string, limit: number, start: number, end: number) {
    const headers = {
      'Client-ID': this.clientId,
      Authorization: 'Bearer ' + this.token,
    };

    const response_broadcasterId = await axios.get(
      `https://api.twitch.tv/helix/users?login=${encodeURI(search)}`,
      { headers }
    );

    if (!response_broadcasterId.data || !response_broadcasterId.data.data[0]) {
      return [];
    }

    let date1 = new Date();
    let date2 = new Date();
    if (start) {
      date1 = new Date(start);
    }
    if (end) {
      date2 = new Date(end);
    } else {
      date2.setDate(date1.getDate() - 1);
    }

    const params = {
      started_at: date2.toISOString(),
      ended_at: date1.toISOString(),
      broadcaster_id: response_broadcasterId?.data.data[0].id,
      first: limit,
    };

    const response = await axios.get('https://api.twitch.tv/helix/clips', { headers, params });
    if (response?.data) {
      const out: Clip[] = [];
      for (const clip of response.data.data) {
        out.push({
          id: clip.tracking_id,
          url: clip.embed_url,
          start: 0,
          end: clip.duration,
          duration: clip.duration,
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
