import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get(
      'https://youtube.googleapis.com/youtube/v3/playlists',
      {
        params: {
          part: 'snippet,contentDetails',
          maxResults: 25,
          mine: true,
          key: process.env.YOUTUBE_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // eslint-disable-next-line no-console
      console.info('path: ', req.url);
      // eslint-disable-next-line no-console
      console.error(e?.response?.data);

      if (e?.response?.status === 401) {
        return res.status(401).json(e?.response?.data);
      }
    }
    return res.status(500).json({ error: 'Unable to fetch data' });
  }
}
