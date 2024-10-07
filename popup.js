document.addEventListener('DOMContentLoaded', function () {
    const outputTextarea = document.getElementById('output');
    const charCountElement = document.getElementById('charCount');

    // テキストエリアのリアルタイムカウント
    outputTextarea.addEventListener('input', function () {
        const text = outputTextarea.value;
        const count = calculateCharacterCount(text);
        charCountElement.textContent = `文字数: ${count}/280`;
    });

    // バックグラウンドからデータ取得
    chrome.runtime.sendMessage({ action: "runModal" }, function (response) {
        if (response) {
            outputTextarea.value = response.output;
            const count = calculateCharacterCount(outputTextarea.value);
            charCountElement.textContent = `文字数: ${count}/280`;
        }
    });
});

// 文字カウントロジック
function calculateCharacterCount(text) {
    let count = 0;
    for (const char of text) {
        if (char.match(/[\u4e00-\u9faf\u3040-\u309f\u30a0-\u30ff]/)) {
            count += 2; // 全角文字
        } else if (char === '\n') {
            count += 1; // 改行
        } else {
            count += 1; // 半角文字
        }
    }
    return count;
}


document.addEventListener('DOMContentLoaded', function () {
    const postButton = document.getElementById('postToX');

    postButton.addEventListener('click', function () {
        console.log("Xへ投稿されました: " + output.value);
    });
});

