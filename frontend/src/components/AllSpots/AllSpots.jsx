
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotsCard";
import { useNavigate } from "react-router-dom";
//  import "./AllSpot.css";

const AllSpots = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
const spotsObj = useSelector((state) => state.spots);
const spots = spotsObj ? Object.values(spotsObj) : [];

    const [isloaded, setIsLoaded] = useState(false);

useEffect(() => {


    const getSpots = async () => {
        await dispatch(getAllSpotsThunk());
setIsLoaded(true);
    }

    if(!isloaded){
        getSpots();
    }

}, [dispatch, isloaded])

const goToSpotDetail = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}`)
}

    if (!isloaded) {
        return <img src='https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHNyeDhqdnJia3FvYWZoY3I3NTVrMWt3dnl2c2c5NWc3NnZkZXcwcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y1ZBcOGOOtlpC/giphy.gif' style={{height: '150px', width: '125px'}} />
    } else {
        return (
            <div>
                <h1>Marhaba</h1>
                <div className="card-list-container">

                {
                    spots.map((spot, idx) => (
                        <div 
                        className='card-container' 
                        key={`${idx}-${spot.id}`}
                        onClick={(e)=> goToSpotDetail(e,spot)}
                        > 
                            <SpotCard spot={spot} />
                        </div>
                    ))
                }
            </div>
                </div>
        );
    }
}


export default AllSpots;