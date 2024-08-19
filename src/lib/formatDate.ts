import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

const persianMonths: { [key: string]: string } = {
  Farvardin: "فروردین",
  Ordibehesht: "اردیبهشت",
  Khordad: "خرداد",
  Tir: "تیر",
  Mordaad: "مرداد",
  Shahrivar: "شهریور",
  Mehr: "مهر",
  Aban: "آبان",
  Azar: "آذر",
  Dey: "دی",
  Bahman: "بهمن",
  Esfand: "اسفند",
};

const formatDate = (dateString: string): string => {
  const date = dayjs(dateString).calendar("jalali");
  const day = date.format("D");
  const month = persianMonths[date.format("MMMM")];
  const year = date.format("YYYY");
  const hour = date.hour();
  const minute = date.minute();
  const formattedTime = `${hour > 12 ? hour - 12 : hour}:${
    minute < 10 ? "0" + minute : minute
  } `;

  return `${day} ${month} ${year} - ${formattedTime}`;
};
export default formatDate;
