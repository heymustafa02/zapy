
// export function parse(text: string, values: any, startDelimeter = "{", endDelimeter = "}") {
//     // You received {comment.amount} momey from {comment.link}
//     let startIndex = 0;
//     let endIndex = 1;

//     let finalString = "";
//     while (endIndex < text.length) {
//         if (text[startIndex] === startDelimeter) {
//             let endPoint = startIndex + 2;
//             while (text[endPoint] !== endDelimeter) {
//                 endPoint++;
//             }
//             // 
//             let stringHoldingValue = text.slice(startIndex + 1, endPoint);
//             const keys = stringHoldingValue.split(".");
//             let localValues = {
//                 ...values
//             }
//             for (let i = 0; i < keys.length; i++) {
//                 if (typeof localValues === "string") {
//                     localValues = JSON.parse(localValues);
//                 }
//                 localValues = localValues[keys[i]];
//             }
//             finalString += localValues;
//             startIndex = endPoint + 1;
//             endIndex = endPoint + 2;
//         } else {
//             finalString += text[startIndex];
//             startIndex++;
//             endIndex++;
//         }
//     }
//     if (text[startIndex]) {
//         finalString += text[startIndex]
//     }
//     return finalString;
// }



// export function parse(text: string, values: any, startDelimeter = "{", endDelimeter = "}") {
//     // ❗ Prevent crash if text is null/undefined
//     if (!text) return "";

//     let startIndex = 0;
//     let endIndex = 1;

//     let finalString = "";
//     while (endIndex < text.length) {
//         if (text[startIndex] === startDelimeter) {
//             let endPoint = startIndex + 2;

//             // ❗ Prevent infinite loop AND crash if '}' missing
//             while (endPoint < text.length && text[endPoint] !== endDelimeter) {
//                 endPoint++;
//             }

//             // If no closing delimiter found, append rest and break
//             if (endPoint >= text.length) {
//                 finalString += text.slice(startIndex);
//                 break;
//             }

//             let stringHoldingValue = text.slice(startIndex + 1, endPoint);
//             const keys = stringHoldingValue.split(".");
//             let localValues = { ...values };

//             for (let i = 0; i < keys.length; i++) {
//                 if (typeof localValues === "string") {
//                     try {
//                         localValues = JSON.parse(localValues);
//                     } catch {
//                         localValues = "";
//                     }
//                 }

//                 // ❗ Prevent "Cannot read properties of undefined"
//                 if (localValues && keys[i] in localValues) {
//                     localValues = localValues[keys[i]];
//                 } else {
//                     localValues = "";
//                     break;
//                 }
//             }

//             finalString += localValues;
//             startIndex = endPoint + 1;
//             endIndex = endPoint + 2;
//         } else {
//             finalString += text[startIndex];
//             startIndex++;
//             endIndex++;
//         }
//     }

//     if (text[startIndex]) {
//         finalString += text[startIndex];
//     }

//     return finalString;
// }
export function parse(
  text: string,
  values: any,
  startDelimeter = "{",
  endDelimeter = "}"
) {
  if (!text || typeof text !== "string") return "";

  return text.replace(/\{([^}]+)\}/g, (_match, keyPath) => {
    try {
      const keys = keyPath.split(".");
      let cur: any = values;

      for (const k of keys) {
        if (cur == null) {
          cur = undefined;
          break;
        }

        // If cur is JSON string, try parsing once
        if (typeof cur === "string") {
          try {
            const t = cur.trim();
            if (t.startsWith("{") || t.startsWith("[")) {
              cur = JSON.parse(cur);
            }
          } catch {}
        }

        cur = cur[k];
      }

      if (cur === null || cur === undefined) return "";
      return String(cur);
    } catch {
      return "";
    }
  });
}
