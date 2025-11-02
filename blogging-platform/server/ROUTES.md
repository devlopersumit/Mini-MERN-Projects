## API design quick reference (essential endpoints)

# Auth:

POST /api/auth/register -> Done

POST /api/auth/login -> Done

GET /api/auth/me -> Done

# Posts:

POST /api/posts -> Done

GET /api/posts?limit=&page=&cursor= -> Done

GET /api/posts/:id -> Done

PUT /api/posts/:id -> Done

DELETE /api/posts/:id -> Done

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

