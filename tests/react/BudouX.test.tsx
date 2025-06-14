import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import BudouX from '../../src/react';

describe('BudouX React Component', () => {
  it('should render text with BudouX applied using text prop', () => {
    const { container } = render(<BudouX text="こんにちは、世界！" />);
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    
    expect(spans.length).toBeGreaterThan(0);
    expect(container.textContent).toBe('こんにちは、世界！');
  });

  it('should render children with BudouX applied', () => {
    const { container } = render(
      <BudouX>
        <span>こんにちは、世界！</span> こんにちは、せかい！
      </BudouX>
    );
    
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(0);
    expect(container.textContent).toBe('こんにちは、世界！ こんにちは、せかい！');
  });

  it('should use custom className', () => {
    const { container } = render(<BudouX text="こんにちは、世界！" className="custom-class" />);
    const spans = container.querySelectorAll('span.custom-class');
    
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should preserve HTML structure in children', () => {
    const { container } = render(
      <BudouX>
        <div>
          <span>こんにちは、世界！</span>
        </div>
      </BudouX>
    );
    
    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should handle mixed content', () => {
    const { container } = render(
      <BudouX>
        テキスト1
        <span>テキスト2</span>
        テキスト3
      </BudouX>
    );
    
    expect(container.textContent).toBe('テキスト1テキスト2テキスト3');
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should return null when no text or children provided', () => {
    const { container } = render(<BudouX />);
    expect(container.firstChild).toBeNull();
  });

  it('should handle longer Japanese text with proper segmentation', () => {
    const longText = '今日は天気が良いので、公園に散歩に行きました。桜の花が満開で、とても美しい景色でした。';
    const { container } = render(<BudouX text={longText} />);
    
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(5); // Should have multiple segments
    expect(container.textContent).toBe(longText);
    
    // Check that each span contains a segment
    spans.forEach(span => {
      expect(span.textContent).toBeTruthy();
      expect(span.className).toBe('whitespace-nowrap');
    });
  });

  it('should generate expected HTML structure for simple text', () => {
    const { container } = render(<BudouX text="こんにちは、世界！" />);
    
    // Get the actual HTML
    const html = container.innerHTML;
    
    // Should contain multiple spans with whitespace-nowrap class
    expect(html).toMatch(/<span class="whitespace-nowrap">[\s\S]+?<\/span>/);
    expect(html).toContain('whitespace-nowrap');
    
    // Verify the structure has multiple segments
    const spanMatches = html.match(/<span class="whitespace-nowrap">[^<]+<\/span>/g);
    expect(spanMatches).toBeTruthy();
    expect(spanMatches!.length).toBeGreaterThanOrEqual(2);
  });

  it('should generate expected HTML structure for complex content', () => {
    const { container } = render(
      <BudouX>
        <div className="content">
          <p>日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。</p>
          <span>BudouXは、機械学習を使用して、日本語のテキストを適切な位置で分割します。</span>
        </div>
      </BudouX>
    );
    
    // Check that the original structure is preserved
    expect(container.querySelector('div.content')).toBeInTheDocument();
    expect(container.querySelector('p')).toBeInTheDocument();
    
    // Check that BudouX spans are added within the text content
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(10); // Long text should have many segments
    
    // Verify text content is preserved
    const expectedText = '日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。BudouXは、機械学習を使用して、日本語のテキストを適切な位置で分割します。';
    expect(container.textContent).toBe(expectedText);
  });

  it('should handle very long text efficiently', () => {
    const veryLongText = '春は、日本の四季の中でも特に美しい季節です。桜の花が咲き誇り、新しい生命が芽吹く時期でもあります。多くの人々が花見を楽しみ、お弁当を持って公園や川沿いに集まります。この伝統的な習慣は、日本文化の重要な一部となっています。桜の花は短い期間しか咲かないため、その儚さが日本人の美意識と深く結びついています。';
    const { container } = render(<BudouX text={veryLongText} />);
    
    const spans = container.querySelectorAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(15); // Very long text should have many segments
    expect(container.textContent).toBe(veryLongText);
    
    // Verify all content is wrapped in spans
    const totalSpanText = Array.from(spans).map(span => span.textContent).join('');
    expect(totalSpanText).toBe(veryLongText);
  });
});