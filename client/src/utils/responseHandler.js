export const handleResponse = (response) => {
    const success = response?.data?.success || response?.success || false;
    const message = response?.data?.message || response?.message || 'Something went wrong';

    return { success, message };
};