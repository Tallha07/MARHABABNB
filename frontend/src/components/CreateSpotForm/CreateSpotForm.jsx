import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateSpotForm.css";
import { createASpotThunk, addSpotImagesThunk, editASpotAThunk } from "../../store/spots";


function CreateSpotForm({ formType = "Create A Spot", spot }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user);

    const [country, setCountry] = useState(
        formType === "Update Spot" ? spot.country : ""
      );
      const [address, setAddress] = useState(
        formType === "Update Spot" ? spot.address : ""
      );
      const [city, setCity] = useState(formType === "Update Spot" ? spot.city : "");
      const [state, setState] = useState(
        formType === "Update Spot" ? spot.state : ""
      );
      const [description, setDescription] = useState(
        formType === "Update Spot" ? spot.description : ""
      );
      const [latitude, setLatitude] = useState(
        formType === "Update Spot" ? spot.lat : ""
      );
      const [longitude, setLongitude] = useState(
        formType === "Update Spot" ? spot.lng : ""
      );
      const [name, setName] = useState(formType === "Update Spot" ? spot.name : "");
      const [price, setPrice] = useState(
        formType === "Update Spot" ? spot.price : ""
      );
      const [previewImageUrl, setPreviewImageUrl] = useState("");
      const [url1, setUrl1] = useState("");
      const [url2, setUrl2] = useState("");
      const [url3, setUrl3] = useState("");
      const [url4, setUrl4] = useState("");
      const [errors, setErrors] = useState({});

      if (!user) {
        navigate('/', { replace: true });
        return null; // or any other content you want to render when redirecting
      }
    
      if (formType === "Update Spot" && user.id !== spot.ownerId) {
        navigate('/', { replace: true });
        return null; // or any other content you want to render when redirecting
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        const spotImgs = [
          {
            url: previewImageUrl,
            preview: true,
          },
        ];
        [url1, url2, url3, url4].forEach((url) => {
            if (url) {
              spotImgs.push({
                url,
                preview: false,
              });
            } else {
              spotImgs.push({
                url: "https://www.ewingoutdoorsupply.com/media/catalog/product/placeholder/default/shutterstock_161251868.png",
                preview: false,
              });
            }
          });
          const spotDetails = {
            ownerId: user.id,
            address,
            country,
            city,
            lat: parseInt(latitude),
            lng: parseInt(longitude),
            state,
            description,
            name,
            price,
          };
          if (!country.length) errors.country = "Country is required";

    if (!address.length) errors.address = "Address is required";

    if (!city.length) errors.city = "City is required";

    if (city.length > 15)
      errors.city = "City name must be less than 15 characters";

    if (state.length > 15)
      errors.state = "State name must be less than 15 characters";

    if (!state.length) errors.state = "State is required";

    if (!latitude) errors.lat = "Latitude is required";

    if (!longitude) errors.lng = "Longitude is required";

    if (latitude > 90 || latitude < -90) errors.lat = "Latitude is invalid";

    if (longitude > 180 || longitude < -180)
      errors.lng = "Longitude is invalid";

    if (description.length < 30)
      errors.description = "Description needs a minimum of 30 characters";

    if (description.length > 256) {
      errors.description = "Description maximumm is 256 characters";
    }

    if (!name.length) errors.name = "Name is required";

    if (price < 0) errors.price = "Price is invalid";

    if (!price) errors.price = "Price is required";
    
    //create a spot form
    if (!Object.keys(errors).length && formType === "Create A Spot") {
        const res = await dispatch(createASpotThunk(spotDetails));
        await dispatch(addSpotImagesThunk(res.id, spotImgs));
        navigate(`/spots/${res.id}`);
      }

      // update a spot 
      if (formType === "Update Spot") {
        delete errors.previewImageUrl;
        delete errors.urlEndsWith;
  
          if (!Object.keys(errors).length) {
          const res = await dispatch(editASpotAThunk(spot.id, spotDetails));
          navigate(`/spots/${res.id}`);
        }
      }
      setErrors(errors);
    };
    
}

export default CreateSpotForm;