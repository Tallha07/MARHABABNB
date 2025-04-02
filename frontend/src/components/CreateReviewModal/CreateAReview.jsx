import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createAReviewThunk } from "../../store/review";
import "./CreateAReview.css";

function CreateReviewForm({ spot }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [review, setReview] = useState("");
    const [star, setStar] = useState(0);
    const [hover, setHover] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    useEffect(() => {
        if (review.length > 9 && star < 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [review, star]);
    const handleSubmit = (error) => {
        error.preventDefault();
        setErrors({});
        dispatch(createAReviewThunk(
            spot.id, { review, star },
            user
        )
        )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.message) {
                    setErrors(data.message);
                }
            });
    }
    return (
        <div className="create-a-review">
            <h1> How was your stay? </h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={3} cols={30}
                    minLength={"30"}
                    value={review}
                    placeholder="Leave your review here"
                    onChange={(e) => setReview(e.target.value)} required
                />
                {errors.review && <p>{errors.review}</p>}
                <div className="star-rating">
                    {[...Array(5)].map((star, idx) => {
                        idx += 1;
                        return (
                            <button  
                            type="button"
                            key={idx}
                            className={idx <= (hover || star) ? "on" : "off"}
                            onClick={() => setStar(idx)}
                            onMouseEnter={() => setHover(idx)}
                            onMouseLeave={() => setHover(star)}
                            >
                                <span className="star">&#9733;</span>
                             
                            </button>
                        );
                    })}
                    {errors.star && <p>{errors.star}</p>}
                    <span> Stars </span>

                </div>
                <button className="submit-button-review" 
                disabled={disabled} 
                type="submit"> Submit Your Review </button>
            </form>

        </div>
    );

}


export default CreateReviewForm;