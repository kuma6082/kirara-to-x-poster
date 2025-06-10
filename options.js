// options.js - Save Gemini API key

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('apiKeyInput');

  // Load existing API key
  chrome.storage.local.get(['geminiApiKey'], (items) => {
    if (chrome.runtime.lastError) {
      console.error('APIキーの読み込みに失敗しました', chrome.runtime.lastError);
      return;
    }
    if (items.geminiApiKey) {
      input.value = items.geminiApiKey;
    }
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    const newKey = input.value;
    chrome.storage.local.set({ geminiApiKey: newKey }, () => {
      if (chrome.runtime.lastError) {
        console.error('APIキーの保存に失敗しました', chrome.runtime.lastError);
        alert(`保存に失敗しました: ${chrome.runtime.lastError.message}`);
        return;
      }
      chrome.storage.local.get(['geminiApiKey'], (items) => {
        if (chrome.runtime.lastError) {
          console.error('保存後の確認に失敗しました', chrome.runtime.lastError);
          alert(`保存後の確認に失敗しました: ${chrome.runtime.lastError.message}`);
          return;
        }
        if (items.geminiApiKey === newKey) {
          alert('保存しました');
        } else {
          console.error('保存された値が一致しません', { saved: items.geminiApiKey, expected: newKey });
          alert('保存された値が正しくありません');
        }
      });
    });
  });
});
