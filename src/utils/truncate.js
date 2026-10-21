export function truncate(string , maxLength) {
    if (string.length > maxLength) {
        const lastSpaceIndex = string.slice(0, maxLength).lastIndexOf(" ")
        if (lastSpaceIndex === -1) {
            return string.slice(0,maxLength)+"..."
        }
        const truncateString = string.slice(0 ,lastSpaceIndex)
        return truncateString+'...'
    }
    return string
}