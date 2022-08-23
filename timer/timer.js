import moment from 'moment';
import 'moment-timezone';
moment.locale('ja');

const DATE_TIME_SECONDS_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_TIME_T_MINUTES_FORMAT = 'YYYY-MM-DDTHH:mm';
const TIME_SECONDS_FORMAT = 'HH:mm';
const JAPAN_TIME_ZONE = 'Asia/Tokyo';
const DAY_SECONDS = 24 * 60 * 60;

const momentJP = (time, format = DATE_TIME_SECONDS_FORMAT) => {
  const timeMoment = time
    ? moment(time, format)
    : moment();
  const timeMomentByFormat = timeMoment.tz(JAPAN_TIME_ZONE)
    .format(DATE_TIME_SECONDS_FORMAT);

  return moment(timeMomentByFormat, DATE_TIME_SECONDS_FORMAT);
}

const getTimerBySeconds = (secondsInput) => {
  let result = '';
  let secNum = parseInt(secondsInput, 10);
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - (hours * 3600)) / 60);
  let seconds = secNum - (hours * 3600) - (minutes * 60);

  if (hours > 0) {
    result += hours < 10 ? `0${hours}:` : `${hours}:`;
  }
  result += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  result += seconds < 10 ? `0${seconds}` : seconds;

  return result;
};
