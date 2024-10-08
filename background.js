chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "runModal") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: runModal,
        },
        (results) => {
          if (results && results[0]) {
            sendResponse(results[0].result);
          }
        }
      );
    });
    return true; // 非同期レスポンスを許可
  }
});

function runModal() {
  const xpathDocu = "/html/body/main/div/div[2]/div[3]/div";
  const resultDocu = document.evaluate(
    xpathDocu,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  const targetElement = resultDocu.singleNodeValue;

  let output = "";

  // 日付を追加（例として固定の日付にしてますが、現在日付にする場合はDateオブジェクトを使用）
  const today = new Date();
  const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;
  output += `${formattedDate}\n`;

  if (targetElement) {
    let skipSection = false;
    targetElement.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName.toLowerCase() === "h3") {
          // 「次やること」セクションとそれに付随する内容をスキップする
          if (child.innerText === "次やること") {
            skipSection = true;
            return;
          } else {
            skipSection = false;
          }
          switch (child.innerText) {
            case "取り組んだこと":
              output += "📝取り組んだこと\n";
              break;
            case "わかったこと":
              output += "🔍わかったこと\n";
              break;
            case "感じたこと":
              output += "💭感じたこと\n";
              break;
            case "学習時間":
              output += "⏰学習時間\n";
              break;
          }
        } else if (!skipSection) {
          if (child.tagName.toLowerCase() === "ul") {
            const liElements = child.querySelectorAll("li");
            liElements.forEach((li) => {
              output += `•${li.innerText}\n`;
            });
          } else {
            output += `${child.innerText}\n`;
          }
        }
      }
    });

    output += "#HappinessChain\n";
    output += "#今日の積み上げ";
  } else {
    output = "指定されたXPath要素が見つかりませんでした";
  }

  // 改行は残し、半角・全角スペースを削除
  output = output.replace(/[ \u3000]+/g, ""); // 半角スペース（' '）と全角スペース（'\u3000'）を削除

  return { output: output };
}