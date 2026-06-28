
import path  from 'path';
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(import.meta.dirname, '..', '.env') });
import { google } from "googleapis";

export const oauth2client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
 
);

