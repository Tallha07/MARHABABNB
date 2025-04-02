// import { csrfFetch } from "./csrf";

// const GET_SPOT_REVIEWS = "reviews/GET_SPOT_REVIEWS";
// const DELETE_REVIEW = "reviews/DELETE_REVIEW";
// const CREATE_REVIEW = "reviews/CREATE_REVIEW"

// const getSpotReviews = (reviews) => {
//     return {
//         type: GET_SPOT_REVIEWS,
//         reviews
//     }
// }

// const createAReview = (review) => {
//     return {
//         type: CREATE_REVIEW,
//         review
//     }
// }

// const deleteAReview = (reviewId) => {
//     return {
//         type: DELETE_REVIEW,
//         reviewId
//     }
// }

// //thunks 
// // thunk for spot reviews

// export const getSpotReviewsThunk = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
//     if (res.ok) {
//         const reviews = await res.json();
//         dispatch(getSpotReviews(reviews));
//         return reviews;
//     }
// }

// // thunk for creating a review

// export const createAReviewThunk = (spotId, review, user) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots${spotId}/reviews`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...review, userId: user.id })
//     });
//     if (res.ok) {
//         const review = await res.json();
//         dispatch(createAReview(review));
//         return review;
//     }
// }

// // thunk for deleting a review

// export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/reviews/${reviewId}`, {
//         method: "DELETE"
//     });
//     if (res.ok) {

//         const confirm = await res.json();
//         dispatch(deleteAReview(reviewId));
//         return confirm
//     }

// };

// // normalizing the data

// const initialState = {
//     byId: {}
// };
// // reducer

// const reviewsReducer = (state = { initialState }, action) => {
//     let newState, newByIdGetSpotReviews = {};
//     switch (action.type) {
//         case GET_SPOT_REVIEWS:
//             newState = { ...state }
//             newState.allReviews = action.payload.Reviews;
//             for (let review of action.review) {
//                 newByIdGetSpotReviews[review.id] = review;
//             }
//             newState.byId = newByIdGetSpotReviews
//             return newState;

//         case CREATE_REVIEW: {
//             let newbyIdCreateReviews = { ...state.newbyIdCreateReviews, [action.review.id]: action.review };
//             return { ...state, newbyIdCreateReviews }

//         }
// case DELETE_REVIEW: {
//     const newByIdDeleteReviews = { ...state.newByIdDeleteReviews };
//     delete newByIdDeleteReviews[action.reviewId];
//     return { ...state, newByIdDeleteReviews }
// }
//     }
// }
// export default reviewsReducer;