import moment from "moment";

export function convertToTimeFromNow(createdAt: Date): string{
  return moment(createdAt).fromNow();
};