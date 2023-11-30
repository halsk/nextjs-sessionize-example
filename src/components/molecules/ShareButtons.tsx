import {
  TwitterShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  EmailShareButton,
  HatenaShareButton,
  XIcon,
  FacebookIcon,
  LineIcon,
  HatenaIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

export const ShareButtons: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => (
  <div className="flex mb-4 space-x-2">
    <TwitterShareButton url={url} title={title}>
      <XIcon size={30} round={true} />
    </TwitterShareButton>
    <FacebookShareButton url={url}>
      <FacebookIcon size={30} round={true} />
    </FacebookShareButton>
    <LinkedinShareButton url={url} title={title}>
      <LinkedinIcon size={30} round={true} />
    </LinkedinShareButton>
    <LineShareButton url={url} title={title}>
      <LineIcon size={30} round={true} />
    </LineShareButton>
    <HatenaShareButton url={url} title={title}>
      <HatenaIcon size={30} round={true} />
    </HatenaShareButton>
    <EmailShareButton url={url} title={title}>
      <EmailIcon size={30} round={true} />
    </EmailShareButton>
  </div>
);
