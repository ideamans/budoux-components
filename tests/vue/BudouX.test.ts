import { mount } from '@vue/test-utils';
import BudouX from '../../src/vue';

describe('BudouX Vue Component', () => {
  it('should render text with BudouX applied using text prop', () => {
    const wrapper = mount(BudouX, {
      props: {
        text: 'こんにちは、世界！'
      }
    });
    
    const spans = wrapper.findAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(0);
    expect(wrapper.text()).toBe('こんにちは、世界！');
  });

  it('should render slot content with BudouX applied', () => {
    const wrapper = mount(BudouX, {
      slots: {
        default: 'こんにちは、世界！'
      }
    });
    
    const spans = wrapper.findAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(0);
    expect(wrapper.text()).toBe('こんにちは、世界！');
  });

  it('should use custom className', () => {
    const wrapper = mount(BudouX, {
      props: {
        text: 'こんにちは、世界！',
        className: 'custom-class'
      }
    });
    
    const spans = wrapper.findAll('span.custom-class');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('should return null when no text or slot provided', () => {
    const wrapper = mount(BudouX);
    expect(wrapper.html()).toBe('');
  });

  it('should handle longer Japanese text with proper segmentation', () => {
    const longText = '今日は天気が良いので、公園に散歩に行きました。桜の花が満開で、とても美しい景色でした。';
    const wrapper = mount(BudouX, {
      props: {
        text: longText
      }
    });
    
    const spans = wrapper.findAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(5); // Should have multiple segments
    expect(wrapper.text()).toBe(longText);
    
    // Check that each span contains a segment
    spans.forEach(span => {
      expect(span.text()).toBeTruthy();
      expect(span.classes()).toContain('whitespace-nowrap');
    });
  });

  it('should generate expected HTML structure for simple text', () => {
    const wrapper = mount(BudouX, {
      props: {
        text: 'こんにちは、世界！'
      }
    });
    
    // Get the actual HTML
    const html = wrapper.html();
    
    // Should contain multiple spans with whitespace-nowrap class
    expect(html).toMatch(/<span class="whitespace-nowrap">[\s\S]+?<\/span>/);
    expect(html).toContain('whitespace-nowrap');
    
    // Verify the structure has multiple segments
    const spanMatches = html.match(/<span class="whitespace-nowrap">[^<]+<\/span>/g);
    expect(spanMatches).toBeTruthy();
    expect(spanMatches!.length).toBeGreaterThanOrEqual(2);
  });

  it('should handle very long text efficiently', () => {
    const veryLongText = '春は、日本の四季の中でも特に美しい季節です。桜の花が咲き誇り、新しい生命が芽吹く時期でもあります。多くの人々が花見を楽しみ、お弁当を持って公園や川沿いに集まります。この伝統的な習慣は、日本文化の重要な一部となっています。桜の花は短い期間しか咲かないため、その儚さが日本人の美意識と深く結びついています。';
    const wrapper = mount(BudouX, {
      props: {
        text: veryLongText
      }
    });
    
    const spans = wrapper.findAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(15); // Very long text should have many segments
    expect(wrapper.text()).toBe(veryLongText);
    
    // Verify all content is wrapped in spans
    const totalSpanText = spans.map(span => span.text()).join('');
    expect(totalSpanText).toBe(veryLongText);
  });

  it('should handle slot content with longer text', () => {
    const longText = '日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。BudouXは、機械学習を使用して、日本語のテキストを適切な位置で分割します。';
    const wrapper = mount(BudouX, {
      slots: {
        default: longText
      }
    });
    
    const spans = wrapper.findAll('span.whitespace-nowrap');
    expect(spans.length).toBeGreaterThan(10); // Long text should have many segments
    expect(wrapper.text()).toBe(longText);
    
    // Check HTML structure
    const html = wrapper.html();
    expect(html).toMatch(/<span class="whitespace-nowrap">[^<]+<\/span>/);
  });

  it('should generate consistent HTML output', () => {
    const text = 'テスト文章です。';
    const wrapper = mount(BudouX, {
      props: { text }
    });
    
    // Mount the same component again to check consistency
    const wrapper2 = mount(BudouX, {
      props: { text }
    });
    
    expect(wrapper.html()).toBe(wrapper2.html());
    expect(wrapper.findAll('span').length).toBe(wrapper2.findAll('span').length);
  });
});