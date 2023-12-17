import { useQuery } from 'react-query';

import type { Audio } from '@/types/interfaces/youtube/ytdl';

import { getAudioSource, getPlaylist, getPlaylistItem } from './services';

export const useGetAudioSourceQuery = (videoId: string) => {
  return useQuery<Audio>(['audio', videoId], () => getAudioSource(videoId), {
    enabled: false,
  });
};

export const useGetPlaylistQuery = () => {
  return useQuery<YoutubePlaylistResponse>(['playlist'], () => getPlaylist(), {
    keepPreviousData: true,
  });
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
