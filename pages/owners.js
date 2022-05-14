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
      console.log(id);
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

      console.log(res);

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

  const handleEditOwner = () => {
    setId(owner._id);
    setOwnerId(owner.ownerId);
    setName(owner.name);
    setTelephone(owner.telephone);
    setEmail(owner.email);
    setIdentificationNumber(owner.identificationNumber);
    setAddress(owner.address);
  };

  return (
    <div className="col-md-6 mx-auto my-3">
      <Head>
        <title>Owners</title>
      </Head>
      <h1>Onwer Page ahora soy el otro</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new product type id"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new identificationNumber"
          value={identificationNumber}
          onChange={(e) => setIdentificationNumber(e.target.value)}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button className="btn btn-secondary ml-1" onClick={createOwner}>
        {id ? "Actualizar" : "Crear"}
      </button>
      <div>
        {owners.map((owner) => (
          <div key={owner._id} className="card my-2 text-capitalize">
            <div className="card-body d-flex justify-content-between">
              {owner.ownerId} {owner.name}
              <div>
                <button
                  className="btn btn-info"
                  style={{ marginLeft: "5px", flex: 1 }}
                  onClick={() => handleEditOwner(owner)}
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Owners;
