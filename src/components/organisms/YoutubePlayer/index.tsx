import Forward10Icon from '@mui/icons-material/Forward10';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Replay10Icon from '@mui/icons-material/Replay10';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

import { formatTime } from '@/utils/common';

interface IYoutubePlayerProps {
  videoId: string;
  controller?: boolean;
}

const YoutubePlayer: React.FC<IYoutubePlayerProps> = ({
  videoId,
  controller = true,
}) => {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handlePlayerStateChange = (event: any) => {
    const newPlayerState = event.data;
    if (newPlayerState === 1) {
      // Playing
      setIsPlaying(true);
    } else {
      // Paused
      setIsPlaying(false);
    }
  };

  const handlePlayerReady = (event: any) => {
    const newDuration = event.target.getDuration();
    setDuration(newDuration);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      player?.pauseVideo();
    } else {
      player?.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFastForward = () => {
    const newTime = currentTime + 10; // Forward by 10 seconds
    if (newTime > duration) {
      player?.seekTo(duration, true);
      setCurrentTime(duration);
      return;
    }
    player?.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleFastRewind = () => {
    const newTime = currentTime - 10; // Rewind by 10 seconds
    if (newTime < 0) {
      player?.seekTo(0, true);
      setCurrentTime(0);
      return;
    }
    player?.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const newTime = typeof newValue === 'number' ? newValue : newValue[0];
    if (newTime === undefined) return;
    player?.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(async () => {
        const newTime = await player?.getCurrentTime();
        setCurrentTime(newTime ?? 0);
      }, 1000);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [isPlaying]);

  return (
    <>
      <YouTube
        style={{
          display: 'none',
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
      {controller && (
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
            <IconButton onClick={handleFastRewind}>
              <Replay10Icon />
            </IconButton>
            <IconButton onClick={handlePlayPause}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <IconButton onClick={handleFastForward}>
              <Forward10Icon />
            </IconButton>
          </Box>

          <Box sx={{ width: '100%' }}>
            <Typography>{formatTime(currentTime)}</Typography>
            <Slider
              value={currentTime}
              max={duration}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => formatTime(value as number)}
            />
            <Typography>{formatTime(duration)}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default YoutubePlayer;
