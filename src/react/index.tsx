import React, { ReactNode, Fragment } from 'react';
import { applyBudouX, getBudouXSegments } from '../core/apply-budoux.js';

interface BudouXProps {
  /**
   * Text content to apply BudouX (when using as a self-closing component)
   */
  text?: string;
  /**
   * Children elements (when using as a wrapper component)
   */
  children?: ReactNode;
  /**
   * CSS class for wrapper spans
   * @default 'whitespace-nowrap'
   */
  className?: string;
}

/**
 * BudouX component for React
 * 
 * Usage:
 * ```jsx
 * // As a self-closing component with text prop
 * <BudouX text="こんにちは、世界！" />
 * 
 * // As a wrapper component
 * <BudouX><span>こんにちは、世界！</span> こんにちは、せかい！</BudouX>
 * ```
 */
const BudouX: React.FC<BudouXProps> = ({ text, children, className = 'whitespace-nowrap' }) => {
  // If text prop is provided, use it directly
  if (text) {
    const segments = getBudouXSegments(text);
    return (
      <>
        {segments.map((segment, index) => (
          <span key={index} className={className}>
            {segment}
          </span>
        ))}
      </>
    );
  }

  // If children are provided, process them
  if (children) {
    // Convert children to HTML string
    const processChildren = (node: ReactNode): ReactNode => {
      if (typeof node === 'string') {
        // Plain text node
        const segments = getBudouXSegments(node);
        return segments.map((segment, index) => (
          <span key={`text-${index}`} className={className}>
            {segment}
          </span>
        ));
      }

      if (React.isValidElement(node)) {
        // React element
        const newChildren = React.Children.map(node.props.children, processChildren);
        return React.cloneElement(node, {}, newChildren);
      }

      if (Array.isArray(node)) {
        // Array of nodes
        return node.map((child, index) => (
          <Fragment key={`array-${index}`}>{processChildren(child)}</Fragment>
        ));
      }

      // Other types (numbers, null, etc.)
      return node;
    };

    return <>{processChildren(children)}</>;
  }

  return null;
};

export default BudouX;