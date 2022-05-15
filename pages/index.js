/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../store/GlobalState";

import { getData } from "../utils/fetchData";
import PropertyItem from "../components/PropertyItem";

const Home = (props) => {
  const [properties, setProperties] = useState(props.properties);

  const [isCheck, setIsCheck] = useState(false);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    setProperties(props.properties);
  }, [props.properties]);

  const handleCheck = (id) => {
    properties.forEach((property) => {
      if (property._id === id) property.checked = !property.checked;
    });

    setProperties([...properties]);
  };

  const handleCheckALL = () => {
    properties.forEach((property) => (property.checked = !isCheck));
    setProperties([...properties]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    properties.forEach((property) => {
      if (property.checked) {
        deleteArr.push({
          data: "",
          id: property._id,
          title: "Delete all selected properties?",
          type: "DELETE_PROPERTY",
        });
      }
    });

    dispatch({ type: "ADD_MODAL", payload: deleteArr });
  };

  return (
    <div className="home_page">
      <div
        className="delete_all btn btn-danger mt-2"
        style={{ marginBottom: "-10px" }}
      >
        <input
          type="checkbox"
          checked={isCheck}
          onChange={handleCheckALL}
          style={{
            width: "25px",
            height: "25px",
            transform: "translateY(8px)",
          }}
        />

        <button
          className="btn btn-danger ml-1"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={handleDeleteAll}
        >
          Delete all properties
        </button>
      </div>
      <div
        className="btn btn-primary mt-2 ml-2 p-3"
        style={{ marginBottom: "-10px", width: "12em", height: "3.4em" }}
      >
        <Link href={`create`}>
          <a
            style={{
              marginRight: "0.1em",
            }}
          >
            Create New Property
          </a>
        </Link>
      </div>

      <div className="my-4">
        <Head>
          <title>Home</title>
        </Head>

        {properties.length === 0 ? (
          <h3>No hay propiedades para mostrar</h3>
        ) : (
          <div className="table-responsive w-100 mx-auto ">
            <table className="table  table-striped table-font table-bordered">
              <thead className="thead-light ">
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Imagen #1</th>
                  <th scope="col">_id</th>
                  <th scope="col">Property_Id</th>
                  <th scope="col">Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Area</th>
                  <th scope="col">Construction Area</th>
                  <th scope="col">Property Type</th>
                  <th scope="col">Owner</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id} style={{ cursor: "pointer" }}>
                    <th scope="row">
                      <Link href={`create/${property._id}`}>
                        <a
                          className="btn btn-info"
                          style={{ marginRight: "5px", flex: 1 }}
                        >
                          Edit
                        </a>
                      </Link>
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
                    </th>
                    <th>
                      <div className="card mx-3 p-0" style={{ width: "6rem" }}>
                        {
                          <input
                            type="checkbox"
                            checked={property.checked}
                            className="position-absolute"
                            style={{ height: "20px", width: "20px" }}
                            onChange={() => handleCheck(property._id)}
                          />
                        }
                        <img
                          src={property.images[0].url}
                          alt={property.images[0].url}
                        />
                      </div>
                    </th>
                    <th>{property._id}</th>
                    <th>{property.property_Id}</th>
                    <th>{property.number}</th>
                    <th>{property.address}</th>
                    <th>{property.area}</th>
                    <th>{property.constructionArea}</th>
                    <th>{property.propertyTypeId}</th>
                    <th>{property.ownerId}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("property");

  return {
    props: {
      properties: res.properties,
      result: res.result,
    }, // will be passed to the page component as props
  };
}

export default Home;
