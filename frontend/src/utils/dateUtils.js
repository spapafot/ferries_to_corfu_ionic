export const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getDayFromDateString = (date) => {
    let parts = date.split('-');
    let newDate = new Date(parts[0], parts[1] - 1, parts[2]);
    let options = { weekday: 'long' };
    let day = new Intl.DateTimeFormat('en-US', options).format(newDate)

    return day
}

export const changeDay = (date, action) => {
    let parts = date.split('-');
    let newDate = new Date(parts[0], parts[1] - 1, parts[2]);

    if (action === '+') {
        newDate.setDate(newDate.getDate() + 1)
    }
    if (action === '-') {
        newDate.setDate(newDate.getDate() - 1)
    }
    const strDate = formatDate(newDate)
    return strDate
}

export const reverseDate = (date) => {
    let reversed = date.split('-').reverse();
    reversed.splice(1, 0, '-')
    reversed.splice(3, 0, '-')
    return reversed
}

export const convertUnixTimestamp = (timestamp) => {
    const localized = new Date(timestamp * 1e3); // 1e3 === 1000
    
    let year = localized.getFullYear()
    let month = localized.getMonth() 
    let day = localized.getDate()
    let hour = localized.getHours()
    let min = localized.getMinutes()
    let sec = localized.getSeconds()
        
    return new Date(year, month, day, hour, min, sec)
}




