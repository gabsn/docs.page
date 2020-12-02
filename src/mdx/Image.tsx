import React, { useContext } from 'react';
import validDataUrl from 'valid-data-url';
import Zoom from 'react-medium-image-zoom';

import { isExternalLink } from '../components/Link';
import { SlugPropertiesContext } from '../properties';

interface ImageProps
  extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  caption?: string;
  zoom?: boolean;
}

// https://raw.githubusercontent.com/Ehesp/testing/main/docs/rnfb-logo.png

export function Image({ zoom = false, caption, ...props }: ImageProps) {
  const properties = useContext(SlugPropertiesContext);

  let src = props.src ?? '';

  if (!src) {
    return null;
  }

  const wrapper = (child: React.ReactElement) =>
    withFigure(zoom ? withZoom(child) : child, caption);

  if (isExternalLink(src) || validDataUrl(src)) {
    return wrapper(<img {...props} src={src} alt={props.alt ?? ''} className="mx-auto" />);
  }

  let url = `https://raw.githubusercontent.com/${properties.owner}/${properties.repository}/${properties.ref}/docs/${src}`;

  return wrapper(<img {...props} src={url} alt={props.alt} className="mx-auto" />);
}

function withFigure(child: React.ReactElement, caption?: string) {
  return (
    <figure>
      {child}
      {!!caption && (
        <figcaption className="text-center text-sm italic my-3 dark:text-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function withZoom(child: React.ReactElement) {
  return <Zoom wrapStyle={{ width: '100%' }}>{child}</Zoom>;
}
