// import React from 'react';
import './spotCard.css';


const SpotCard = ({spot}) => {
    return (
        <div className='card-container'>
            <div className='spotImage-container'>
                <img className='spotImage' src={spot.previewImage}/>
            </div>
            <div className='info-container'>
                <div className='top-container'>
                    <span>{`${spot.city}, ${spot.state}`}</span>
                    <span>{`⭐ ${spot.avgRating}`}</span>
                </div>
                <div className='middle-container'></div>
                <p className='spot-text'>{spot.name}</p>
                <p className='spot-text'>Mar 31 - Apr 5</p>
                <div className='bottom-container'>
                    <span className='spot-text spot-price'>{`$${spot.price}`}</span>
                    <span className='spot-text'>night</span>

                </div>


            </div>
        </div>
    );
}
export default SpotCard;