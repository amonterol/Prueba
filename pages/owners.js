import Link from "next/link";

import React from "react";
import Head from "next/head";
import { useContext, useState } from "react";
import { DataContext } from "../store/GlobalState";

import { updateItem } from "../store/Actions";
import { postData, putData } from "../utils/fetchData";

const Owners = () => {
  const [ownerId, setOwnerId] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [address, setAddress] = useState("");

  const { state, dispatch } = useContext(DataContext);
  const { owners } = state;

  const [id, setId] = useState("");

  const createOwner = async () => {
    if (!ownerId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Owner Id can not be left blank." },
      });

    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Name can not be left blank." },
      });

    if (!telephone)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Telephone can not be left blank." },
      });

    if (!email)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Email can not be left blank." },
      });

    if (!identificationNumber)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "IdentificationNumber can not be left blank." },
      });

    if (!address)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Address can not be left blank." },
      });

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    let res;
    if (id) {
      res = await putData(`owners/${id}`, {
        ownerId,
        name,
        telephone,
        email,
        identificationNumber,
        address,
      });

      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      dispatch(updateItem(owners, id, res.owner, "ADD_OWNER"));
    } else {
      res = await postData("owners", {
        ownerId,
        name,
        telephone,
        email,
        identificationNumber,
        address,
      });
      if (res.err) {
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      }

      dispatch({
        type: "ADD_OWNER",
        payload: [...owners, res.newOwner],
      });
    }
    setOwnerId("");
    setName("");
    setTelephone("");
    setEmail("");
    setIdentificationNumber("");
    setAddress("");
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };

  const handleEditOwner = (owner) => {
    setId(owner._id);
    setOwnerId(owner.ownerId);
    setName(owner.name);
    setTelephone(owner.telephone);
    setEmail(owner.email);
    setIdentificationNumber(owner.identificationNumber);
    setAddress(owner.address);
  };

  return (
    <div className="col mx-auto my-3">
      <Head>
        <title>Owners</title>
      </Head>
      <h1>Gestión de Owners</h1>

      <div className="row">
        <div className="col-md-6 mx-auto my-3 ">
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new product type id"
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new telephone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new identificationNumber"
              value={identificationNumber}
              onChange={(e) => setIdentificationNumber(e.target.value)}
            />
          </div>
          <div className="input-group mb-3 w-100 p-2">
            <input
              type="text"
              className="form-control"
              placeholder="Add a new address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button
            className="btn btn-secondary ml-1 my-3 w-100 h4"
            onClick={createOwner}
          >
            {id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>

      <div className="table-responsive w-100 mx-auto">
        <table className="table  table-striped table-font">
          <thead className="thead-dark ">
            <tr>
              <th></th>
              <th></th>
              <th>ID</th>
              <th>Name</th>
              <th>Telephone</th>
              <th>Email</th>
              <th>Identification Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id} style={{ cursor: "pointer" }}>
                <th>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "5px", flex: 1 }}
                    onClick={() => handleEditOwner(owner)}
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
                            data: owners,
                            id: owner._id,
                            title: owner.name,
                            type: "ADD_OWNER",
                          },
                        ],
                      })
                    }
                  >
                    Delete
                  </button>
                </th>
                <th>{owner._id}</th>
                <th>{owner.name}</th>
                <th>{owner.telephone}</th>
                <th>{owner.email}</th>
                <th>{owner.identificationNumber}</th>
                <th>{owner.address}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Owners;
