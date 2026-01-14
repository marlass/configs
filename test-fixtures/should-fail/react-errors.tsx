/**
 * File with intentional React errors.
 * These should trigger oxlint react and jsx-a11y plugins.
 *
 * Expected errors:
 * - react/jsx-key
 * - react/jsx-no-duplicate-props
 * - react/no-children-prop
 * - react-perf/jsx-no-new-object-as-prop
 * - jsx-a11y/alt-text
 * - jsx-a11y/anchor-is-valid
 * - react-hooks/rules-of-hooks
 */

import { useState, useEffect } from "react";

interface ItemProps {
  items: string[];
}

// react/jsx-key: Missing key prop in array
export function BadList({ items }: ItemProps) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

// react/jsx-no-duplicate-props: Duplicate className prop
export function DuplicateProps() {
  return <div className="first" className="second">Content</div>;
}

// react/no-children-prop: Using children as prop
export function ChildrenAsProp() {
  return <div children={<span>Bad pattern</span>} />;
}

// react-perf/jsx-no-new-object-as-prop: New object in JSX prop
export function NewObjectProp() {
  return <div style={{ color: "red", fontSize: 16 }}>Styled</div>;
}

// jsx-a11y/alt-text: Image without alt
export function ImageNoAlt() {
  return <img src="/photo.jpg" />;
}

// jsx-a11y/anchor-is-valid: Invalid anchor
export function InvalidAnchor() {
  return <a href="#">Click me</a>;
}

// react/rules-of-hooks: Conditional hook
export function ConditionalHook({ condition }: { condition: boolean }) {
  if (condition) {
    const [state] = useState(0);
    return <div>{state}</div>;
  }
  return <div>No state</div>;
}

// react/rules-of-hooks: Hook inside callback
export function HookInCallback() {
  const [items, setItems] = useState<string[]>([]);

  const handleClick = () => {
    const [value] = useState("bad");
    setItems([...items, value]);
  };

  return <button onClick={handleClick}>Add</button>;
}
