// YoutubeProvider.tsx
import { useMediaQuery } from '@mui/material';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

import theme from '@/styles/theme';

export enum PlayerStates {
  BUFFERING = 3,
  ENDED = 0,
  PAUSED = 2,
  PLAYING = 1,
  UNSTARTED = -1,
  VIDEO_CUED = 5,
}

// Create a YoutubeContext
interface IYoutubeContext {
  play: () => void;
  pause: () => void;
  seekTo: (seconds: number) => void;
  setVideo: (newVideoId?: string) => void;
  player: YouTubePlayer | undefined;
  status: PlayerStates;
  videoId?: string;
  currentTime: number;
  duration: number;
  VideoComponent: React.ReactNode;
}

const YoutubeContext = createContext<IYoutubeContext | undefined>(undefined);

// Create a custom hook to use the YoutubeContext
export const useYoutube = () => {
  const context = useContext(YoutubeContext);
  if (!context) {
    throw new Error('useYoutube must be used within a YoutubeProvider');
  }
  return context;
};

// Create a YoutubeProvider to wrap your app and provide the YoutubeContext
interface IYoutubeProviderProps {
  children: React.ReactNode;
}
export const YoutubeProvider = ({ children }: IYoutubeProviderProps) => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  const [playerState, setPlayerState] = useState<PlayerStates>(-1);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [videoId, setVideoId] = useState<string | undefined>(undefined);

  const handlePlayerStateChange = (event: any) => {
    const newPlayerState = event.data;
    setPlayerState(newPlayerState);
  };

  const handlePlayerReady = (event: any) => {
    const newDuration = event.target.getDuration();
    setDuration(newDuration);
  };

  const play = () => {
    if (player) {
      player.playVideo();
    }
  };

  const pause = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const seekTo = (seconds: number) => {
    if (player) {
      setCurrentTime(seconds);
      player.seekTo(seconds, true);
    }
  };

  const setVideo = (newVideoId?: string) => {
    setVideoId(newVideoId);
  };

  const VideoComponent = (
    <YouTube
      style={{
        display: useMediaQuery(theme.breakpoints.down('sm')) ? 'block' : 'none',
        position: 'fixed',
        width: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
        height: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
        zIndex: 3,
      }}
      videoId={videoId}
      opts={{
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
        },
      }}
      onReady={(event) => setPlayer(event.target)}
      onStateChange={handlePlayerStateChange}
      onPlay={handlePlayerReady}
    />
  );

  const contextValue: IYoutubeContext = useMemo(() => {
    return {
      play,
      pause,
      seekTo,
      setVideo,
      player,
      status: playerState,
      videoId,
      currentTime,
      duration,
      VideoComponent,
    };
  }, [playerState, videoId, currentTime, duration]);

  useEffect(() => {
    if (playerState === PlayerStates.PLAYING) {
      const interval = setInterval(async () => {
        try {
          const newTime = await player?.getCurrentTime();
          setCurrentTime(newTime ?? 0);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching current time:', error);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [playerState]);

  useEffect(() => {
    if (!videoId) {
      setCurrentTime(0);
      setDuration(0);
    }
  }, [videoId]);

  return (
    <YoutubeContext.Provider value={contextValue}>
      {children}
      {useMediaQuery(theme.breakpoints.down('sm')) ? null : VideoComponent}
    </YoutubeContext.Provider>
  );
};
