const SUMMARY_PROMPT_PREFIX = `以下のテキストを投稿用フォーマットを保ったまま簡潔に要約してください
できるだけ半角を使ってください
改行は連続で使わないで下さい
`;

const SUMMARY_PROMPT_TEMPLATE = `{日付}
📝取り組み
・{取り組んだこと1}
-{取り組んだこと1-1}
-{取り組んだこと1-2}
・{取り組んだこと2}
-{取り組んだこと2-1}
・{取り組んだこと3}
🔍学び
・{わかったこと1}
・{わかったこと2}
・{わかったこと3}
💭実感
・{感じたこと1}
・{感じたこと2}
⏰{学習時間}h
#HappinessChain
#今日の積み上げ
`;

if (typeof window !== 'undefined') {
  window.SUMMARY_PROMPT_PREFIX = SUMMARY_PROMPT_PREFIX;
  window.SUMMARY_PROMPT_TEMPLATE = SUMMARY_PROMPT_TEMPLATE;
}
