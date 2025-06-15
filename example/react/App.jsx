import React, { useState } from 'react';
import BudouX from '../../dist/react';
import '../shared/styles.css';

function App() {
  const [showSegments, setShowSegments] = useState(false);

  const phrases = [
    '今日は天気が良いので、公園に散歩に行きました。',
    '日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。',
    'BudouXは、機械学習を使用して、日本語のテキストを適切な位置で分割します。',
    '春は、日本の四季の中でも特に美しい季節です。桜の花が咲き誇り、新しい生命が芽吹く時期でもあります。',
    '私たちは、より良いユーザー体験を提供するために、常に新しい技術を探求しています。'
  ];

  return (
    <div className={`container ${showSegments ? 'show-segments' : ''}`}>
      <h1>
        BudouX React Example
        <span className="framework-badge react">React</span>
      </h1>
      
      <button 
        className="toggle-segments"
        onClick={() => setShowSegments(!showSegments)}
      >
        {showSegments ? 'セグメント表示を隠す' : 'セグメント表示を見る'}
      </button>

      <div className="example-section">
        <h2>狭い幅（300px）での表示</h2>
        <div className="demo-box narrow">
          {phrases.map((phrase, index) => (
            <div key={index} className="large-text">
              <BudouX text={phrase} />
            </div>
          ))}
        </div>
      </div>

      <div className="example-section">
        <h2>中間幅（500px）での表示</h2>
        <div className="demo-box medium">
          {phrases.map((phrase, index) => (
            <div key={index} className="large-text">
              <BudouX text={phrase} />
            </div>
          ))}
        </div>
      </div>

      <div className="example-section">
        <h2>特大フォントでの表示</h2>
        <div className="demo-box medium">
          {phrases.slice(0, 3).map((phrase, index) => (
            <div key={index} className="extra-large-text">
              <BudouX text={phrase} />
            </div>
          ))}
        </div>
      </div>

      <div className="example-section">
        <h2>Children を使った例</h2>
        <div className="demo-box medium">
          <div className="large-text">
            <BudouX>
              <strong>重要：</strong>
              日本語の文章を自然な位置で改行させることは、読みやすさの向上に重要です。
            </BudouX>
          </div>
          <div className="large-text">
            <BudouX>
              <span style={{ color: '#3b82f6' }}>BudouX</span>は、
              <span style={{ color: '#ef4444' }}>機械学習</span>を使用して、
              日本語のテキストを適切な位置で分割します。
            </BudouX>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;