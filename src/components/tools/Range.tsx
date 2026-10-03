import { formatILS } from "@/lib/format";

interface RangeProps {
  low: number;
  high: number;
  format?: (n: number) => string;
}

/**
 * A range in Hebrew reading order. Each end is isolated left-to-right so
 * "₪15,340" stays whole, and the pair follows the RTL line: the low end
 * sits on the right and is read first, the way Hebrew sets "1948–1967".
 * Wrapping the whole range in dir="ltr" would put the low end on the left.
 * Collapses to one value when both ends format the same.
 */
export const Range = ({ low, high, format = formatILS }: RangeProps) => {
  const a = format(low);
  const b = format(high);
  if (a === b) return <bdi dir="ltr">{a}</bdi>;
  return (
    <>
      <bdi dir="ltr">{a}</bdi>–<bdi dir="ltr">{b}</bdi>
    </>
  );
};
