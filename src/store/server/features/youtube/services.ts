import type { Audio } from '@/types/interfaces/youtube/ytdl';

import ApiClient from '../../common/common';

const getAudioSource = async (videoId: string): Promise<Audio> => {
  const response = await ApiClient.get(`/audio/${videoId}`);
  return response.data;
};

const getPlaylist = async (): Promise<YoutubePlaylistResponse> => {
  const response = await ApiClient.get('/playlist/my');
  return response.data;
};

const getPlaylistItem = async (
  playlistId: string
): Promise<YoutubePlaylistItemResponse> => {
  const response = await ApiClient.get(`/playlist/${playlistId}`);
  return response.data;
};

export { getAudioSource, getPlaylist, getPlaylistItem };
