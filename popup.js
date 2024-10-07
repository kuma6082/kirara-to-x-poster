document.addEventListener('DOMContentLoaded', () => {
    const outputTextarea = document.getElementById('output');
    const charCountElement = document.getElementById('charCount');
    const postButton = document.getElementById('postToX');

    // テキストエリアのリアルタイムカウント
    outputTextarea.addEventListener('input', () => {
        updateCharacterCount(outputTextarea, charCountElement);
    });

    // バックグラウンドからデータ取得
    chrome.runtime.sendMessage({ action: "runModal" }, (response) => {
        if (response) {
            outputTextarea.value = response.output;
            updateCharacterCount(outputTextarea, charCountElement);
        }
    });

    // 「Xへ投稿」ボタンが押されたときの処理
    postButton.addEventListener('click', () => {
        const textToPost = outputTextarea.value;
        console.log("Xへ投稿されました: " + textToPost);

        // Xの投稿ページを新しいタブで開く
        const tweetUrl = `https://x.com/intent/post?text=${encodeURIComponent(textToPost)}`;
        window.open(tweetUrl, '_blank');
    });
});

// 文字カウントの更新ロジック
function updateCharacterCount(textarea, countElement) {
    const text = textarea.value;
    const count = calculateCharacterCount(text);
    countElement.textContent = `文字数: ${count}/280`;
}

// 文字カウントロジック
function calculateCharacterCount(text) {
    return [...text].reduce((count, char) => {
        if (char.match(/[一-龯぀-ゟ゠-ヿ]/)) {
            return count + 2; // 全角文字
        } else {
            return count + 1; // 半角文字・改行
        }
    }, 0);
}