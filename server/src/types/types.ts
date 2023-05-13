export type CodeToExecute = {
  language_id: string,
  source_code: string,
  stdin: string
}

export interface FrontendRecording {
  user: FirebaseUser;
  thumbnail_link: string;
  title: string;
  description?: string;
  language: string;
  recording_link: string;
}

export interface SavedRecording {
  recording_id: string;
  creator?: {
    picture: string;
  };
  creator_uid: string,
  thumbnail_link: string | null;
  title: string;
  description?: string | null;
  published: boolean;
  language: string;
  recording_link: string;
  full_link: string | null;
  iframe_link: string | null;
  created_at: string;
}

export interface FirebaseUser {
  name: string,
  picture: string,
  iss: string,
  aud: string,
  auth_time: number,
  user_id: string,
  sub: string,
  iat: number,
  exp: number,
  email: string,
  email_verified: boolean,
  uid: string
}