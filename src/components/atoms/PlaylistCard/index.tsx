// components/atoms/PlaylistCard.tsx
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface PlaylistCardProps {
  image: string;
  title: string;
  itemCount: number;
  channelTitle: string;
  publishedAt: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  image,
  title,
  itemCount,
  channelTitle,
  publishedAt,
}) => {
  return (
    <Card
      sx={{
        width: 275,
        height: 275,
      }}
    >
      <CardMedia
        component="img"
        alt="Playlist Thumbnail"
        height="168"
        image={image}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
          <Typography variant="caption" color="textSecondary">
            {' '}
            ({itemCount})
          </Typography>
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {channelTitle}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(publishedAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
