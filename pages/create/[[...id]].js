/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { useRouter } from "next/router";
import validation from "../../utils/validation";

const CreateProperty = () => {
  const initialState = {
    property_Id: 0,
    number: "",
    address: "",
    area: 0,
    constructionArea: 0,
    propertyTypeId: 0,
    ownerId: 0,
  };

  const [property, setProperty] = useState(initialState);

  const {
    property_Id,
    number,
    address,
    area,
    constructionArea,
    propertyTypeId,
    ownerId,
  } = property;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);

  const { propertyTypes, owners } = state;

  const router = useRouter();

  const { id } = router.query;

  const [onEdit, setOnEdit] = useState(false);
  const [bandera, setBandera] = useState(true);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      getData(`property/${id}`).then((res) => {
        setProperty(res.property);
        setImages(res.property.images);
      });
    } else {
      setOnEdit(false);
      setProperty(initialState);
      setImages([]);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
    dispatch({ type: "Notify", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "No se ha cargado ninguna imagen." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024) {
        return (err = "El tamaño de la imagen excede 1mb");
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "El formato del imagen debe ser png o jpeg.");
      }

      num += 1;
      if (num <= 5) {
        newImages.push(file);
      }

      return newImages;
    });

    if (err) {
      dispatch({ type: "NOTIFY", payload: { error: err } });
    }

    const imgCount = images.length;

    if (imgCount + newImages.length > 5) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Seleccione 5 imágenes o menos." },
      });
    }

    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errMsg = validation(
      property_Id,
      number,
      address,
      area,
      constructionArea,
      propertyTypeId,
      ownerId
    );

    if (errMsg) {
      return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    }

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (images.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error:
            "La IMAGEN del producto es un campo requerido." +
            " " +
            property_Id +
            " " +
            number +
            " " +
            address +
            " " +
            area +
            " " +
            constructionArea +
            " " +
            propertyTypeId +
            " " +
            ownerId,
        },
      });
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) {
      media = await imageUpload(imgNewURL);
    }

    let res;
    if (onEdit) {
      res = await putData(`property/${id}`, {
        ...property,
        images: [...imgOldURL, ...media],
      });

      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      setProperty(initialState);
      setImages([]);
      setBandera(false);
    } else {
      res = await postData("property", {
        ...property,
        images: [...imgOldURL, ...media],
      });

      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      setProperty(initialState);
      setImages([]);
    }

    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  return (
    <div className="create-property">
      <Head>
        <title>New Property</title>
      </Head>

      <h3 className="mx-auto d-flex justify-content-center my-5">
        Datos de la nueva propiedad
      </h3>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="property_Id"
            value={property_Id}
            placeholder="Product ID"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <input
            type="text"
            name="number"
            value={number}
            placeholder="Property number"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <input
            type="text"
            name="address"
            value={address}
            placeholder="Property address"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="area">Area:</label>
              <input
                type="number"
                name="area"
                value={area}
                placeholder="Area in m2"
                className="d-block mt-2 mb-2 w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="constructionArea">Construction area:</label>
              <input
                type="number"
                name="constructionArea"
                value={constructionArea}
                placeholder="Construction Area in m2"
                className="d-block mt-2 mb-2 w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="input-group-prepend px-3 my-3 w-100">
              <select
                name="propertyTypeId"
                id="propertyTypeId"
                value={propertyTypeId}
                onChange={handleChangeInput}
                className="custom-select text-capitalize"
              >
                <option value="all">Property Types</option>
                {propertyTypes.map((item) => (
                  <option key={item._id} value={item.propertyTypeId}>
                    {item.propertyTypeId} {item.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group-prepend px-3 my-3 w-100">
              <select
                name="ownerId"
                id="ownerId"
                value={ownerId}
                onChange={handleChangeInput}
                className="custom-select text-capitalize"
              >
                <option value="all">Owner</option>
                {owners.map((item) => (
                  <option key={item._id} value={item.ownerId}>
                    {item.ownerId} {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-info my-2 px-4">
            {onEdit && bandera ? "Update" : "Create"}
          </button>
        </div>

        <div className="col-md-6 my-4">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label hfor="formFile" className="custom-file-label">
                Seleccione hasta 5 imágenes
              </label>
            </div>
            <div>
              <div className="custom-file border rounded">
                <input
                  type="file"
                  className="custom-file-input"
                  id="formFile"
                  onChange={handleUploadInput}
                  multiple
                  accept="image/*"
                />
              </div>
            </div>
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
                />

                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProperty;
