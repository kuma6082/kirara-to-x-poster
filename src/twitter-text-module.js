// twitter-textライブラリをブラウザで使用するためのモジュール
const twitter = require("twitter-text");

// グローバルオブジェクトに追加してブラウザで使用可能にする
window.twitterText = twitter;
