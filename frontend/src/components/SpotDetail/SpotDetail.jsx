// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotCard from "../AllSpots/SpotsCard";
import { useEffect, useState } from "react";
import { addSpotImagesThunk, getASpotThunk } from "../../store/spots";



const SpotDetail = () => {
    const { spotId } = useParams();
    const spotObj = useSelector((state) => state.spotsReducer.byId[spotId]);
    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews.byId[spotId])
    const reviews = Object.values(reviewsObj);
    const [isLoaded, setIsLoaded] = useState(false);
    const [setError] = useState({});
    const spot = spotObj[spotId];
    let previewImageUrl;

    useEffect(() => {
        const res = async () => {
            try {
                await dispatch(getASpotThunk(spotId));
            } catch (error) {
                const errorObj = {
               Status: error.status,
                StatusText: error.statusText,
            } 

                setIsLoaded(true);
                setError(errorObj);
         }
        };
        res();
    }, [dispatch, spotId, setError]);


const handleClick = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon...");
};
if (isLoaded && !spot?.Owner)
    return(
<h1> 404 Does Not Exist </h1>
);
if (!spot?.Owner) return null;
if (spotImages.length < 5) {
    for (let i = spot.spotIamges.length; i < 5; i++) {
        const img = {
            id: i + 1,
            url:
            "https://www.ewingoutdoorsupply.com/media/catalog/product/placeholder/default/shutterstock_161251868.png",
        }
        spot.SpotImages.push(img);
    }
}
    previewImageUrl = addSpotImagesThunk.find((image) => image.preview === true);
    const indexOfPreview = addSpotImagesThunk.indexOf(previewImageUrl);
    const spotImages = [];
    for (let i = 0; i < addSpotImagesThunk.length; i++) {
        const image = spotImages[i];
        if (i === indexOfPreview) continue;
        spotImages.push(image);
    }
    let spotRating;
    if (reviews.length) {
        spotRating = reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length;

    }
    const price = parseFloat(spot.price);
    return (
        <div className="spot-detail">
            <div className="spot-detail-header">
                <span>
                    {spot.city}, {spot.state}, {spot.country}
                </span>
            </div>
            <div className="spot-details-images">
                {previewImageUrl && (
                    <img className="spot-image first-img" src={previewImageUrl.url} />
                )}
                {spotImages.length > 0 && (
                    <>
                        <img className="spot-image second-img" src={spotImages[0].url} />
                        <img className="spot-image third-img" src={spotImages[1].url} />
                        <img className="spot-image forth-img" src={spotImages[2].url} />
                        <img className="spot-image fifth-img" src={spotImages[3].url} />

                    </>
                )}

            </div>
            <div className="spot-detail-info">
                <div className="spot-owner-description">
                    <h2> Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
                    </h2>
                </div>
                <div className="spot-booking-card">
                    <div className="spot-price-review">
                        <span>
                            <i>${price.toFixed(2)}</i> night
                        </span>
                        {reviews.length ? (
                            <p>
                                {`⭐${spotRating.toFixed(1)}`} · {reviews.length} {''}
                                {reviews.length === 1 ? "reviews" : "reviews"}
                            </p>
                        ) : (
                            <p> New </p>
                        )}

                    </div>
                    <div className="reserve-spot">
                        <button id='reserve-button' onClick={handleClick}>
                            Reserve
                        </button>
                    </div>
                </div>
            </div>
            <div className="spot-reviews">
            <SpotCard spot={spot} />
            </div>
        </div>
    );
}
export default SpotDetail;