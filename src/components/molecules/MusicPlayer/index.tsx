import Forward10Icon from '@mui/icons-material/Forward10';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Replay10Icon from '@mui/icons-material/Replay10';
import {
  Box,
  CircularProgress,
  IconButton,
  Slider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

import { PlayerStates } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import theme from '@/styles/theme';
import { formatTime } from '@/utils/common';

interface IMusicPlayerProps {
  title: string;
  videoId: string;
}

const MusicPlayer: React.FC<IMusicPlayerProps> = ({ title, videoId }) => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  const [status, setStatus] = useState<PlayerStates | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const pause = () => {
    player?.pauseVideo();
  };

  const play = () => {
    player?.playVideo();
  };

  const seekTo = (seconds: number) => {
    player?.seekTo(seconds, true);
    setCurrentTime(seconds);
  };

  const handleOnReady = (event: any) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  const handleStateChange = (event: any) => {
    const newPlayerState = event.data;
    setStatus(newPlayerState);
    switch (newPlayerState) {
      case PlayerStates?.PLAYING:
        console.log('PLAYING');
        break;
      case PlayerStates?.PAUSED:
        console.log('PAUSED');
        break;
      case PlayerStates?.ENDED:
        console.log('ENDED');
        break;
      case PlayerStates?.BUFFERING:
        console.log('BUFFERING');
        break;
      case PlayerStates?.UNSTARTED:
        console.log('UNSTARTED');
        break;
      case PlayerStates?.VIDEO_CUED:
        console.log('VIDEO_CUED');
        break;
      default:
        break;
    }
  };

  const handleOnplay = async (event: any) => {
    const newDuration = await event.target.getDuration();
    setDuration(newDuration);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (status === PlayerStates?.PLAYING) {
      interval = setInterval(() => {
        setCurrentTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [status]);

  useEffect(() => {
    const updateCurrentTime = async () => {
      const newCurrentTime = await player?.getCurrentTime();
      setCurrentTime(newCurrentTime as number);
    };

    if (player) {
      updateCurrentTime();
    }
  }, [player]);

  return (
    <Box
      sx={{
        minWidth: 300,
      }}
    >
      <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <YouTube
            style={{
              display: 'none',
              width: useMediaQuery(theme.breakpoints.down('sm'))
                ? '60px'
                : '0%',
              height: useMediaQuery(theme.breakpoints.down('sm'))
                ? '60px'
                : '0%',
              zIndex: 3,
            }}
            videoId={videoId}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                disablekb: 1,
                controls: 0,
                rel: 0,
              },
            }}
            onReady={handleOnReady}
            onStateChange={handleStateChange}
            onPlay={handleOnplay}
          />
          {player === undefined ? (
            <CircularProgress color="inherit" />
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                width: '100%',
              }}
            >
              <IconButton onClick={() => seekTo(currentTime - 10)}>
                <Replay10Icon />
              </IconButton>
              <IconButton
                onClick={status === PlayerStates?.PLAYING ? pause : play}
              >
                {status === PlayerStates?.PLAYING ? (
                  <PauseIcon />
                ) : (
                  <PlayArrowIcon />
                )}
              </IconButton>
              <IconButton onClick={() => seekTo(currentTime + 10)}>
                <Forward10Icon />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography>{formatTime(currentTime)}</Typography>
            <Typography>{formatTime(duration)}</Typography>
          </Box>
          <Slider
            value={currentTime}
            max={duration}
            onChange={(_, value) => seekTo(value as number)}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => formatTime(value as number)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MusicPlayer;
