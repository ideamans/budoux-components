import { defineComponent, h, VNode } from 'vue';
import { getBudouXSegments } from '../core/apply-budoux.js';

/**
 * BudouX component for Vue 3
 * 
 * Usage:
 * ```vue
 * <template>
 *   <!-- As a component with text prop -->
 *   <BudouX text="こんにちは、世界！" />
 *   
 *   <!-- As a wrapper component -->
 *   <BudouX>こんにちは、世界！</BudouX>
 * </template>
 * ```
 */
const BudouX = defineComponent({
  name: 'BudouX',
  props: {
    /**
     * Text content to apply BudouX (when using with text prop)
     */
    text: {
      type: String,
      required: false
    },
    /**
     * CSS class for wrapper spans
     */
    className: {
      type: String,
      default: 'whitespace-nowrap'
    }
  },
  setup(props, { slots }) {
    return () => {
      let textContent = '';
      
      // If text prop is provided, use it
      if (props.text) {
        textContent = props.text;
      } 
      // If slot content is provided, extract text
      else if (slots.default) {
        const vnodes = slots.default();
        // Simple text extraction from slots
        textContent = vnodes.map(vnode => {
          if (typeof vnode.children === 'string') {
            return vnode.children;
          }
          return '';
        }).join('');
      }

      if (!textContent) {
        return null;
      }

      // Apply BudouX and create spans
      const segments = getBudouXSegments(textContent);
      return segments.map((segment, index) => 
        h('span', { key: index, class: props.className }, segment)
      );
    };
  }
});

export default BudouX;