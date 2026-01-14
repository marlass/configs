/**
 * Valid React component that should pass all oxlint rules.
 * Tests: react, react-perf, jsx-a11y plugins
 */

import { type ReactNode, memo, useCallback, useMemo, useState } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  ariaLabel?: string;
}

/**
 * Accessible button component.
 */
export const Button = memo(function Button({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
});

interface CounterProps {
  initialValue?: number;
  step?: number;
}

/**
 * Counter component with proper hooks usage.
 */
export function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - step);
  }, [step]);

  const displayValue = useMemo(() => {
    return `Current count: ${count}`;
  }, [count]);

  return (
    <div role="group" aria-label="Counter controls">
      <p>{displayValue}</p>
      <Button onClick={decrement} ariaLabel="Decrease count">
        -
      </Button>
      <Button onClick={increment} ariaLabel="Increase count">
        +
      </Button>
    </div>
  );
}

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
}

/**
 * Generic list component with proper key handling.
 */
export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
}

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Accessible image component.
 */
export function AccessibleImage({ src, alt, width, height }: ImageProps) {
  return <img src={src} alt={alt} width={width} height={height} />;
}
