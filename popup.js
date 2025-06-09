document.addEventListener("DOMContentLoaded", () => {
  const outputTextarea = document.getElementById("output");
  const charCountElement = document.getElementById("charCount");
  const postButton = document.getElementById("postToX");
  const summarizeButton = document.getElementById("summarize");

  // テキストエリアのリアルタイムカウント
  outputTextarea.addEventListener("input", () => {
    updateCharacterCount(outputTextarea, charCountElement);
  });

  // バックグラウンドからデータ取得
  chrome.runtime.sendMessage({ action: "runModal" }, (response) => {
    if (response) {
      outputTextarea.value = response.output;
      updateCharacterCount(outputTextarea, charCountElement);
    }
  });

  // Geminiで要約ボタン
  summarizeButton.addEventListener("click", async () => {
    const apiKey = await loadApiKey();
    if (!apiKey) {
      alert("APIキーが未設定です");
      return;
    }
    try {
      const summary = await summarizeWithGemini(outputTextarea.value, apiKey);
      outputTextarea.value = summary;
      updateCharacterCount(outputTextarea, charCountElement);
    } catch (e) {
      console.error("Gemini summarization failed", e);
      alert("要約に失敗しました");
    }
  });

  // 「Xへ投稿」ボタンが押されたときの処理
  postButton.addEventListener("click", () => {
    const textToPost = outputTextarea.value;
    console.log("Xへ投稿されました: " + textToPost);

    // Xの投稿ページを新しいタブで開く
    const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(
      textToPost
    )}`;
    window.open(tweetUrl, "_blank");
  });
});

// 文字カウントの更新ロジック
function updateCharacterCount(textarea, countElement) {
  const text = textarea.value;
  const count = calculateCharacterCount(text);
  const isOver = count > 280;

  countElement.textContent = `文字数: ${count}/280`;
  countElement.style.color = isOver ? "#ff0000" : "#000000";
}

// twitter-textライブラリを使用した正確な文字カウントロジック
function calculateCharacterCount(text) {
  // twitter-textライブラリが利用可能かチェック
  if (
    typeof window.twitterText !== "undefined" &&
    window.twitterText.parseTweet
  ) {
    const parseResult = window.twitterText.parseTweet(text);
    return parseResult.weightedLength;
  } else {
    // フォールバック: 従来の文字カウント方法
    return [...text].reduce((count, char) => {
      if (char.match(/[一-龯぀-ゟ゠-ヿ]/)) {
        return count + 2; // 全角文字
      } else {
        return count + 1; // 半角文字・改行
      }
    }, 0);
  }
}

// chrome.storage から API キー取得
function loadApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(["geminiApiKey"], (items) => {
      resolve(items.geminiApiKey || "");
    });
  });
}

// Gemini API を用いた要約
async function summarizeWithGemini(text, apiKey) {
  const body = {
    contents: [
      {
        parts: [
          {
            text: `以下のテキストを投稿用フォーマットを保ったまま簡潔に要約してください:\n${text}`,
          },
        ],
      },
    ],
  };

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    throw new Error("API request failed");
  }

  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text || text
  );
}
