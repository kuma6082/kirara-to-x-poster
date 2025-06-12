const KIRARA_URL_PREFIX =
  "https://kirara-code.net/HappinessChain/reports/";

// タブのURL変更時に拡張機能の有効/無効を切り替える
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.startsWith(KIRARA_URL_PREFIX)) {
      chrome.action.enable(tabId);
    } else {
      chrome.action.disable(tabId);
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "runModal") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error("tabs.query failed", chrome.runtime.lastError);
        sendResponse({ error: chrome.runtime.lastError.message });
        return;
      }
      if (!tabs[0]) {
        sendResponse({ error: "No active tab found" });
        return;
      }
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: runModal,
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error("executeScript failed", chrome.runtime.lastError);
            sendResponse({ error: chrome.runtime.lastError.message });
            return;
          }
          if (results && results[0]) {
            sendResponse(results[0].result);
          } else {
            sendResponse({ error: "No result" });
          }
        }
      );
    });
    return true; // 非同期レスポンスを許可
  }
});

function runModal() {
  const xpathDocu = "/html/body/main/div/div[2]/div[4]/div";
  const resultDocu = document.evaluate(xpathDocu, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const targetElement = resultDocu.singleNodeValue;

  let output = "";

  const xpathH2 = "/html/body/main/div/div[2]/div[2]/h2";
  const resultH2 = document.evaluate(xpathH2, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  const h2Element = resultH2.singleNodeValue;
  if (h2Element) {
    output += `${h2Element.innerText.substring(0, 10)}\n`;
  }

  if (!targetElement) {
    output += "指定されたXPath要素が見つかりませんでした";
    return { output };
  }

  let skipSection = false;

  const processList = (ulElement, level = 0) => {
    const liElements = ulElement.querySelectorAll(":scope > li");
    liElements.forEach((li) => {
      const directText = Array.from(li.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== "")
        .map(n => n.textContent.trim())
        .join(" ");

      if (directText) {
        const bullet = level === 0 ? "･" : "-";
        output += `${bullet} ${directText}\n`;
      }

      const childUls = Array.from(li.children).filter(el => el.tagName?.toLowerCase() === "ul");
      childUls.forEach(childUl => {
        processList(childUl, level + 1); // インデントは無視、レベルだけでbullet変更
      });
    });
  };

  const walkNodes = (nodes) => {
    nodes.forEach((child) => {
      if (child.nodeType !== Node.ELEMENT_NODE) return;

      if (child.tagName.toLowerCase() === "h3") {
        const title = child.innerText.trim();
        if (title === "次やること") {
          skipSection = true;
          return;
        } else {
          skipSection = false;
        }

        switch (title) {
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
          processList(child);
        } else if (child.tagName.toLowerCase() === "p") {
          output += `･${child.innerText.trim()}\n`;
        }
      }
    });
  };

  walkNodes([...targetElement.childNodes]);

  output += "#HappinessChain\n#今日の積み上げ";
  output = output.replace(/[ \u3000]+/g, ""); // 全角・半角スペース削除（改行維持）

  return { output };
}
