# BudouX Components

BudouX components for React, Vue, and Astro frameworks. This package provides easy-to-use components that automatically apply BudouX (the machine learning powered line break organizer) to Japanese text.

## Features

- 🚀 Easy to integrate with React, Vue, and Astro
- 🎯 Automatically applies natural line breaks to Japanese text
- 📦 Zero configuration required
- 🎨 Customizable CSS classes
- 🔧 TypeScript support

## Installation

```bash
npm install budoux-components
```

## Usage

The components wrap Japanese text segments with `<span class="whitespace-nowrap">` tags to prevent unnatural line breaks. This works seamlessly with Tailwind CSS or you can define your own CSS:

```css
.whitespace-nowrap {
  white-space: nowrap;
}
```

### React

```jsx
import BudouX from 'budoux-components/react';

function App() {
  return (
    <div>
      {/* Using text prop */}
      <BudouX text="こんにちは、世界！" />
      
      {/* Using children */}
      <BudouX>
        <span>こんにちは、世界！</span>
        日本語のテキストを自然に改行します。
      </BudouX>
      
      {/* Custom class name */}
      <BudouX text="カスタムクラス" className="no-wrap" />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <!-- Using text prop -->
    <BudouX text="こんにちは、世界！" />
    
    <!-- Using slot -->
    <BudouX>日本語のテキストを自然に改行します。</BudouX>
    
    <!-- Custom class name -->
    <BudouX text="カスタムクラス" :class-name="'no-wrap'" />
  </div>
</template>

<script>
import BudouX from 'budoux-components/vue';

export default {
  components: {
    BudouX
  }
}
</script>
```

### Astro

```astro
---
import BudouX from 'budoux-components/astro';
---

<!-- Using text prop -->
<BudouX text="こんにちは、世界！" />

<!-- Using slot content -->
<BudouX>
  <span>こんにちは、世界！</span>
  日本語のテキストを自然に改行します。
</BudouX>

<!-- Custom class name -->
<BudouX text="カスタムクラス" class="no-wrap" />
```

## How it works

BudouX uses machine learning to determine the most natural places to break Japanese text. The components analyze your text and wrap segments with `<span>` elements that prevent line breaks within each segment.

For example:
```html
<!-- Input -->
<BudouX text="今日は天気がいいですね。" />

<!-- Output -->
<span class="whitespace-nowrap">今日は</span>
<span class="whitespace-nowrap">天気が</span>
<span class="whitespace-nowrap">いいですね。</span>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `undefined` | Text content to apply BudouX |
| `className` | `string` | `'whitespace-nowrap'` | CSS class for wrapper spans |
| `class` (Astro) | `string` | `'whitespace-nowrap'` | CSS class for wrapper spans |

### Children / Slots

All components support children/slot content. When using children, the component will preserve HTML structure while applying BudouX to text nodes.

## Development

### Setup

```bash
# Clone the repository
git clone https://github.com/ideamans/budoux-components.git
cd budoux-components

# Install dependencies
npm install

# Build
npm run build

# Test
npm test

# E2E Test (automatically sets up on first run)
npm run test:e2e
```

### About E2E Tests

When running E2E tests, the following setup is performed automatically:

1. Install example directory dependencies
2. Build components (if dist directory doesn't exist)
3. Install Playwright browsers (first time only)

To run setup manually:

```bash
node scripts/setup-e2e.js
```

### Playwright MCP Server

This project includes Playwright MCP (Model Context Protocol) server, which enables AI assistants to perform browser automation tasks.

Configuration is located at `.mcp/config.json`.

## Requirements

- Node.js >= 18.x
- React >= 16.8.0 (for React component)
- Vue >= 3.0.0 (for Vue component)

## License

Apache License 2.0

## リリース（メンテナー向け）

package.json の version を上げてコミットし、`git tag vX.Y.Z && git push origin vX.Y.Z`。
GitHub Actions が npm の Trusted Publishing（OIDC）で公開する（トークンは使わない）。
