import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSpotsThunk } from '../../store/spots';
import SpotCard from '../AllSpots/SpotsCard';
import { useNavigate } from 'react-router-dom';
import DeleteASpotModal from '../DeleteASpotModal';
import OpenModalButton from '../OpenModalButton';

function UserSpot() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spotObj = useSelector((state) => state.spots); // Get the entire spots object
  const spots = spotObj ? Object.values(spotObj) : []; // Extract values only if spotObj is defined

  useEffect(() => {
    if (user) dispatch(getUsersSpotsThunk());
  }, [dispatch, user]);

  const createASpot = (e) => {
    e.preventDefault();
    navigate('/spots/new');
  };

  const updateASpot = (e, spot) => {
    e.preventDefault();
    navigate(`/spots/${spot.id}/edit`);
  };

  const handleDeleteSuccess = () => {
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="manage-spots-container">
      <div className="manage-spots-header">
        <h2 style={{ margin: '10px 0' }}> Manage Your Spots </h2>
        <button onClick={createASpot}> Create a New Spot </button>
        <div className="manage-spots-tiles-container">
          {spots.length > 0 && (
            <div className="manage-spot-tiles">
              {spots.map((spot) => (
                <div className="individual-tiles" key={spot.id}>
                  <SpotCard spot={spot} />
                  <button onClick={(e) => updateASpot(e, spot)}> Update </button>
                  <OpenModalButton
                    buttonText="Delete"
                    modalComponent={<DeleteASpotModal spot={spot} onDeleteSuccess={handleDeleteSuccess} />}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSpot;