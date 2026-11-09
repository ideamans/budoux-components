# BudouX コンポーネント

次のように、さまざまなフレームワークで BudouX をコンポーネントして気軽に利用できるパッケージです。

```react
import BudouX from 'budoux-components/react';

function App() {
  return (
    <div>
      <BudouX text="こんにちは、世界！" />
    </div>
  );
}
```

```vue
<template>
  <div>
    <BudouX text="こんにちは、世界！" />
  </div>
</template>
<script>
  import BudouX from "budoux-components/vue";
</script>
```


# 結果

以下の HTML フラグメントは、

```html
<BudouX><span>こんにちは、世界！</span> こんにちは、せかい！</BudouX>
```

以下のように HTML の構造を維持したまま、BudouX によって自然な文節で`<span class="whitespace-nowrap" />`で括られます。

```html
<span><span class="whitespace-nowrap">こんにちは、</span><span class="whitespace-nowrap">世界！</span></span> <span class="whitespace-nowrap">こんにちは、</span><span class="whitespace-nowrap">せかい！</span></span>
```

`.whitespace-nowrap`クラスは Tailwind CSS の利用を想定していますが、そのセレクタに折り返しを禁止させる CSS プロパティを適用することで、他の CSS フレームワークでも同様の効果を得ることができます。

```css
.whitespace-nowrap {
  white-space: nowrap;
}
```

# テスト

- `test:react` - React コンポーネントのテスト
- `test:vue` - Vue コンポーネントのテスト

# CI

- 各フレームワーク向けのコンポーネントがテストされること

# サンプルコード

Astro で試作したコードは参考にこちら。

```astro
---
import { loadDefaultJapaneseParser } from 'budoux';

const parser = loadDefaultJapaneseParser();

// Get slot content as HTML string
const slotContent = await Astro.slots.render('default');

// Parse HTML and apply BudouX
function applyBudouX(html: string): string {
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
        result += `<span class="whitespace-nowrap">${segment}</span>`;
      }
    }
  }

  return result;
}

const processedContent = applyBudouX(slotContent);
---

<Fragment set:html={processedContent} />
```

# 対象言語

- Node.js
  - 18.x
  - 20.x
  - 22.x
  - 24.x

# ライセンス

Apache License 2.0

## npm への公開

`v*` のタグを push すると `.github/workflows/publish.yml` がテストとビルドのあと npm に**そのまま公開する**
（承認待ちにしない）。認証は npm の Trusted Publishing（GitHub Actions の OIDC）で、`NPM_TOKEN` などのシークレットは使わない。
provenance は自動で付く。

```bash
# package.json の version を上げてコミット・push してから
git tag vX.Y.Z && git push origin vX.Y.Z
```

- タグと package.json の version が違えば落ちる。npm に同じ版があれば何もしない
- プレリリース（`1.2.0-beta.0`）は `latest` ではなく識別子の dist-tag（`beta`）で出る
- 手元から `npm publish` しない（トークンを置かない）
- タグを打ち直さずに出し直すときは、Actions の「Publish to npm」を workflow_dispatch で起動する（選んだブランチの package.json の版を出す）
- PR で `publish.yml` を変えると、公開せずにビルドと `npm pack --dry-run` までが走る
- 前提: npmjs.com の `budoux-components` の設定で、Trusted Publisher に GitHub Actions・`ideamans/budoux-components`・`publish.yml`・権限 **publish** を登録してあること。
  stage publish の権限だけだと `npm publish` は `E403 OIDC permission denied` になる
