export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/** GET POST */
export interface ParamsGetPost {
  id: number;
}

export interface RequestGetPost {
  id: number;
}

export type ResponseGetPost = Post;

/** GET POST */

/** GET POSTS */
export interface ParamsGetPosts {}

export interface RequestGetPosts {
  id: number;
}
export type ResponseGetPosts = Post[];
/** GET POSTS */

/** ADD POST  */
export interface ParamsAddPost {
  userId: number;
  title: string;
  body: string;
}

export interface RequestAddPost {
  userId: number;
  title: string;
  body: string;
}

export interface ResponseAddPost {
  data: Post;
}
/** ADD POST  */
