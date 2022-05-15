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

  const [bandera, setBandera] = useState(true);

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
      setBandera(false);
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
    <div className="col-md-8 mx-auto my-3">
      <Head>
        <title>Tipos de Propiedad</title>
      </Head>
      <h3 className="mx-auto d-flex justify-content-center my-5">
        Gestión de Tipos de Propiedad{" "}
      </h3>
      <div className="input-group my-5  ">
        <input
          type="text"
          className="form-control  "
          placeholder="Add a new product type id"
          value={propertyTypeId}
          onChange={(e) => setPropertyTypeId(e.target.value)}
        />
      </div>
      <div className="input-group  my-5">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        className="btn btn-secondary mx-auto w-50 d-flex  justify-content-center "
        onClick={createPropertyType}
      >
        {id && bandera ? "Actualizar" : "Crear"}
      </button>
      <h4 className="mx-auto d-flex justify-content-center mt-5">
        Lista de Tipos de Propiedades
      </h4>
      <div className="table-responsive w-100 mx-auto my-3">
        <table className="table  table-striped table-font mx-auto">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>_id</th>
              <th>PropetyTypeID</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes.map((propertyType) => (
              <tr key={propertyType._id} style={{ cursor: "pointer" }}>
                <th>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "5px", flex: 1 }}
                    onClick={() => handleEditPropertyType(propertyType)}
                  >
                    Edit
                  </button>
                </th>
                <th>
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
                </th>
                <th>{propertyType._id}</th>
                <th>{propertyType.propertyTypeId}</th>
                <th>{propertyType.description}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyTypes;
