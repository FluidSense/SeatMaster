import { Moment } from 'moment';

export const timeFormatToBackend = 'YYYY-MM-DD HH:mm:ss.SSS';
export const timeFormatForLink = 'DD-MM-YYYY';
export const formatLink = (time: Moment) => time.format(timeFormatForLink);
