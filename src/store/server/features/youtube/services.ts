import ApiClient from '../../common/common';

const getPlaylist = async (): Promise<YoutubePlaylistResponse> => {
  const response = await ApiClient.get('/playlist');
  return response.data;
};

const getPlaylistItem = async (
  playlistId: string
): Promise<YoutubePlaylistItemResponse> => {
  // return ApiClient.get(`/playlist/${playlistId}`);
  const response = await ApiClient.get(`/playlist/${playlistId}`);
  return response.data;
};

export { getPlaylist, getPlaylistItem };
