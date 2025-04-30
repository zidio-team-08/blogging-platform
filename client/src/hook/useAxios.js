import { axiosInstance } from '../utils/axiosInstance';

const useAxios = () => {
    const fetchData = async ({
        url,
        method,
        data,
        headers = {
            'Content-Type': 'application/json',
        }
    }) => {
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                headers,
            });
            return response.data;
        } catch (error) {

            const message = error.response?.data?.message || error.message || 'Something went wrong';
            return { success: false, message };

            // if (error.response) {
            //     console.error('Response error:', error.response.data);
            //     return { message: error.response.data, status: error.response.status };
            // } else if (error.request) {
            //     console.error('Request error:', error.request);
            //     return { message: 'No response from server', status: 0 };
            // } else {
            //     return { message: error.message, status: 0 };
            // }
        }
    };

    return { fetchData };
}

export default useAxios;
