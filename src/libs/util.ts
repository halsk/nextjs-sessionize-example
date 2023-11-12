import { differenceInMinutes, format } from "date-fns";
import { Session } from "@/sessionize/sessionizeApi";

export const parseWindowHash = () => {
  const hash = window.location.hash
    ? window.location.hash.replace("#", "")
    : "0";
  return { page: parseInt(hash), session: undefined }
}
export const createHash = (page: number, session?: Session) => {
  return `/#${page.toString()}`
}
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
