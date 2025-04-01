// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotCard from "../AllSpots/SpotsCard";
import { useEffect, useState } from "react";
import { addSpotImagesThunk, getASpotThunk } from "../../store/spots";



const SpotDetail = () => {
    const { id } = useParams();
    const spot = useSelector((state) => state.spotsReducer.byId[id]);
    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews.byId[id])
    const reviews = Object.values(reviewsObj);
    const [setErr] = useState({});
    let previewImageUrl;

    useEffect(() => {
        const res = async () => {
            try {
                await dispatch(getASpotThunk(spot));
            } catch (e) {
                const errorObj = {};
                errorObj.Status = err.status;
                errorObj.statusText = err.statusText;
                setIsLoaded(true);
                setErr(errorObj);
            }
        };
        res();
    }, [dispatch, setErr, spot]);

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
        <div ClassName="spot-detail">
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
                        <img className="spot-image second-img" src={spotIamges[0].url} />
                        <img className="spot-image third-img" src={spotIamges[1].url} />
                        <img className="spot-image forth-img" src={spotIamges[2].url} />
                        <img className="spot-image fifth-img" src={spotIamges[3].url} />

                    </>
                )}

            </div>
            <div className="spot-detail-info">
                <div className="spot-owner-description">
                    <h2>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}
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
                            <p>
                                New
                            </p>
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