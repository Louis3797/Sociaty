export const useTokenToText = (
  tokens: [
    {
      t: string;
      v: string;
    }
  ]
): readonly [string] => {
  let text: string = "";

  let tempArray: string[] = [];

  tokens.forEach((token, i) => {
    if (token.t === "link") {
      tempArray[i] = `<a href="${token.v}">${token.v}</a>`;
    } else if (token.t === "mention") {
      tempArray[i] = `<a href="/u/${token.v.substring(1)}">${token.v}</a>`;
    } else if (token.t === "hashtag") {
      tempArray[i] = `<a href="/tag/${encodeURIComponent(
        decodeURIComponent(token.v).slice(1)
      )}">${token.v}</a>`;
    } else {
      tempArray[i] = `${token.v}`;
    }
  });

  text = ("<span>" + tempArray.join(" ") + "</span>").trim();

  return [text] as const;
};
