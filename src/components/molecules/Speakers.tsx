import { Speaker } from "@/sessionize/sessionizeApi";

type Props = {
  speakers: Speaker[];
  [key: string]: any; // This line allows any additional properties
};
export const Speakers: React.FC<Props> = ({ speakers, ...rest }) => {
  return (
    <div className={`flex flex-wrap my-2 text-sm ${rest.className || ""}`}>
      {speakers.map((speaker, index) => (
        <div className="mx-2" key={speaker.id}>
          {(index ? "," : "") + speaker.name}
        </div>
      ))}
    </div>
  );
};
