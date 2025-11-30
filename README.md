## Notes
Run `npm start` on project root and open /index.html.

Brief endpoint explanation:
- GET /fumo
Gets currently owned fumos. 

- POST /collector/check
Updates & retrieves the player (collector)'s coin balance

- POST /auth/signin
Requires JSON body "email", and "password", returns a session cookie.

- POST /auth/signup
Requires JSON body "name", "email", and "password", returns a session cookie.

- GET /market
Gets current fumo offers in the market

- GET /market/:id
Buys the fumo
