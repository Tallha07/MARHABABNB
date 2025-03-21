import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SpotDetail = () => {
    const {id} = useParams();
    const spot = useSelector((state) => state.spotsReducer.byId[id]);
    
    return (
        <div>
            <SpotCard spot={spot} />
        </div>
    );
}
export default SpotDetail;