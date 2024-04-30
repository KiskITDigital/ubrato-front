export const checkOnlyNumber = (value?: string): string => value ? value.replace(/\D/g, '') : ''

export const addTwoDots = (value: string) => {
    const sanitizedValue = checkOnlyNumber(value)
    let firstTwoDigits = sanitizedValue.slice(0, 2);
    if (+firstTwoDigits >= 24) firstTwoDigits = "23"
    let afterDot = sanitizedValue.slice(2).replace(':', '').slice(0, 2);
    if (+afterDot >= 60) afterDot = "59"
    const formattedValue = (firstTwoDigits.length >= 2 && afterDot) ? `${firstTwoDigits}:${afterDot}` : firstTwoDigits;
    return formattedValue
}

export const checkFloorSpace = (input: string): string => {
    let filteredStr = input
        .replace(/^[.,]+/, '')
        // .replace(/[.,]+$/, '')
        .replace(/[^\d.,]/g, '')
    // const commaInd = filteredStr.indexOf(',', 1)
    const dotInd = filteredStr.indexOf('.', 1)
    let indToCut = 0
    // if (commaInd === -1) {
    //     indToCut = dotInd
    // } else if (dotInd === -1) {
    //     indToCut = commaInd
    // } else {
    //     indToCut = Math.min(commaInd, dotInd)
    // }
    indToCut = dotInd
    filteredStr = filteredStr.slice(0, indToCut + 1) + filteredStr.slice(indToCut + 1).replace(/[^\d]/g, '')
    return filteredStr
};

export const formatFileSize = (bytes: number) => {
    if (bytes < 1024) {
        return bytes + ' б';
    } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' Кб';
    } else if (bytes < 1024 * 1024 * 1024) {
        return (bytes / (1024 * 1024)).toFixed(1) + ' Мб';
    } else {
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' Гб';
    }
}


export const formatDate = (date: Date, time?: string): string => {
    const hours = time?.split(':')[0] || 3
    const minutes = time?.split(':')[1] || 0
    date.setHours(+hours)
    date.setMinutes(+minutes)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.toISOString()
}