import ApiClient from '../../common/common';

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

export { getPlaylist, getPlaylistItem };
