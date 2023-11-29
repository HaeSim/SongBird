import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import { useYoutube } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import useClientStore from '@/store/client';

import MusicPlayer from '../MusicPlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
}) => {
  const COLUMN_NAMES = ['No', 'Title', 'Channel', 'Published Date', 'Play'];

  const { openComponentModal } = useClientStore((state) => state);
  const { setVideo } = useYoutube();

  const handlePlayClick = (newVideoId: string) => {
    setVideo(newVideoId);
    openComponentModal(
      <MusicPlayer
        title={
          playlistItems.find(
            (item) => item.snippet.resourceId.videoId === newVideoId
          )?.snippet.title ?? ''
        }
      />
    );
  };

  return (
    <Grid item xs={9} sx={{ width: '100%' }}>
      <Paper style={{ height: '80vh', overflowY: 'auto' }}>
        {playlistItems && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {COLUMN_NAMES.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {playlistItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.snippet.title}</TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {item.snippet.videoOwnerChannelTitle}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {new Date(item.snippet.publishedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          handlePlayClick(item.snippet.resourceId.videoId)
                        }
                      >
                        <PlayArrowIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistItemContent;
