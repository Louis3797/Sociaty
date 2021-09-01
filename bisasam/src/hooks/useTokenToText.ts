export const useTokenToText = (
  tokens: [
    {
      t: string;
      v: string;
    }
  ]
) => {
  let text: string = "";

  let tempArray: string[] = [];

  tokens.forEach((token, i) => {
    if (token.t === "link") {
      tempArray[i] = `<a href="${token.v}">${token.v}</a>`;
    } else if (token.t === "mention") {
      tempArray[i] = `<a href="/u/${token.v.substring(1)}">${token.v}</a>`;
    } else if (token.t === "hashtag") {
      tempArray[i] = `<a href="/tag/${token.v}">${token.v}</a>`;
    } else {
      tempArray[i] = `<p>${token.v}</p>`;
    }
  });

  text = ("<span>" + tempArray.join(" ") + "</span>").trim();

  return [text] as const;
};
