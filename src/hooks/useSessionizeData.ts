import { useState, useEffect, useRef } from 'react';

interface SessionGrid {
  date: Date,
  isDefault: boolean;
  rooms: Room[],
  timeSlots: TimeSlot[]
}
interface Room {
  id: number,
  name: string,
  session: Session | undefined, // only for SessionGrid.timeSlots
  sessions: Session[] | undefined, // only for general rooms
  hasOnlyPlenumSessions: boolean,
  index: number | undefined
}
interface TimeSlot {
  slotStart: string,
  rooms: Room[]
}
interface SessionGroups {
  groupId: number,
  groupName: string,
  sessions: Session[],
  isDefault: boolean
}

interface Session {
  id: string,
  title: string,
  description: string | null,
  startsAt: Date,
  endsAt: Date,
  isServiceSession: boolean,
  isPlenumSession: boolean,
  speakers: Speakers[],
  categories: Category[],
  roomId: number,
  room: string,
  liveUrl: string | null,
  recordingUrl: string | null,
  status: string | null
}

interface Speakers {
  id: string,
  name: string
}

interface Category {
  id: number,
  name: string,
  categoryItems: CategoryItems[],
  sort: number
}

interface CategoryItems {
  id: number,
  name: string
}
const convertSessions = (session: Session) => {
  session.startsAt = new Date(session.startsAt);
  session.endsAt = new Date(session.endsAt);
  return session;
}

const useSessionizeGrids = (id: string) => {
  const [grids, setGrids] = useState<SessionGrid[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const effectRan = useRef(false)
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`https://sessionize.com/api/v2/${id}/view/GridSmart`);
        if (!response.ok) {
          throw new Error(`Error occurred by getting Sessionize data: ${response.statusText}`);
        }
        const data = await response.json();
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
        setGrids(parsed);
        setLoading(false);
      } catch (error) {
        // if error is instance of Error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
        setLoading(false);
      }
    };

    if (effectRan.current === false) {
      fetchSessions();
      return () => {
        effectRan.current = true
      }
    }
  }, [id]);

  return { grids, isLoading, error };
};

export default useSessionizeGrids;
