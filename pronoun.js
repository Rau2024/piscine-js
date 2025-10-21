function pronoun(str) {
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'they', 'we'];
  const words = str.toLowerCase().split(/\s+/);
  const result = {};

  for (let i = 0; i < words.length; i++) {
    const word = words[i].replace(/[^\w]/g, '');

    if (pronouns.includes(word)) {
      if (!result[word]) {
        result[word] = {
          word: [],
          count: 0
        };
      }

      result[word].count++;

      if (i + 1 < words.length) {
        const nextWord = words[i + 1].replace(/[^\w]/g, '');
        if (!pronouns.includes(nextWord)) {
          result[word].word.push(nextWord);
        }
      }
    }
  }

  return result;
}