import { useQuery } from 'react-query';

import { getPlaylist, getPlaylistItem } from './services';

export const useGetPlaylistQuery = () => {
  return useQuery<Promise<YoutubePlaylistResponse>>(
    ['playlist'],
    () => getPlaylist(),
    {
      keepPreviousData: true,
    }
  );
};

export const useGetPlaylistItemQuery = (playlistId: string) => {
  return useQuery<YoutubePlaylistItemResponse>(
    ['playlist', playlistId],
    () => getPlaylistItem(playlistId),
    {
      keepPreviousData: true,
      enabled: !!playlistId,
    }
  );
};
