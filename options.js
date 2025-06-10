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
    chrome.storage.local.set({ geminiApiKey: input.value }, () => {
      if (chrome.runtime.lastError) {
        console.error('APIキーの保存に失敗しました', chrome.runtime.lastError);
        alert('保存に失敗しました');
      } else {
        alert('保存しました');
      }
    });
  });
});
