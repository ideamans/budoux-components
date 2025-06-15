<template>
  <div :class="['container', { 'show-segments': showSegments }]">
    <h1>
      BudouX Vue Example
      <span class="framework-badge vue">Vue</span>
    </h1>

    <button class="toggle-segments" @click="showSegments = !showSegments">
      {{ showSegments ? "セグメント表示を隠す" : "セグメント表示を見る" }}
    </button>

    <div class="example-section">
      <h2>狭い幅（300px）での表示</h2>
      <div class="demo-box narrow">
        <div v-for="(phrase, index) in phrases" :key="index" class="large-text">
          <BudouX :text="phrase" />
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2>中間幅（500px）での表示</h2>
      <div class="demo-box medium">
        <div v-for="(phrase, index) in phrases" :key="index" class="large-text">
          <BudouX :text="phrase" />
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2>特大フォントでの表示</h2>
      <div class="demo-box medium">
        <div
          v-for="(phrase, index) in phrases.slice(0, 3)"
          :key="index"
          class="extra-large-text"
        >
          <BudouX :text="phrase" />
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2>Slot を使った例</h2>
      <div class="demo-box medium">
        <div class="large-text">
          <BudouX>
            <strong>重要：</strong>
            日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。
          </BudouX>
        </div>
        <div class="large-text">
          <BudouX>
            <span style="color: #3b82f6">BudouX</span>は、
            <span style="color: #ef4444">機械学習</span>を使用して、
            日本語のテキストを適切な位置で分割します。
          </BudouX>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h2>カスタムクラス名の例</h2>
      <div class="demo-box medium">
        <div class="large-text">
          <BudouX
            text="カスタムクラス名を使用した例です。"
            :class-name="'custom-no-wrap'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import BudouX from "../../dist/vue";
  import "../shared/styles.css";

  export default {
    name: "App",
    components: {
      BudouX,
    },
    setup() {
      const showSegments = ref(false);
      const phrases = [
        "今日は天気が良いので、公園に散歩に行きました。",
        "日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。",
        "BudouXは、機械学習を使用して、日本語のテキストを適切な位置で分割します。",
        "春は、日本の四季の中でも特に美しい季節です。桜の花が咲き誇り、新しい生命が芽吹く時期でもあります。",
        "私たちは、より良いユーザー体験を提供するために、常に新しい技術を探求しています。",
      ];

      return {
        showSegments,
        phrases,
      };
    },
  };
</script>

<style>
  .custom-no-wrap {
    white-space: nowrap;
    background-color: rgba(147, 51, 234, 0.1);
    padding: 0 2px;
    border-radius: 2px;
  }
</style>
