interface SplitTextProps {
  text: string;
  className?: string;
}

export const SplitText = ({ text, className }: SplitTextProps) => {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="char inline-block"
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
};
