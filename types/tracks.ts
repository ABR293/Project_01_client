export interface IComment {
  _id: string;
  userName: string;
  text: string;
  likes: number;
  disLikes: number;
}

export type CreateComment = {
  userName: string;
  text: string;
  trackId: string;
};

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
}

export interface ITrackList {
  tracks: ITrack[];
}
