function formatRelativeTime(dateString: Date) {
    const date: Date = new Date(dateString);
    const now: Date = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) {
        return `${diffInSeconds} s ago`;
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)} m ago`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)} h ago`;
    } else {
        return `${Math.floor(diffInSeconds / 86400)} d ago`;
    }
}
export default formatRelativeTime


export function formatMongoDate(mongoDate:Date) {
    const date = new Date(mongoDate);
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
}
