import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
dayjs.locale('en-gb');

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(isoWeek);

import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import advancedFormat from 'dayjs/plugin/advancedFormat';
dayjs.extend(advancedFormat);

import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

dayjs.prototype.toString = dayjs.prototype.format;

dayjs.prototype.toJSON = function(){
  return this.format();
}

const DayJS = dayjs;

export default DayJS;