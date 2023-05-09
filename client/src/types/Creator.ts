export interface Creator {
  uid: string;
  username: string;
  email: string;
  join_date: string;
  recordings: Recording[];
}

export interface Recording {
  recording_id: number;
  creator: Creator;
  creator_uid: string;
  thumbnail_link: string;
  header: string;
  description: string;
  public: string;
  language: string;
  recorder_actions: RecorderAction[];
  audio_link: string;
}
