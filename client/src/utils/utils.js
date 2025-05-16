export const querySanitizer = (query) => {
    if (typeof query !== 'string') return '';
    return query
        .trim() // Remove extra spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/[^a-zA-Z0-9@_. ]/g, '') // Remove all special characters except @, ., and _
        .toLowerCase();
}

export const formatDate = (date) => {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
};