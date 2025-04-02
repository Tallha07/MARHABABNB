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
    const [validateImageUrl, setValidateImageUrl] = useState("");
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

        const validateImageUrl = (url) =>
            url && (url.urlendsWith(".png") || url.urlendsWith(".jpg") || url.urlendsWith(".jpeg"));


        if (!previewImageUrl) {
            errors.previewImageUrl = "Preview image is required";
        } else if (!validateImageUrl(previewImageUrl)) {
            errors.urlEndsWith = "Image URL must end in .png, .jpg, or .jpeg";
        }

        [url1, url2, url3, url4].forEach((url) => {
            if (url && !validateImageUrl(url)) {
                errors.urlEndsWith = "Image URL must end in .png, .jpg, or .jpeg";
            }
        });

        const fields = {
            country: "country is required",
            address: "Address is required",
            city: "City is required",
            state: "State is requred",
            name: "Name is required",
            price: "PRice is required"
        };
        Object.keys(fields).forEach((field) => {
            if (!field) errors[field] = fields[field];
        });
        if (city && city.length > 15) errors.city = "City name must be less than 15 characters";
        if (state && state.length > 15) errors.state = "State name must be less than 15 characters";
        if (latitude === undefined || latitude < -90 || latitude > 90) errors.lat = "Latitude is invalid";
        if (longitude === undefined || longitude < -180 || longitude > 180) errors.lng = "Longitude is invalid";

        if (description && description.length < 30) errors.description = "Description needs a minimum of 30 characters";
        if (description && description.length > 256) errors.description = "Description maximum is 256 characters";

        if (price !== undefined && price < 0) errors.price = "Price is invalid";

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
    return (
        <div className="create-form-container">
            <div className="create-a-spot-div">
                <form className="create-a-spot-form" onSubmit={handleSubmit}>
                    {formType === "Create A Spot" ? (
                        <h2> Create a New Spot </h2>
                    ) : (
                        <h2> Update your Spot </h2>
                    )}
                    <h3> Where is your place located? </h3>
                    <span> Guest will only get your exact address once they booked a reservation. </span>
                    <span className="form-labels"> Country </span>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    {errors.country && (
                        <p>*{errors.country}</p>
                    )}


                    <span className="form-labels"> Street Address </span>
                    <input
                        type="text"
                        name="streetAddress"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {errors.address && (
                        <p>*{errors.address}</p>
                    )}
                    <div className="form-row">
                        <div>
                            <span className="form-labels"> City </span>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            {errors.city && (
                                <p>*{errors.city}</p>
                            )}

                        </div>
                        <div>
                            <span className="form-labels"> State </span>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                            {errors.state && (
                                <p>*{errors.state} </p>
                            )}
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <span className="form-labels"> Latitude </span>
                            <input
                                type="number"
                                name="latitude"
                                placeholder="Latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                            {errors.lat && (
                                <p>*{errors.lat}</p>
                            )}
                        </div>
                        <div>
                            <span className="form-labels"> Longitude </span>
                            <input
                                type="number"
                                name="longitude"
                                placeholder="Longitude"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                            {errors.lng && (
                                <p>*{errors.lng}</p>
                            )}
                        </div>
                    </div>

                    <span id="form-split-one"></span>
                    <span> Describe your place to guests </span>
                    <span>
                        Mention the best features of your space, any special amentities like
                        fast wifi or parking, and what you love about the neighborhood.
                    </span>
                    <textarea
                        id="spot-description"
                        rows="8"
                        name="description"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                        <p>*{errors.description}</p>
                    )}
                    <span id="form-split-one"></span>
                    <span> Create a title for your spot </span>
                    <span>
                        Catch guests attention with a spot title that highlights what makes
                        your place special.
                    </span>
                    <input
                        type="text"
                        name="title"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && (
                        <p>
                            *Name is required
                        </p>
                    )}
                    <span id="form-split-one"></span>
                    <span> Set a base price for your spot </span>
                    <span>
                        Competitive pricing can help your listing stand out and rank higher
                        in search results.
                    </span>
                    <input
                        type="number"
                        name="pricePerNight"
                        placeholder="Price per night (USD)"
                        step={"0.01"}
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {errors.price && <p>*{errors.price}</p>}
                    <span id="form-split-one"></span>
                    {formType === "Create A Spot" && (
                        <>
                            <span> Liven up your spot with photos </span>
                            <span> Submit a link to at least one photo to publish your spot. </span>
                            <input
                                className="spot-img-urls"
                                type="text"
                                name="previewImageUrl"
                                placeholder="Preview Image URL"
                                value={previewImageUrl}
                                onChange={(e) => setPreviewImageUrl(e.target.value)}
                            />
                            {errors.previewImageUrl && <p>*{errors.previewImageUrl}</p>}
                            <input
                                className="validate-img-urls"
                                type="text"
                                name="validateImageUrl"
                                placeholder="validate Image URL"
                                value={validateImageUrl}
                                onChange={(e) => setValidateImageUrl(e.target.value)}
                            />
                            {errors.ValidateImageUrl && <p>*{errors.validateImageUrl}</p>}
                            {[url1, url2, url3, url4].map((url, index) => (
                                <input
                                    key={index}
                                    disabled={!previewImageUrl.length}
                                    className="spot-img-urls"
                                    type="text"
                                    name={`imageUrl${index + 1}`}
                                    placeholder="Image URL"
                                    value={url}
                                    onChange={(e) => {
                                        const urls = [url1, url2, url3, url4];
                                        urls[index] = e.target.value;
                                        setUrl1(urls[0]);
                                        setUrl2(urls[1]);
                                        setUrl3(urls[2]);
                                        setUrl4(urls[3]);
                                    }}
                                />
                            ))}
                            {errors.urlEndsWith && <p>*{errors.urlEndsWith}</p>}

                            <span id="form-split-one"></span>
                        </>
                    )}
                    {formType === "Update Spot" ? (
                        <button id="create-spot-submit-button" type="submit">
                            Update Spot
                        </button>
                    ) : (
                        <button id="create-spot-submit-button" type="submit">
                            Create Spot
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CreateSpotForm;