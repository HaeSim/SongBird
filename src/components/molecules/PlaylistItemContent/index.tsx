import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Dialog,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import YoutubePlayer from '@/components/organisms/YoutubePlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handlePlayClick = (videoId: string) => {
    setSelectedVideo(videoId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVideo(null);
  };

  return (
    <Grid item xs={9} sx={{ width: '100%' }}>
      <Paper style={{ height: '80vh', overflowY: 'auto' }}>
        {playlistItems && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Channel</TableCell>
                  <TableCell>Published Date</TableCell>
                  <TableCell>Play</TableCell>
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
                    <TableCell>{item.snippet.videoOwnerChannelTitle}</TableCell>
                    <TableCell>
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

      <Dialog open={openModal} onClose={handleCloseModal}>
        <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
          {
            playlistItems.find(
              (item) => item.snippet.resourceId.videoId === selectedVideo
            )?.snippet.title
          }
        </Typography>
        <YoutubePlayer videoId={selectedVideo || ''} controller={false} />
      </Dialog>
    </Grid>
  );
};

export default PlaylistItemContent;
