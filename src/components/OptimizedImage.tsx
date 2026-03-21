import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading,
  decoding = 'async',
  ...props
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : (loading ?? 'lazy')}
      decoding={priority ? 'sync' : decoding}
      // @ts-expect-error -- fetchPriority is valid HTML but not yet in React types
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      {...props}
    />
  );
}
