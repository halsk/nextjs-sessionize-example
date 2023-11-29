import { differenceInMinutes, format } from "date-fns";
import { Session } from "@/sessionize/sessionizeApi";

type hashParam = {
  page?: number,
  sessionId?: string
}
export const debug = (process.env.NODE_ENV === 'development') ? console.log.bind(console) : () => { };

export const parseWindowHash = () => {
  const hash = window.location.hash
    ? window.location.hash.replace("#", "")
    : "0";
  const params = hash.split("_");
  return { page: parseInt(params[0]), sessionId: params[1] }
}
export const createHash = (param: hashParam) => {
  // get current hash
  const hash = parseWindowHash();
  if (param.page !== undefined) {
    hash.page = param.page;
  }
  if (param.sessionId !== undefined) {
    hash.sessionId = param.sessionId;
  }
  return `/#${hash.page.toString() + (hash.sessionId ? "_" + hash.sessionId : "")}`
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
