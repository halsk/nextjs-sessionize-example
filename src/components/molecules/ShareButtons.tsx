import {
  XShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  EmailShareButton,
  HatenaShareButton,
  XLegacyIcon,
  FacebookLegacyIcon,
  LineLegacyIcon,
  HatenaLegacyIcon,
  LinkedinLegacyIcon,
  EmailLegacyIcon,
} from "react-share";

const ICON_SIZE = 30;

export const ShareButtons: React.FC<{ url: string; title: string }> = ({
  url,
  title,
}) => (
  <div className="flex mb-4 space-x-2">
    <XShareButton url={url} text={title}>
      <XLegacyIcon size={ICON_SIZE} round={true} />
    </XShareButton>
    <FacebookShareButton url={url}>
      <FacebookLegacyIcon size={ICON_SIZE} round={true} />
    </FacebookShareButton>
    <LinkedinShareButton url={url}>
      <LinkedinLegacyIcon size={ICON_SIZE} round={true} />
    </LinkedinShareButton>
    <LineShareButton url={url} text={title}>
      <LineLegacyIcon size={ICON_SIZE} round={true} />
    </LineShareButton>
    <HatenaShareButton url={url} shareTitle={title}>
      <HatenaLegacyIcon size={ICON_SIZE} round={true} />
    </HatenaShareButton>
    <EmailShareButton url={url} subject={title}>
      <EmailLegacyIcon size={ICON_SIZE} round={true} />
    </EmailShareButton>
  </div>
);
