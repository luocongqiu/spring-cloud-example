import {Injectable} from '@angular/core';
import {NgbDateStruct,  NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
const WEEKDAYS_SHORT = ['一', '二', '三', '四', '五', '六', '日'];
const MONTHS_SHORT = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const MONTHS_FULL = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

@Injectable()
export class IslamicCivilI18n extends NgbDatepickerI18n {


  getWeekdayShortName(weekday: number) {
    return WEEKDAYS_SHORT[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS_SHORT[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS_FULL[month - 1];
  }
}