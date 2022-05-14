import Link from "next/link";

import React from "react";
import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";

import { updateItem } from "../store/Actions";
import { postData, putData } from "../utils/fetchData";

const PropertyTypes = () => {
  const [propertyTypeId, setPropertyTypeId] = useState("");
  const [description, setDescription] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { propertyTypes } = state;

  const [id, setId] = useState("");

  const createPropertyType = async () => {
    if (!propertyTypeId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Property Type Id can not be left blank." },
      });

    if (!description)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Description can not be left blank." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`propertyTypes/${id}`, {
        propertyTypeId,
        description,
      });

      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      dispatch(
        updateItem(propertyTypes, id, res.propertyType, "ADD_PROPERTY_TYPE")
      );
    } else {
      res = await postData("propertyTypes", { propertyTypeId, description });
      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      dispatch({
        type: "ADD_PROPERTY_TYPE",
        payload: [...propertyTypes, res.newPropertyType],
      });
    }
    setPropertyTypeId("");
    setDescription("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditPropertyType = (propertyType) => {
    setId(propertyType._id);
    setPropertyTypeId(propertyType.propertyTypeId);
    setDescription(propertyType.description);
  };

  return (
    <div className="col-md-6 mx-auto my-3">
      <Head>
        <title>Tipos de Propiedad</title>
      </Head>
      <h1>Tipos de Propiedad Page Soy yo</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new product type id"
          value={propertyTypeId}
          onChange={(e) => setPropertyTypeId(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-secondary ml-1" onClick={createPropertyType}>
        {id ? "Actualizar" : "Crear"}
      </button>
      <div>
        {propertyTypes.map((propertyType) => (
          <div key={propertyType._id} className="card my-2 text-capitalize">
            <div className="card-body d-flex justify-content-between">
              {propertyType.propertyTypeId} {propertyType.description}
              <div>
                <button
                  className="btn btn-info"
                  style={{ marginLeft: "5px", flex: 1 }}
                  onClick={() => handleEditPropertyType(propertyType)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px", flex: 1 }}
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() =>
                    dispatch({
                      type: "ADD_MODAL",
                      payload: [
                        {
                          data: propertyTypes,
                          id: propertyType._id,
                          title: propertyType.description,
                          type: "ADD_PROPERTY_TYPE",
                        },
                      ],
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypes;
