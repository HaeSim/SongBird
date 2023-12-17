// pages/api/audio/[videoId].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

declare module 'ytdl-core' {
  export interface VideoDetails {
    thumbnail: {
      thumbnails: thumbnail[];
    };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const videoId = req.query.videoId as string;
    const id = (videoId || '').replace(/[^A-Za-z0-9_-]/g, '');

    const info = await ytdl.getInfo(id);

    const audioFormats: Record<string, string> = {};
    info.formats
      .filter((file) => file.mimeType && file.mimeType.startsWith('audio'))
      .forEach((file) => {
        if (file.mimeType) {
          const mimeTypeKey = file.mimeType.split(';')[0] as string;
          audioFormats[mimeTypeKey] = file.url;
        }
      });

    const response = {
      url: ytdl.chooseFormat(info.formats, { filter: 'audioonly' }).url,
      formats: audioFormats,
      author: info.videoDetails.author.name,
      title: info.videoDetails.title,
      description: info.videoDetails.description,
      images: info.player_response.videoDetails.thumbnail.thumbnails,
    };

    res.status(200).json(response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch audio information' });
  }
}
