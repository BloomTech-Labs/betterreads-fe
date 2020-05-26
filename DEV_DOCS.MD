# Readrr Developer Notes

## Authentication

- Authenication is based on JWT, as the previous implementation had various security vulnerablities.
- The current authentication provides Web with tokens that expire in 24h, and gives iOS token without a expiry date.

### Possible Improvements

- Currently there are endpoints that require user specific information to be passed in, with JWT there is no need for this as the token can be decoded. One example of this is within the recommendations route on the backend.

## Redux

- The current store utilizes Redux.
- Inside utils/tokenChecker there is functionality for preserving the current users token during refresh, as well as checking if the token is valid. 

## Components

- All components were refactored to try and follow a consistent file structure, and format. The redux implementation attempts to mirror this.
- The biggest issue encountered when taking over this project was the BookCard component, we have made multiple attempts to make this component modular and more idiomatic. The newest, and currently implemented iteration BookCardRefactor should have all of the same functionality, but we felt keeping the old components code in place in the event something was forgotten, or we needed to reference how the previous team implemented features was the best way forward.

## Recommendations

- Recommendations are currently setup with the web backend acting as a middle man. The backend fetches all user's shelves, then calls the data science API to fetch recommendations.
- Currently there are 3 endpoints for recommendations. GET "/:userId/recommendations" gathers all recommendations based on the users whole lobrary. POST "/:userId/recommendations" gathers all recommendations based on books sent from the client. GET "/recommendations" is a attempt to fully utilize JWT and combine the previous two endpoints.

### Possible Improvements

- There are timing issues with the current endpoints, the current workaround is setting a explicit timeout. A better option may be to handle gathering recommendations from the client rather than using the web backend as a middleman.
