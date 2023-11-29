import { ProfileLink } from "@/sessionize/sessionizeApi";
import Image from "next/image";
interface Props {
  link: ProfileLink;
}
export const SocialLink: React.FC<Props> = ({ link }) => {
  const getIcon = (link: ProfileLink) => {
    switch (link.linkType) {
      case "Twitter":
        return "/images/X.png";
      default:
        return "/images/Link.png";
    }
  };
  return (
    <div className="flex my-2">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block no-underline hover:bg-blue-100"
      >
        <Image
          src={getIcon(link)}
          alt={link.linkType}
          className="w-5 h-5 inline-block mr-1"
          width={20}
          height={20}
        />
        <span className="text-sm text-gray-500">{link.url}</span>
      </a>
    </div>
  );
};
