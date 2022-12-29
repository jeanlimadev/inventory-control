interface IDateProvider {
  convertToUTC(date: string): string;
  changeHourAndConvertToUTC(date: string): string;
  dateTodayFormatAndAddDays(numberOfDays: number): string;
  addDays(days: number): Date;
}
