import { useDispatch } from "react-redux";
import { deleteASpotThunk } from "../../store/spots";
import { useModal } from "../../context/Modal";
import "./DeleteASpot.css";

const DeleteASpotModal = ({spot, onDeleteSuccess }) => {
    const dispatch = useDispatch();
    const { closeModal } =useModal();
    
    
    const deleteSpot = async (error) => {
        error.preventDefault();
        try {
            await dispatch(deleteASpotThunk(spot.id));
            onDeleteSuccess();
            closeModal();
        } catch (error) {
            next (e)
        };
            
    };
    return (
        <div className="Delete-spot-modal">
            <h1>Confirm Delete</h1>
            <span id="delete-spot-span">
                <p>Are you sure you want to delete this spot?</p>
            </span>
            <button className="Confirm-delete" onClick={deleteSpot}>
                Yes (Delete Spot)
            </button>
            <button className="do-not-delete" onClick={closeModal}>
                No (keep Spot)
            </button>
        </div>
    );
};

export default DeleteASpotModal;