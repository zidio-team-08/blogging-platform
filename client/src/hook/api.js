import useAxios from "./useAxios";
import toast from "react-hot-toast";
import { handleResponse } from "../utils/responseHandler";

const useApi = () => {
    const { fetchData } = useAxios();
    let toastId = '1';

    // follow and unfollow
    const followUnfollow = async (userId) => {
        try {
            const response = await fetchData({
                url: '/api/user/follow-unfollow',
                method: 'PUT',
                data: { userId },
            });

            const result = handleResponse(response);
            const user = result.data.name || result.data.username;
            if (result.message == 'Followed successfully') {
                toast.success(`You're now following ${user}`, {
                    id: toastId,
                });
            } else if (result.message == 'Unfollowed successfully') {
                toast(`You unfollowed ${user}`, {
                    id: toastId,
                });
            } else {
                toast.error(result.message, {
                    id: toastId,
                });
            }

            return result.data.isFollowing;
        } catch (error) {
            const { message } = handleResponse(error);
            toast.error(message);
        }
    };

    // post comment
    const postComment = async (data) => {
        try {

            const response = await fetchData({
                'url': '/api/comment',
                method: 'POST',
                data
            });

            const { success, message } = handleResponse(response);
            if (success && message == "Comment created successfully") {
                toast.success('Comment added successfully');
            } else {
                toast.error(message);
            }
        } catch (error) {
            const { message } = handleResponse(error);
            toast.error(message);
        }
    }

    // like unlike comment
    const likeUnlikeComment = async (data) => {
        try {
            const response = await fetchData({
                url: '/api/comment/like-unlike',
                method: 'PUT',
                data
            });

            const result = handleResponse(response);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            return result.data.isLiked;
        } catch (error) {
            const { message } = handleResponse(error);
            toast.error(message);
        }
    }

    // like unlike blog
    const likeUnlikeBlog = async (data) => {
        try {
            const response = await fetchData({
                url: '/api/blog/like-unlike',
                method: 'PUT',
                data
            });

            const result = handleResponse(response);
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            return result.data.isLiked;
        } catch (error) {
            const { message } = handleResponse(error);
            toast.error(message);
        }
    }


    return { followUnfollow, postComment, likeUnlikeComment, likeUnlikeBlog };
}

export default useApi;