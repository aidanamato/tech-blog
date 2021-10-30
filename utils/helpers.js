module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at ${new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit'})}`;
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`
    }
    return word;
  }
}