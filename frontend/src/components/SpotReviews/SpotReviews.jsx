import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviewsThunk } from "../review";
import DeleteAReviewModal from "../../components/DeleteAReview/DeleteAreview";
import CreateReviewModal from "../CreateReviewModal/CreateAReview"
import OpenModalButton from "../OpenModalButton";
import "./SpotReviews.css"

function SpotReviews({ spot }) {
    const months = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'

    }


    const formateDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = months[date.getMonth() + 1];
        return `${month} ${year}`;
    };
    const user = useSelector((state) => state.session.user);
    const reviewsObj = useSelector((state) => state.reviews);
    const reviews = Object.values(reviewsObj);
    const dispatch = useDispatch();
    reviews.sort((a, b) => {
        const date1 = new Date(a.createdAt);
        const date2 = new Date(b.createdAt);
        return date2 - date1;
    });
    useEffect(() => {
        dispatch(getSpotReviewsThunk(spot.id));
    }, [dispatch, spot.id]);
    let spotRating;
    if(reviews.length) {
        spotRating = reviews.reduce((acc, current) => acc + current.stars, 0) / reviews.length;
    }
    let alreadyReviewed
    if (user) {
        alreadyReviewed = reviews.find(review => review.userId === user.id)
    }
    return (
        <div className="reviews-container">
            <div className="spot-reviews-header">
                {reviews.length > 0 ? (
                   <span>{`⭐${spotRating.toFixed(1)}`} · {reviews.length}{" "}
                   {reviews.length === 1? "review" : "reviews"}

                   </span> 
                ) : (
                    <span>
                        ⭐New
                    </span>
                )}
            </div>
{user && user.id !== spot.ownerId && !alreadyReviewed && (
    <>
    <OpenModalButton 
    buttonText = {"Post Your Review"}
    modalComponent={<CreateReviewModal spot={spot} />}
    />
    </>
)}
<span>
    {reviews.length > 0 ? (
        <div className="reviews">
            {reviews.map((review) => (
                <div className="individual-reviews" key={review.id}>
                    <span id="review-firstName">{review.user ? review.user.firstName : user.firstName}</span>

<span id="review-date">
    {formateDate(review.createdAt)}
</span>
{user && user.id === review.userId && (
    <OpenModalButton
    buttonText={"Delete"}
    modalComponent={<DeleteAReviewModal review={review} />}
    />
)}
                </div>
            ))} 

        </div>
    ) : (
        <span id="review-firstName">No reviews! Care to leave one?</span>
    )}
</span>
        </div>
    )
}

export default SpotReviews;