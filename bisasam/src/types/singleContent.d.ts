declare module "SingleContent" {
  export interface User {
    __typename: string;
    name: string;
    displayName: string;
    image: string;
  }

  export interface Hashtags {
    id?: string;
    text: string;
  }

  export interface GetSingleUserContent {
    __typename: string;
    id: string;
    content_text: string;
    userId: string;
    image_id?: string;
    created_at: Date;
    numLikes?: number;
    numComments?: number;
    gif_url?: string;
    tags?: Hashtags | null;
    user: User;
  }

  export interface SingleContentProps {
    data: GetSingleUserContent;
  }
}
