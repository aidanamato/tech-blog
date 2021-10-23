module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()} at ${new Date(date).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit'})}`;
  }
}