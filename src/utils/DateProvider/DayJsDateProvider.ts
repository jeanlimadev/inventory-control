import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { singleton } from "tsyringe";

dayjs.extend(utc);

@singleton()
class DayJsDateProvider implements IDateProvider {
  convertToUTC(date: string): string {
    const dateParsed = dayjs(date).utc().format().toString();

    return dateParsed;
  }
  changeHourAndConvertToUTC(date: string): string {
    const dateParsed = dayjs(date)
      .add(23.9999, "hours")
      .utc()
      .format()
      .toString();

    return dateParsed;
  }

  dateTodayFormatAndAddDays(numberOfDays: number = 0): string {
    const completeDate = dayjs()
      .add(numberOfDays, "days")
      .utc()
      .format()
      .toString();

    const formatedDate = completeDate.substring(0, 10);

    return formatedDate;
  }

  addDays(days: number): Date {
    return dayjs().add(days, "day").toDate();
  }
}

export { DayJsDateProvider };
