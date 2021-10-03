export const useTokenizeText = (
  untransformedText: string
): readonly [
  [
    {
      t: string;
      v: string;
    }
  ]
] => {
  const tokens = [] as unknown as [
    {
      t: string;
      v: string;
    }
  ];

  function isMention(text: string): boolean {
    if (text.substr(0, 1) === "@") {
      return true;
    }
    return false;
  }

  function isLink(text: string): boolean {
    if (text.substr(0, 4) === "https" || text.substr(0, 4) === "http") {
      return true;
    }
    return false;
  }

  function isHashtag(text: string): boolean {
    if (
      text.substr(0, 1) === "#" &&
      text.length > 1 &&
      text.slice(1).includes("#") === false
    ) {
      return true;
    }
    return false;
  }

  function testToken(item: string): void {
    if (isMention(item)) {
      tokens.push({
        t: "mention",
        v: item,
      });
    } else if (isHashtag(item)) {
      tokens.push({
        t: "hashtag",
        v: item,
      });
    } else if (isLink(item)) {
      tokens.push({
        t: "link",
        v: item,
      });
    } else {
      tokens.push({
        t: "text",
        v: item,
      });
    }
  }

  untransformedText.split(" ").forEach((item) => testToken(item));

  return [tokens] as const;
};
