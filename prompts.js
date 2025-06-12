const SUMMARY_PROMPT_PREFIX = `フォーマットを保ちつつ簡潔に要約してください。
絵文字・構造は維持しつつ、冗長な表現を短縮し、箇条書きの表現を効率化してください。
改行や構成は以下のテンプレートに従ってください。
記号は半角を使用してください。
余計なスペースは付けないで下さい。
`;

const SUMMARY_PROMPT_TEMPLATE = `{日付}
📝取り組み
･{取り組んだこと1}
-{取り組んだこと1-1}
-{取り組んだこと1-2}
･{取り組んだこと2}
-{取り組んだこと2-1}
･{取り組んだこと3}
🔍学び
･{わかったこと1}
･{わかったこと2}
･{わかったこと3}
💭実感
･{感じたこと1}
･{感じたこと2}
⏰{学習時間}h
#HappinessChain
#今日の積み上げ
`;

if (typeof window !== 'undefined') {
  window.SUMMARY_PROMPT_PREFIX = SUMMARY_PROMPT_PREFIX;
  window.SUMMARY_PROMPT_TEMPLATE = SUMMARY_PROMPT_TEMPLATE;
}
