
export const getTimeOfDay = (hours= new Date().getHours()) : 'night' | 'morning' | 'day' | 'evening' | undefined => {
    if (0 <= hours && hours < 6) {
        return 'night';
    }
    if (6 <= hours && hours < 11) {
        return 'morning';
    }
    if (11 <= hours && hours < 17) {
        return 'day';
    }
    if (17 <= hours && hours < 24) {
        return 'evening';
    }
    return undefined;
}