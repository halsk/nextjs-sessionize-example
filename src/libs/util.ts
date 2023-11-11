import { Session } from "@/sessionize/sessionizeApi";
import { differenceInMinutes, format } from "date-fns";

export const hhmmddToMinutes = (hhmm: string | Date) => {
  if (typeof hhmm === "string") {
    const [hours, minutes] = hhmm.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  } else {
    return hhmm.getHours() * 60 + hhmm.getMinutes();
  }
}
export const convertHHMM = (hhmm: string | Date) => {
  if (typeof hhmm === "string") {
    const [hours, minutes] = hhmm.split(":");
    return format(new Date(0, 0, 0, parseInt(hours), parseInt(minutes)), "HHmm");
  } else {
    return format(hhmm, "HHmm")
  }
}
export const calcSessionMinutes = (session: Session) => {
  return differenceInMinutes(session.endsAt, session.startsAt);
};
