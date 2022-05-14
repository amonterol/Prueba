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
        <Link href={`create/${property._id}`}>
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
                  id: property._id,
                  title: property.number,
                  type: "DELETE_PROPERTY",
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
        const router = useRouter()
        {
          <input
            type="checkbox"
            checked={property.checked}
            className="position-absolute"
            style={{ height: "20px", width: "20px" }}
            onChange={() => handleCheck(product._id)}
          />
        }
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
          <h6 className="card-text p-3">Area: ${property.Address}</h6>
          <div className="row justify-content-between mx-0">{adminLink()}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyItem;
