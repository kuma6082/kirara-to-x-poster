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

  const xpathH2 = "/html/body/main/div/div[2]/h2";
  const resultH2 = document.evaluate(
    xpathH2,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  const h2Element = resultH2.singleNodeValue;

  let output = "";

  if (h2Element) {
    output += `${h2Element.innerText}-学習記録\n`;
  }

  if (targetElement) {
    targetElement.childNodes.forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName.toLowerCase() === "h3") {
          switch (child.innerText) {
            case "取り組んだこと":
              output += "📝 取り組んだこと\n";
              break;
            case "わかったこと":
              output += "🔍 わかったこと\n";
              break;
            case "感じたこと":
              output += "💭 感じたこと\n";
              break;
            case "学習時間":
              output += "⏰ 学習時間\n";
              break;
          }
        } else if (child.tagName.toLowerCase() === "ul") {
          const liElements = child.querySelectorAll("li");
          liElements.forEach((li) => {
            output += `•${li.innerText}\n`;
          });
        } else {
          output += `${child.innerText}\n`;
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
