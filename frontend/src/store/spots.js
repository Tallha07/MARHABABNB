import { csrfFetch } from "./csrf";



// constants

const ALL_SPOTS = "spots/ALL_SPOTS";
const SPOT_DETAILS = "spots/SPOT_DETAILS";
const CREATE_A_SPOT = "spots/CREATE_SPOT";
const UPDATE_A_SPOT = "spots/UPDATE_A_SPOT";
const DEL_A_SPOT = "spots/DEL_A_SPOT";
const ADD_IMAGES_TO_A_SPOT = "spots/ADD_IMAGES_TO_A_SPOT" ;

//action creator to get all spots

const getAllSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots,
    };
};

// // function to get details for a spot

const getASpot = (spot) => {
    return {
        type: SPOT_DETAILS,
        spot,
    };
};

// // function to create a spot

const createASpot = (spot) => {
    return {
        type: CREATE_A_SPOT,
        spot,
    };
};

// //function to update a spot

const updateASpot = (spotId) => {
    return {
        type: UPDATE_A_SPOT,
        spotId,
    };
};

// //function to del a spot

const deleteASpot = (spotId) => {
    return {
        type: DEL_A_SPOT,
        spotId,
    };
};

// // funciton to add an img to a spot

const addImageToASpot = (image, spotId) => {
    return {
        type: ADD_IMAGES_TO_A_SPOT,
        image,
        spotId,
    };
};


// thunk for 'get all spots'

export const getAllSpotsThunk = () => async (dispatch) => {
    try {
        const res = await csrfFetch("/api/spots/");
        if (res.ok) {
            const spots = await res.json();
            dispatch(getAllSpots(spots));
            // return spots;
        } else {
            throw res

        }
    } catch (e) {
return (e)
    }
};

//thunk for 'get spot details'

export const getASpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const spot = await res.json();
        dispatch(getASpot(spot));
        return spot;
    }
};

// // thunk for creating a spot

export const createASpotThunk = (payload) => async (dispatch) => {
   try {


    const res = await csrfFetch("/api/spots",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const spot = await res.json();
        dispatch(createASpot(spot));
        return spot;
    } else {
        throw new Error('Failed to create a spot');
    } 
   } catch (e) {
    return (e)
   }

};

// //thunk for updating a spot

export const updateASpotThunk = (spotId, payload) => async (dispatch) => {
    try {
    const res = await csrfFetch (`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    if (res.ok) {
        const spot = await res.json();
        dispatch(updateASpot(spot.id));
        return spot;
    } else {
        throw new Error('Failed to update a spot');
    } 
   } catch (e) {
   return (e)
   }
};


// //thunk for deleting a spot

export const deleteASpotThunk = (spotId) => async (dispatch) => {
   try {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const confirm = await res.json();
        dispatch(deleteASpot)(spotId);
        return confirm;
    } else {
        throw new Error('Failed to delete a spot');
    } 
   } catch (e) {
   return (e)
   }

};

// //thunk for adding an image to a spot

export const addSpotImagesThunk = (spotId, spotImages) => async (dispatch) => {
    await Promise.all(spotImages.map(async (img) => {     //promise.all to await all fetch req
        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: "POST",
            body: JSON.stringify(img),
        });
        if (res.ok) {
            const newImage = await res.json();
            dispatch(addImageToASpot(newImage, spotId));
            return newImage;
        }
    }));
};

// normalize our data
const initialState = {
    allSpots: [],
    byId: {}
};
//spots reducer


const spotsReducer = (state = initialState, action) => {
    let newState, newByIdGetAllSpots = {};
    switch (action.type) {
        case ALL_SPOTS:
        // const spotsArr = action.payload.Spots;
            newState = { ...state }
            newState.allSpots = action.payload.Spots;
            for(let spot of action.payload.Spots) {
                newByIdGetAllSpots[spot.id] = spot;

            }
            newState.byId = newByIdGetAllSpots
            return newState;
    
        case SPOT_DETAILS: {
            const spot = action.payload;
            return {
                 ...state, 
                 cuurentSpot: spot,
        }
        }
        case CREATE_A_SPOT: {
            const { spotId } = action.spot;
            newState.spots[spotId] = {
                ...newState.spots[spotId], ...action.spot
            }
        }
        return newState;

        case UPDATE_A_SPOT: {
        const { spotId, spot } = action;
        if(newState.spots[spotId]) {
            newState.spots[spotId] = {
                ...newState.spots[spotId],
                ...spot, //should update the spot with new data
            }
        }
        return newState;
        }
        case DEL_A_SPOT: {
            const { spotId } = action;
            delete newState.spot[spotId];
            return newState
        }
        default:
            return state;
    
}
}
export default spotsReducer;