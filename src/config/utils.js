import dayjs from "dayjs";

 const getTime = ((date) => {
    const month = dayjs(date).$M
    const day = dayjs(date).$D
    let monthEn = ''
    switch (month) {
        case 0:
            monthEn = 'Jan'
            break;
        case 1:
            monthEn = 'Feb'
            break;
        case 2:
            monthEn = 'Mar'
            break;
        case 3:
            monthEn = 'Apr'
            break;
        case 4:
            monthEn = 'May'
            break;
        case 5:
            monthEn = 'Jun'
            break;
        case 6:
            monthEn = 'Jul'
            break;
        case 7:
            monthEn = 'Aug'
            break;
        case 8:
            monthEn = 'Sep'
            break;
        case 9:
            monthEn = 'Oct'
            break;
        case 10:
            monthEn = 'Nov'
            break;
        case 11:
            monthEn = 'Dec'
    }
    return (`${monthEn}\xa0${day}`)
})
 const exactTime = ((date) => {
     const once = getTime(date)
     const time = dayjs(date)
     const Year = time.$y
     return(`${once},\xa0${Year}`)
 })
export {
     getTime,exactTime
}
