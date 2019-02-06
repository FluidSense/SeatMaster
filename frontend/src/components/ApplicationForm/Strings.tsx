interface IStringList {
  comments: string;
  keep_seat: string;
  needs: string;
  needs_text: string;
  partner: string;
  partner_name: string;
  room: string;
  [key: string]: string;
}
export const ACTION_NONE = 'ACTION_NONE';
export const ACTION_LIST: IStringList = {
  comments: 'COMMENTS_UPDATED',
  keep_seat: 'KEEP_SEAT_UPDATED',
  needs: 'NEEDS_UPDATED',
  needs_text: 'NEEDS_TEXT_UPDATED',
  partner: 'PARTNER_UPDATED',
  partner_name: 'PARTNER_NAME_UPDATED',
  room: 'ROOM_UPDATED',
};
