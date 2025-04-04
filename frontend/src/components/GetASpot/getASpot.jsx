import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import CreateASpot from "../CreateSpotForm";
import { getASpotThunk } from "../../store/spots";


const GetASpot = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);
    useEffect(() => {
        dispatch(getASpotThunk(spotId)).catch(() => navigate('/'));

    }, [dispatch, navigate, spotId]);

    if (!spot) {
        return null;
    }
    return (
        <CreateASpot form="Update Spot" id={spot}/>
    )
}

export default GetASpot;