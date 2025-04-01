import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "./SpotsCard";
import { useNavigate } from "react-router-dom";
//  import "./AllSpot.css";


// function AllSpots() {
// const [searchField, setSearchField] = useState('');
// const dispatch = useDispatch();
// const spotsObj = useSelector((state) => state.spots);
// const spots = spotsObj ? Object.value(spotsObj) : [];

// useEffect(() => {
//     dispatch(getAllSpotsThunk());
// }, [dispatch]);

// const filteredSpots = useSelector((state) => {
//     if (!state.spots) return [];
    
//     const searchTerm = searchField.toLowerCase();
//     return Object.values(state.spots).filter((spot) => 
//       spot.name.toLowerCase().includes(searchTerm)
//     );
//   });
  
// const onSearchChange = (event) => {
//     setSearchField(event.targer.value);
// };
// if (!spot.length) {
//     return null;
// }
// return (
//     <div>
//         <searchBox 
//         className='Search-box'
//         onChangeHandler={onSearchChange}
//         placeholder='Search Spots...'
//         />
//     </div>
// )
// }


const AllSpots = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
const spots = useSelector((state) => state.spots.allSpots);
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