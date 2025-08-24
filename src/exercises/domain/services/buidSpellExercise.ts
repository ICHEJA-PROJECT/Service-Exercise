export function buildSpellExercise(name: string) {
  
  const lettersName = [...new Set(name.toUpperCase().split(''))];
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  let options = [...lettersName];
  
  const lettersAux = Math.max(8, lettersName.length * 2);
  
  while (options.length < lettersAux) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    const countLetter = options.filter(letter => letter === randomLetter).length;
    if (countLetter < 2) {
      options.push(randomLetter);
    }
  }
  
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  
  return {
    options: options,
    base_sentence: name
  };
}