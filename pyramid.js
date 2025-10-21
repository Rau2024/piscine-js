const pyramid = (char, height) => {
  let result = '';
  const charWidth = char.length;

  for (let i = 1; i <= height; i++) {
    const levelWidth = (2 * i - 1) * charWidth;
    const totalWidth = (2 * height - 1) * charWidth;
    const spaces = ' '.repeat((totalWidth - levelWidth) / 2);
    const chars = char.repeat(2 * i - 1);
    result += spaces + chars;
    if (i !== height) result += '\n';
  }

  return result;
};
