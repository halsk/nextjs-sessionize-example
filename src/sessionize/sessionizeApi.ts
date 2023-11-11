export interface SessionGrid {
  date: Date,
  isDefault: boolean;
  rooms: Room[],
  timeSlots: TimeSlot[]
}
export interface Room {
  id: number,
  name: string,
  session: Session | undefined, // only for SessionGrid.timeSlots
  sessions: Session[] | undefined, // only for general rooms
  hasOnlyPlenumSessions: boolean,
  index: number | undefined
}
export interface TimeSlot {
  slotStart: string,
  rooms: Room[]
}
export interface SessionGroups {
  groupId: number,
  groupName: string,
  sessions: Session[],
  isDefault: boolean
}

export interface Session {
  id: string,
  title: string,
  description: string | null,
  startsAt: Date,
  endsAt: Date,
  isServiceSession: boolean,
  isPlenumSession: boolean,
  speakers: Speaker[],
  categories: Category[],
  roomId: number,
  room: string,
  liveUrl: string | null,
  recordingUrl: string | null,
  status: string | null
}

export interface Speaker {
  id: string,
  name: string
}
export interface Category {
  id: number,
  name: string,
  categoryItems: CategoryItems[],
  sort: number
}

interface CategoryItems {
  id: number,
  name: string
}

/**
 * For Speaker API
 */
export interface FullSpeaker {
  id: string,
  bio: string,
  firstName: string,
  fullName: string,
  lastName: string,
  links: ProfileLink[],
  profilePicture?: string,
  questionAnswers: QestionAnswer[],
  sessions: SpeakersSession[],
  tagLine: string
}
export interface ProfileLink {
  title: string,
  url: string,
  linkType: string
}
export interface QestionAnswer {
  question: string,
  answer: string,
  answerExtra?: string | null,
  id: number,
  questionType: string,
  sort: number
}
export interface SpeakersSession {
  id: number,
  name: string
}

const convertSessions = (session: Session) => {
  session.startsAt = new Date(session.startsAt);
  session.endsAt = new Date(session.endsAt);
  return session;
}

export const fetchSessionizeGrids = async (id: string) => {
  // fetch data from sessionize
  const response = await fetch(`https://sessionize.com/api/v2/${id}/view/GridSmart`);
  if (!response.ok) {
    throw new Error(`Error occurred by getting Sessionize data: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data)
  const parsed = data.map((grid: SessionGrid) => {
    grid.date = new Date(grid.date);
    grid.rooms = grid.rooms.map((room: Room) => {
      room.sessions = room.sessions!.map(convertSessions);
      return room;
    });
    grid.timeSlots = grid.timeSlots.map((timeSlot: TimeSlot) => {
      timeSlot.rooms = timeSlot.rooms.map((room: Room) => {
        room.session = convertSessions(room.session!);
        return room;
      });
      return timeSlot;
    });
    return grid;
  });
  return parsed as SessionGrid[];
};

export const fetchSessionizeSessions = async (id: string) => {
  // fetch data from sessionize
  const response = await fetch(`https://sessionize.com/api/v2/${id}/view/Sessions`);
  if (!response.ok) {
    throw new Error(`Error occurred by getting Sessionize data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.map(convertSessions)
};
export const fetchSessionizeSpeakers = async (id: string) => {
  // fetch data from sessionize
  const response = await fetch(`https://sessionize.com/api/v2/${id}/view/Speakers`);
  if (!response.ok) {
    throw new Error(`Error occurred by getting Sessionize data: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(data)
  return data as FullSpeaker[];
};
