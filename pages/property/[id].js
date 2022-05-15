/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useState, useContext } from "react";
import { getData } from "../../utils/fetchData";

const DetailProperty = (props) => {
  const [property] = useState(props.property);

  return (
    <div className="row detail_page">
      <Head>
        <title>Detail property</title>
      </Head>

      <div className="col-md-6">
        <img
          src={property.images[tab].url}
          alt={property.images[tab].url}
          className="d-block img-thumbnail rounded mt-4 w-100"
          style={{ height: "350px" }}
        />

        <div className="row mx-0" style={{ cursor: "pointer" }}>
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.url}
              className={`img-thumbnail rounded ${isActive(index)}`}
              style={{ height: "80px", width: "20%" }}
              onClick={() => setTab(index)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-6 mt-3">
        <h2 className="my-2">{property.property_Id}</h2>
        <h5 className="my-2r">{property.number}</h5>
        <div className="my-2">{property.address}</div>
        <div className="my-2">{property.area}</div>
        <div className="my-2">{property.constructionArea}</div>
        <div className="my-2">{property.propertyTypeId}</div>
        <div className="my-2">{property.ownerId}</div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`property/${id}`);
  // server side rendering
  return {
    props: { property: res.property }, // will be passed to the page component as props
  };
}

export default DetailProperty;
