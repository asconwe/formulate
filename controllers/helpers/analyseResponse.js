
const countUniqueWords = (wordArray, filter = [], counts = {}) => {
    const newWordArray = wordArray.slice(1);
    if (!filter.includes(wordArray[0])) {
        counts[wordArray[0]] = 1; 
        const newFilter = filter.concat([wordArray[0]]);
        return newWordArray.length > 0 ? countUniqueWords(newWordArray, newFilter, counts) : counts;
    }
    counts[wordArray[0]] += 1;
    return newWordArray.length > 0 ? countUniqueWords(newWordArray, filter, counts) : counts;
};

module.exports = {
    separateWords: () => {
        return 'ehy'
    },
    
    countWords = (wordArray) => {
        countUniqueWords(wordArray);
    }
}