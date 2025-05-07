# Blog API Documentation

This document provides an overview of the APIs available for managing blogs in the application.

## Base URL
```
http://<your-server-domain>/api/blog
```

---

## 1. Create a New Blog Story

### Endpoint
```
POST /create-blog
```

### Description
Creates a new blog story with a title, content, tags, and an optional banner image.

### Request Headers
 `Authorization`: Bearer `<JWT Token>`

### Request Body (Form Data)
| Field        | Type     | Required | Description                     |
|--------------|----------|----------|---------------------------------|
| `title`      | `string` | Yes      | Title of the blog.              |
| `content`    | `string` | Yes      | Content of the blog.            |
| `tags`       | `array`  | Yes      | Tags related to the blog.       |
| `bannerImage`| `file`   | Optional | Banner image for the blog.      |

### Response
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

## 2. Get Blogs

### Endpoint
```
GET /get-blogs
```

### Description
Fetches a paginated list of blogs.

### Query Parameters
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `page`    | `number` | Optional | Page number (default: 1).       |
| `limit`   | `number` | Optional | Number of blogs per page (default: 10). |

### Response
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

## 3. Edit Blog

### Endpoint
```
PUT /edit-blog
```

### Description
Edits an existing blog post.

### Request Headers
- `Authorization`: Bearer `<JWT Token>`

### Request Body (Form Data)
| Field        | Type     | Required | Description                     |
|--------------|----------|----------|---------------------------------|
| `blogId`     | `string` | Yes      | ID of the blog to edit.         |
| `title`      | `string` | Optional | Updated title of the blog.      |
| `content`    | `string` | Optional | Updated content of the blog.    |
| `tags`       | `array`  | Optional | Updated tags for the blog.      |
| `bannerImage`| `file`   | Optional | Updated banner image.           |

### Response
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

## 4. Delete Blog

### Endpoint
```
DELETE /delete-blog/:id
```

### Description
Deletes a blog post.

### Request Headers
- `Authorization`: Bearer `<JWT Token>`

### Path Parameters
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `id`      | `string` | Yes      | ID of the blog to delete.       |

### Response
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

## 5. Like/Unlike Blog

### Endpoint
```
PUT /like-unlike
```

### Description
Toggles the like status of a blog post.

### Request Headers
- `Authorization`: Bearer `<JWT Token>`

### Request Body
| Field   | Type     | Required | Description                     |
|---------|----------|----------|---------------------------------|
| `blogId`| `string` | Yes      | ID of the blog to like/unlike.  |

### Response
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

## 6. Search Blogs

### Endpoint
```
GET /search
```

### Description
Searches for blogs by title or tags.

### Query Parameters
| Parameter | Type     | Required | Description                     |
|-----------|----------|----------|---------------------------------|
| `query`   | `string` | Yes      | Search query.                   |

### Response
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

## Notes
- All endpoints requiring authentication must include a valid JWT token in the `Authorization` header.
- Ensure that the `bannerImage` file is uploaded as `multipart/form-data` where applicable.

Feel free to reach out if you have any questions or need further clarification!
