function formatTime(inputTime) {
    const currentTime = new Date();
    const inputDate = new Date(inputTime);
  
    // Check if the input date is today
    if (
      inputDate.getDate() === currentTime.getDate() &&
      inputDate.getMonth() === currentTime.getMonth() &&
      inputDate.getFullYear() === currentTime.getFullYear()
    ) {
      return 'today (' + formatAMPM(inputDate) + ')';
    }
  
    // Check if the input date is yesterday
    const yesterday = new Date(currentTime);
    yesterday.setDate(currentTime.getDate() - 1);
    if (
      inputDate.getDate() === yesterday.getDate() &&
      inputDate.getMonth() === yesterday.getMonth() &&
      inputDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'yesterday (' + formatAMPM(inputDate) + ')';
    }
  
    // If not today or yesterday, return the original formatted time
    return inputTime;
  }
  
  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  
export { formatTime };
  