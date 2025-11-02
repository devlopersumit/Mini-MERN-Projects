## API design quick reference (essential endpoints)

# Auth:

POST /api/auth/register -> Done

POST /api/auth/login -> Done

GET /api/auth/me -> Done

# Posts:

POST /api/posts

GET /api/posts?limit=&page=&cursor=

GET /api/posts/:id

PUT /api/posts/:id

DELETE /api/posts/:id

# Uploads:

POST /api/uploads (file form-data)

Likes/Comments:

POST /api/posts/:id/like

POST /api/posts/:id/comments

GET /api/posts/:id/comments?limit=&page=

# Users:

GET /api/users/:id

PUT /api/users/:id

GET /api/users/:id/posts

