// Returns punctuationless array of words from a text block
const makeArrayOfWords = (text) => { 
	const punctuationlessText = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+]/g, ''); 
	const finalText = punctuationlessText.replace(/\s{2,}/g," ");
	const newArray = finalText.split(" ");
	return newArray;
};


const countUniqueWords = (wordArray, filter = [], counts = {}) => {
    const newWordArray = wordArray.slice(1);
    if (!filter.includes(wordArray[0].toLowerCase())) {
        counts[wordArray[0].toLowerCase()] = 1; 
        const newFilter = filter.concat([wordArray[0].toLowerCase()]);
        return newWordArray.length > 0 ? countUniqueWords(newWordArray, newFilter, counts) : counts;
    }
    counts[wordArray[0].toLowerCase()] += 1;
    return newWordArray.length > 0 ? countUniqueWords(newWordArray, filter, counts) : counts;
};

module.exports = {
    makeArrayOfWords,
    countWords: (wordArray) => {
        return countUniqueWords(wordArray);
    }
}