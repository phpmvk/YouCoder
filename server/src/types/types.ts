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
  duration: number;
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
