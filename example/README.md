# BudouX Components Examples

このディレクトリには、React、Vue、Astro での BudouX Components の使用例が含まれています。

## セットアップ

```bash
# 依存関係のインストール
npm install
```

## 開発サーバーの起動

各フレームワークの例を個別に起動できます：

### React
```bash
npm run dev:react
```
http://localhost:5173 で開きます

### Vue
```bash
npm run dev:vue
```
http://localhost:5174 で開きます

### Astro
```bash
npm run dev:astro
```
http://localhost:5175 で開きます

## 機能

各例では以下の機能を確認できます：

1. **幅制限されたコンテナ** - 狭い幅（300px）、中間幅（500px）での表示
2. **大きなフォントサイズ** - 24px、32px のフォントでの自然な改行
3. **セグメント表示の切り替え** - BudouX が適用したセグメントを視覚的に確認
4. **HTML構造の保持** - children/slot を使った複雑な HTML 構造での動作
5. **カスタムクラス名** - デフォルト以外の CSS クラスの使用

## ファイル構成

```
example/
├── react/          # React の例
│   ├── App.jsx
│   ├── main.jsx
│   └── index.html
├── vue/            # Vue の例
│   ├── App.vue
│   ├── main.js
│   └── index.html
├── astro/          # Astro の例
│   └── src/
│       └── pages/
│           └── index.astro
└── shared/         # 共通リソース
    └── styles.css  # 共通スタイル
```