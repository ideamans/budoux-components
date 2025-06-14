# BudouX Components

React、Vue、Astro フレームワーク用の BudouX コンポーネントです。このパッケージは、日本語テキストに BudouX（機械学習を活用した改行位置最適化ツール）を簡単に適用できるコンポーネントを提供します。

[English](./README.en.md)

## 特徴

- 🚀 React、Vue、Astro との簡単な統合
- 🎯 日本語テキストに自然な改行を自動適用
- 📦 設定不要ですぐに使える
- 🎨 CSS クラスのカスタマイズ可能
- 🔧 TypeScript サポート

## インストール

```bash
npm install budoux-components
```

## 使い方

コンポーネントは日本語テキストのセグメントを `<span class="whitespace-nowrap">` タグで囲み、不自然な改行を防ぎます。Tailwind CSS と相性が良く、独自の CSS を定義することも可能です：

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
      {/* text prop を使用 */}
      <BudouX text="こんにちは、世界！" />
      
      {/* children を使用 */}
      <BudouX>
        <span>こんにちは、世界！</span>
        日本語のテキストを自然に改行します。
      </BudouX>
      
      {/* カスタムクラス名 */}
      <BudouX text="カスタムクラス" className="no-wrap" />
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <!-- text prop を使用 -->
    <BudouX text="こんにちは、世界！" />
    
    <!-- slot を使用 -->
    <BudouX>日本語のテキストを自然に改行します。</BudouX>
    
    <!-- カスタムクラス名 -->
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

<!-- text prop を使用 -->
<BudouX text="こんにちは、世界！" />

<!-- slot を使用 -->
<BudouX>
  <span>こんにちは、世界！</span>
  日本語のテキストを自然に改行します。
</BudouX>

<!-- カスタムクラス名 -->
<BudouX text="カスタムクラス" class="no-wrap" />
```

## 仕組み

BudouX は機械学習を使用して、日本語テキストの最も自然な改行位置を判断します。コンポーネントはテキストを分析し、各セグメントを改行されない `<span>` 要素で囲みます。

例：
```html
<!-- 入力 -->
<BudouX text="今日は天気がいいですね。" />

<!-- 出力 -->
<span class="whitespace-nowrap">今日は</span>
<span class="whitespace-nowrap">天気が</span>
<span class="whitespace-nowrap">いいですね。</span>
```

## API

### Props

| プロパティ | 型 | デフォルト値 | 説明 |
|------|------|---------|----------------|
| `text` | `string` | `undefined` | BudouX を適用するテキスト |
| `className` | `string` | `'whitespace-nowrap'` | ラッパー span の CSS クラス |
| `class` (Astro) | `string` | `'whitespace-nowrap'` | ラッパー span の CSS クラス |

### Children / Slots

すべてのコンポーネントは children/slot コンテンツをサポートしています。children を使用する場合、コンポーネントは HTML 構造を保持しながらテキストノードに BudouX を適用します。

## 必要条件

- Node.js >= 18.x
- React >= 16.8.0 (React コンポーネント用)
- Vue >= 3.0.0 (Vue コンポーネント用)

## ライセンス

Apache License 2.0