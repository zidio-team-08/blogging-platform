# Blog API Documentation

This document provides an overview of the APIs available for managing blogs, authentication, bookmarks, comments, and user profiles in the application.

## Base URL
```
http://<your-server-domain>/api
```

---

## Blog APIs

### 1. Create a New Blog Story

**Endpoint:**
```
POST /blog/create-blog
```

**Description:** Creates a new blog story with a title, content, tags, and an optional banner image.

**Request Headers:**
 `Authorization`: Bearer `<JWT Token>`

**Request Body (Form Data):**
| Field        | Type     | Required | Description                     |
|--------------|----------|----------|---------------------------------|
| `title`      | `string` | Yes      | Title of the blog.              |
| `content`    | `string` | Yes      | Content of the blog.            |
| `tags`       | `array`  | Yes      | Tags related to the blog.       |
| `bannerImage`| `file`   | Optional | Banner image for the blog.      |

**Response:**
```json
{
  "success": true,
  "message": "Story created successfully",
  "data": {
    "id": "blogId",
    "title": "Blog Title",
    "content": "Blog Content",
    "tags": ["tag1", "tag2"],
    "author": "authorId",
    "bannerImage": "imageUrl",
    "likes": 0,
    "comments": 0,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

---

### 2. Get Blogs

**Endpoint:**
```
GET /blog/get-blogs
```

**Description:** Fetches a paginated list of blogs.

**Query Parameters:**
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `page`    | `number` | Optional | Page number (default: 1).       |
| `limit`   | `number` | Optional | Number of blogs per page (default: 10). |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "blogId",
      "title": "Blog Title",
      "content": "Blog Content",
      "tags": ["tag1", "tag2"],
      "author": {
        "name": "Author Name",
        "username": "Author Username",
        "profileImage": "imageUrl"
      },
      "likes": 0,
      "comments": 0,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "totalPages": 5
}
```

---

### 3. Edit Blog

**Endpoint:**
```
PUT /blog/edit-blog
```

**Description:** Edits an existing blog post.

**Request Headers:**
- `Authorization`: Bearer `<JWT Token>`

**Request Body (Form Data):**
| Field        | Type     | Required | Description                     |
|--------------|----------|----------|---------------------------------|
| `blogId`     | `string` | Yes      | ID of the blog to edit.         |
| `title`      | `string` | Optional | Updated title of the blog.      |
| `content`    | `string` | Optional | Updated content of the blog.    |
| `tags`       | `array`  | Optional | Updated tags for the blog.      |
| `bannerImage`| `file`   | Optional | Updated banner image.           |

**Response:**
```json
{
  "success": true,
  "message": "Post updated successfully",
  "data": {
    "id": "blogId",
    "title": "Updated Title",
    "content": "Updated Content",
    "tags": ["tag1", "tag2"],
    "bannerImage": "imageUrl",
    "likes": 0,
    "comments": 0,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

---

### 4. Delete Blog

**Endpoint:**
```
DELETE /blog/delete-blog/:id
```

**Description:** Deletes a blog post.

**Request Headers:**
- `Authorization`: Bearer `<JWT Token>`

**Path Parameters:**
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `id`      | `string` | Yes      | ID of the blog to delete.       |

**Response:**
```json
{
  "success": true,
  "message": "Post deleted successfully",
  "data": {
    "id": "blogId"
  }
}
```

---

### 5. Like/Unlike Blog

**Endpoint:**
```
PUT /blog/like-unlike
```

**Description:** Toggles the like status of a blog post.

**Request Headers:**
- `Authorization`: Bearer `<JWT Token>`

**Request Body:**
| Field   | Type     | Required | Description                     |
|---------|----------|----------|---------------------------------|
| `blogId`| `string` | Yes      | ID of the blog to like/unlike.  |

**Response:**
```json
{
  "success": true,
  "message": "Post liked successfully",
  "data": {
    "blogId": "blogId",
    "likes": 10
  }
}
```

---

### 6. Search Blogs

**Endpoint:**
```
GET /blog/search
```

**Description:** Searches for blogs by title or tags.

**Query Parameters:**
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `query`   | `string` | Yes      | Search query.                   |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "blogId",
      "title": "Blog Title",
      "author": {
        "id": "authorId",
        "name": "Author Name",
        "username": "Author Username",
        "profileImage": "imageUrl"
      },
      "tags": ["tag1", "tag2"],
      "bannerImage": "imageUrl",
      "comments": 0,
      "likes": 0,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

---

## Authentication APIs

### 1. Signup
**Endpoint:**
```
POST /auth/signup
```
**Description:** Creates a new user account.
**Request Body:**
| Field     | Type     | Required | Description              |
|-----------|----------|----------|--------------------------|
| `name`    | `string` | Yes      | Full name of the user.   |
| `email`   | `string` | Yes      | Email address.           |
| `username`| `string` | Yes      | Unique username.         |
| `password`| `string` | Yes      | Password for the account.|

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "JWT Token",
  "user": {
    "id": "userId",
    "name": "User Name",
    "email": "user@example.com",
    "username": "@username",
    "role": "user"
  }
}
```

