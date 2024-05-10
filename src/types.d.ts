interface IBookPhotoPhoto {
  pk: number;
  file: string;
  description: string;
}

interface IBookList {
  pk: number;
  title: string;
  author: string;
  review_title: string;
  rating: number;
  is_owner: boolean;
  is_liked: boolean;
  is_liked_count: number;
  is_public: boolean;
  photos: IBookPhotoPhoto[];
}

export interface IBookOwner {
  name: string;
  avatar: string;
  username: string;
}

export interface IBookDetail extends IBookList {
  id: number;
  is_owner: boolean;
  is_liked: boolean;
  is_liked_count: number;
  created_at: string;
  updated_at: string;
  review_title: string;
  title: string;
  author: string;
  publisher: string;
  content: string;
  summary: string;
  is_public: boolean;
  rating: number;
  user: IBookOwner;
  photos: IBookPhotoPhoto[];
}
