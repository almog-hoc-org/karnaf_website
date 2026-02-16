import { ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/**
 * OptimizedImage - A performance-optimized image component
 *
 * Features:
 * - Lazy loading by default
 * - Async decoding for non-blocking rendering
 * - Consistent API with standard img element
 *
 * Usage:
 * <OptimizedImage src="/path/to/image.jpg" alt="Description" />
 */
export function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: OptimizedImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      className={className}
      {...props}
    />
  );
}
