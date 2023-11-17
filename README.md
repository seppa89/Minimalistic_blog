# RESTFull-API-blog

Stack:

- Node
- Express
- Mongoose
- Passport-local strategy

## Cookie session auth

## Endpoints:

Users:

    User Register:
        POST /api/users/register
        Request Body: { "username": string, "password": string }
        Response Body:
            201 / { "message": string, "success": boolean }
            400 / { "error": string, "success": boolean }
            401 / { "error": string, "success": boolean }
            409 / { "error": string, "success": boolean }
            500 / { "error": string, "success": boolean }

    User Login:
        POST /api/users/login
        Request Body: { "username": string, "password": string }
        Response Body:
            200 / { "message": string, "success": boolean, "user": string }
            400 / { "error": string, "success": boolean }
            401 / { "error": string, "success": boolean }
            500 / { "error": string, "success": boolean, "user": string }

    User Logout:
        GET /api/users/logout
        Response Body:
            200 / { "message": string, "success": boolean}
            401 / { "error": string, "success": boolean }

    User Session:
        GET /api/users/check-session (Checking if user is authorized)
        Response Body:
          200 / { "message": string, "user": string }
          401 / { "error": string, "success": boolean }

Posts:

    Get all posts:
        GET /api/posts
        Response Body:
          200 / Post[]
          500 / { "message": string, "success": boolean }

    Get a specific post:
        GET /api/posts/:postId
        Response Body:
          200 / Post / null
          500 / { error: string }


    Create a new post: authentication required
        POST /api/post:
        Request Body: { "title": string, "content": string }
        Response Body:
          201 / {"message": string, "success": boolean}
          400 / {"message": string, "success": boolean}
          401 / {"message": string, "success": boolean}
          500 / {"message": string, "success": boolean}


    Update a post: authentication required
        PUT /api/posts/:postId
        Request Body: { "title": string, "content": string }
        Response Body:
          200 / {"message": string, "success": boolean}
          400 / {"message": string, "success": boolean}
          500 / {"message": string, "success": boolean}

    Delete a post: authentication required
        DELETE /api/posts/:postId
        Response Body:
          200 / {"message": string, "success": boolean}
          500 / {"message": string, "success": boolean}

Comments:

    Get all comments for a post:
        GET /api/comments/:postId
        Response Body:
          200 / Comment[]
          500 / { "error": string }

    Create a new comment: authentication required
        POST /api/posts/:postId/comments
        Request Body: { "content": "Comment Content" }
        Response Body:
          200 / { "message": string, "success": boolean}
          401 / { "message": string, "success": boolean}
          500 / { "message": string, "success": boolean}

    Update a comment: authentication required
        PUT /api/posts/:postId/comments/:commentId
        Request Body: { "content": string }
        Response Body:
          200 / { "message": string, "success": boolean}
          401 / { "message": string, "success": boolean}
          500 / { "message": string, "success": boolean}

    Delete a comment: authentication required
        DELETE /api/posts/:postId/comments/:commentId
        200 / { "message": string, "success": boolean}
        401 / { "message": string, "success": boolean }
        500 / { "message": string, "success": boolean}

Votes: (Work in Progress)

    Upvote a post:
        POST /api/posts/:postId/upvote

    Downvote a post:
        POST /api/posts/:postId/downvote

    Upvote a comment:
        POST /api/posts/:postId/comments/:commentId/upvote

    Downvote a comment:
        POST /api/posts/:postId/comments/:commentId/downvote
