import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IYoutubePortalProps {
  children: React.ReactNode;
  selector: string;
}

const YoutubePortal = ({ children, selector }: IYoutubePortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector(selector) as Element)
    : null;
};

export default YoutubePortal;
