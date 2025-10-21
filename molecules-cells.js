const RNA = (dna) => {
  let result = '';
  for (let i = 0; i < dna.length; i++) {
    const c = dna[i];
    if (c === 'G') result += 'C';
    else if (c === 'C') result += 'G';
    else if (c === 'T') result += 'A';
    else if (c === 'A') result += 'U';
  }
  return result;
};

const DNA = (rna) => {
  let result = '';
  for (let i = 0; i < rna.length; i++) {
    const c = rna[i];
    if (c === 'C') result += 'G';
    else if (c === 'G') result += 'C';
    else if (c === 'A') result += 'T';
    else if (c === 'U') result += 'A';
  }
  return result;
};
