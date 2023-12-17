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
} from '@mui/material';
import { useEffect, useRef } from 'react';

import useAudioControls from '@/hooks/useAudioControls';
import useAudioSource from '@/hooks/useAudioSource';
import { formatTime } from '@/utils/common';

interface IMusicPlayerProps {
  title: string;
  videoId: string;
}

const MusicPlayer: React.FC<IMusicPlayerProps> = ({ title, videoId }) => {
  const source = useAudioSource(videoId);
  const controls = useAudioControls({
    src: source.data.url,
    // eslint-disable-next-line no-console
    setError: (error: string) => console.log(error),
    // @TODO: add audio formats (video formats are not supported)
    // const audioFormats = Object.keys(audio.data.formats || {}).map((key) => ({
    //   mimeType: key,
    //   src: (audio.data.formats && audio.data.formats[key]) ?? '',
    // }));
    // formats: audioFormats,
  });
  const { state: sourceState } = source;
  const {
    controls: { play, pause, seek: seekTo },
    state: controlsState,
    element,
    elementNode,
  } = controls;

  const visualizationRef = useRef<HTMLCanvasElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  // eslint-disable-next-line consistent-return
  const visualizeData = () => {
    const animationController = window.requestAnimationFrame(visualizeData);
    if (element?.paused) {
      return cancelAnimationFrame(animationController);
    }
    const songData = new Uint8Array(140);

    if (!analyserRef.current) {
      // eslint-disable-next-line consistent-return
      return;
    }

    analyserRef.current.getByteFrequencyData(songData);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const bar_width = 3;
    let start = 0;

    if (!visualizationRef.current) {
      // eslint-disable-next-line consistent-return
      return;
    }

    const ctx = visualizationRef.current.getContext('2d');

    if (!ctx) {
      // eslint-disable-next-line consistent-return
      return;
    }

    ctx.clearRect(
      0,
      0,
      visualizationRef.current.width,
      visualizationRef.current.height
    );
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < songData.length; i++) {
      // compute x coordinate where we would draw
      start = i * 4;
      // create a gradient for the  whole canvas
      const gradient = ctx.createLinearGradient(
        0,
        0,
        visualizationRef.current.width,
        visualizationRef.current.height
      );
      gradient.addColorStop(0.2, '#2392f5');
      gradient.addColorStop(0.5, '#fe0095');
      gradient.addColorStop(1.0, 'purple');
      ctx.fillStyle = gradient;
      ctx.fillRect(
        start,
        visualizationRef.current.height,
        bar_width,
        -(songData[i] ?? 0)
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-useless-return
    if (!visualizationRef.current) return;

    if (!controlsState.paused) {
      const audioContext = new AudioContext();
      if (!sourceNodeRef.current) {
        sourceNodeRef.current = audioContext.createMediaElementSource(
          element as HTMLAudioElement
        );
        analyserRef.current = audioContext.createAnalyser();
        sourceNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioContext.destination);
      }
      visualizeData();
    }
  }, [controlsState.paused]);

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
        {/* Visualization Canvas */}
        <canvas
          ref={visualizationRef}
          width={300}
          height={100}
          style={{ marginTop: '16px' }}
        />
        {elementNode}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {sourceState === 'loading' ? (
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
              <IconButton onClick={() => seekTo(controlsState.time - 10)}>
                <Replay10Icon />
              </IconButton>
              <IconButton onClick={controlsState.paused ? play : pause}>
                {controlsState.paused ? <PlayArrowIcon /> : <PauseIcon />}
              </IconButton>
              <IconButton onClick={() => seekTo(controlsState.time + 10)}>
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
            <Typography>{formatTime(controlsState.time)}</Typography>
            <Typography>{formatTime(controlsState.duration)}</Typography>
          </Box>
          <Slider
            value={controlsState.time}
            max={controlsState.duration}
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
