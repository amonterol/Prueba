/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Property from "../../../models/property";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProperties(req, res);
      break;
    case "POST":
      await createProperty(req, res);
      break;
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.json({
      status: "success",
      result: properties.length,
      properties,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const {
      property_Id,
      number,
      address,
      area,
      constructionArea,
      propertyTypeId,
      ownerId,
      images,
    } = req.body;
    /*
    if (!property_Id)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error:
            "El número de identificación de la porpiedad  es un campo requerido.",
        },
      });
    if (!number)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El número de propiedad  es un campo requerido." },
      });
    if (!address)
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "La dirección de la propiedad es un campo requerido.",
        },
      });
    if (!area)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "El area de la propiedad es un campo requerido." },
      });
    if (!propertyTypeId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Property Type es un campo requerido." },
      });
    if (!ownerId)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Owner es un campo requerido." },
      });
      */

    const property = await Property.findOne({ property_Id });
    if (property) {
      return res.status(400).json({
        err: "La property_Id fue registrada anteriormente en la base de datos.",
      });
    }

    const newProperty = new Property({
      property_Id,
      number,
      address,
      area,
      constructionArea,
      propertyTypeId,
      ownerId,
      images,
    });

    await newProperty.save();
    res.json({
      msg: "Los datos de la propiedad se han guardado en la base de datos.",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
