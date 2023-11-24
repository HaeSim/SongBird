import { useQuery } from 'react-query';

import type {
  ParamsGetPost,
  ParamsGetPosts,
  Post,
} from '../../../../types/interfaces/post';
import { getPost, getPosts } from './services';

export const useGetPostQuery = (
  params: ParamsGetPost,
  select?: (data: Post) => Post
) => {
  const { id } = params;
  return useQuery<Post>(['post', params], () => getPost(id), {
    select,
    keepPreviousData: true,
  });
};

export const useGetPostsQuery = (
  params: ParamsGetPosts,
  select?: (data: Post[]) => Post[]
) => {
  return useQuery<Post[]>(['posts', params], () => getPosts(), {
    select,
    keepPreviousData: true,
  });
};
