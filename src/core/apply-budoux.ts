import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

/**
 * Apply BudouX to HTML string, preserving HTML structure
 * @param html HTML string to process
 * @param wrapperClass CSS class for wrapper spans (default: 'whitespace-nowrap')
 * @returns Processed HTML string
 */
export function applyBudouX(html: string, wrapperClass: string = 'whitespace-nowrap'): string {
  // Regular expression to match HTML tags and content
  const regex = /(<[^>]+>)|([^<]+)/g;
  let result = '';
  let match;

  while ((match = regex.exec(html)) !== null) {
    if (match[1]) {
      // This is an HTML tag, keep it as is
      result += match[1];
    } else if (match[2]) {
      // This is text content, apply BudouX
      const segments = parser.parse(match[2]);
      for (const segment of segments) {
        result += `<span class="${wrapperClass}">${segment}</span>`;
      }
    }
  }

  return result;
}

/**
 * Apply BudouX to plain text
 * @param text Plain text to process
 * @param wrapperClass CSS class for wrapper spans (default: 'whitespace-nowrap')
 * @returns Array of React/Vue elements or HTML string
 */
export function applyBudouXToText(text: string, wrapperClass: string = 'whitespace-nowrap'): string[] {
  return parser.parse(text).map(segment => `<span class="${wrapperClass}">${segment}</span>`);
}

/**
 * Get BudouX segments without wrapping
 * @param text Text to process
 * @returns Array of text segments
 */
export function getBudouXSegments(text: string): string[] {
  return parser.parse(text);
}