interface SplitTextProps {
  text: string;
  className?: string;
}

export const SplitText = ({ text, className }: SplitTextProps) => {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};
