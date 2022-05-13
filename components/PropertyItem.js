/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import Image from "next/image";
import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";

const PropertyItem = ({ property }) => {
  const { state, dispatch } = useContext(DataContext);

  const adminLink = () => {
    return (
      <>
        <Link href="/">
          <a className="btn btn-info" style={{ marginRight: "5px", flex: 1 }}>
            Edit
          </a>
        </Link>
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
                  data: "",
                  id: product._id,
                  title: product.title,
                  type: "DELETE_PRODUCT",
                },
              ],
            })
          }
        >
          Delete
        </button>
      </>
    );
  };

  return (
    <div className="col mt-2 mb-2">
      <div className="card m-0 p-0" style={{ width: "20rem" }}>
        <img
          className=" card-img-top"
          src={property.images[0].url}
          alt={property.images[0].url}
          width="300%"
          height="300%"
        />
        <div className=".card-img-top">
          <h4 className="card-title">{property.Number}</h4>
          <h6 className="card-text p-3">Area: ${property.Area}</h6>
          <h6 className="card-text p-3">Area: ${property.ConstructionArea}</h6>
          <div className="row justify-content-between mx-0">{adminLink()}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
