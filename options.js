// options.js - Save Gemini API key

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('apiKeyInput');

  // Load existing API key
  chrome.storage.local.get(['geminiApiKey'], (items) => {
    if (items.geminiApiKey) {
      input.value = items.geminiApiKey;
    }
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    chrome.storage.local.set({ geminiApiKey: input.value }, () => {
      alert('保存しました');
    });
  });
});
