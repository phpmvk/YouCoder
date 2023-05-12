import { RecorderAction } from "./Editor";

export interface Creator {
  uid?: string;
  username?: string;
  email?: string;
  join_date: string;
  recordings?: Recording[];
  shortName?: string;
  display_name?: string;
  picture?: string;
}

export const rootUser: Creator = {
  shortName: '',
  uid: '',
  display_name: '',
  email: '',
  join_date: '',
  recordings: [],
};

export interface Recording {
  created_at: string;
  creator: { picture: string };
  creator_uid: string;
  description: string;
  full_link: string;
  iframe_link: string;
  language: string;
  published: boolean;
  recording_id: string;
  recording_link: string;
  thumbnail_link: string;
  title: string;
}

export interface updateRecording {
  title?: string;
  description?: string;
  published?: boolean;
  thumbnail_link?: string;
}