### 2. Login
**Endpoint:**
```
POST /auth/login
```
**Description:** Logs in a user.
**Request Body:**
| Field     | Type     | Required | Description              |
|-----------|----------|----------|--------------------------|
| `email`   | `string` | Optional | Email address.           |
| `username`| `string` | Optional | Username.                |
| `password`| `string` | Yes      | Password for the account.|

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "JWT Token",
  "user": {
    "id": "userId",
    "name": "User Name",
    "email": "user@example.com",
    "username": "@username",
    "role": "user"
  }
}
```

### 3. Logout
**Endpoint:**
```
GET /auth/logout
```
**Description:** Logs out the user by clearing the session token.
**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Bookmark APIs

### 1. Add/Remove Bookmark
**Endpoint:**
```
PUT /bookmark/add-remove
```
**Description:** Toggles the bookmark status of a blog post.
**Request Body:**
| Field   | Type     | Required | Description              |
|---------|----------|----------|--------------------------|
| `blogId`| `string` | Yes      | ID of the blog to bookmark/unbookmark.|

**Response:**
```json
{
  "success": true,
  "message": "Bookmark added/removed successfully",
  "data": {
    "id": "bookmarkId",
    "blogId": "blogId",
    "userId": "userId"
  }
}
```

### 2. Get All Bookmarks
**Endpoint:**
```
GET /bookmark
```
**Description:** Fetches all bookmarks for the logged-in user.
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bookmarkId",
      "blogId": "blogId",
      "title": "Blog Title",
      "author": "Author Name",
      "createdAt": "timestamp"
    }
  ]
}
```

---

## Comment APIs

### 1. Create Comment
**Endpoint:**
```
POST /comment
```
**Description:** Adds a new comment to a blog post.
**Request Body:**
| Field   | Type     | Required | Description              |
|---------|----------|----------|--------------------------|
| `blogId`| `string` | Yes      | ID of the blog to comment on.|
| `content`| `string`| Yes      | Content of the comment.  |

**Response:**
```json
{
  "success": true,
  "message": "Comment created successfully",
  "data": {
    "id": "commentId",
    "content": "Comment content",
    "author": "userId",
    "createdAt": "timestamp"
  }
}
```

### 2. Fetch Comments
**Endpoint:**
```
GET /comment/:blogId
```
**Description:** Fetches all comments for a specific blog post.
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "commentId",
      "content": "Comment content",
      "author": "Author Name",
      "createdAt": "timestamp"
    }
  ]
}
```

---

## User APIs

### 1. Get Profile
**Endpoint:**
```
GET /user
```
**Description:** Fetches the profile of the logged-in user.
**Response:**
```json
{
  "success": true,
  "data": {
    "id": "userId",
    "name": "User Name",
    "email": "user@example.com",
    "username": "@username",
    "bio": "User bio",
    "followers": 10,
    "following": 5
  }
}
```

### 2. Update Profile
**Endpoint:**
```
PUT /user/update-profile
```
**Description:** Updates the profile of the logged-in user.
**Request Body:**
| Field       | Type     | Required | Description              |
|-------------|----------|----------|--------------------------|
| `name`      | `string` | Optional | Updated name.            |
| `username`  | `string` | Optional | Updated username.        |
| `bio`       | `string` | Optional | Updated bio.             |
| `socialLinks`| `object`| Optional | Updated social links.    |

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "userId",
    "name": "Updated Name",
    "username": "@updatedUsername",
    "bio": "Updated bio"
  }
}
```

### 3. Change Password
**Endpoint:**
```
PUT /user/change-password
```
**Description:** Changes the password of the logged-in user.
**Request Body:**
| Field         | Type     | Required | Description              |
|---------------|----------|----------|--------------------------|
| `oldPassword` | `string` | Yes      | Current password.        |
| `newPassword` | `string` | Yes      | New password.            |

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### 4. Follow/Unfollow User
**Endpoint:**
```
PUT /user/follow-unfollow
```
**Description:** Toggles the follow status of another user.
**Request Body:**
| Field   | Type     | Required | Description              |
|---------|----------|----------|--------------------------|
| `userId`| `string` | Yes      | ID of the user to follow/unfollow.|

**Response:**
```json
{
  "success": true,
  "message": "Followed/Unfollowed successfully",
  "data": {
    "following": 5,
    "followers": 10
  }
}
```

---

## Notes
- All endpoints requiring authentication must include a valid JWT token in the `Authorization` header.
- Ensure that file uploads are sent as `multipart/form-data` where applicable.

Feel free to reach out if you have any questions or need further clarification!
