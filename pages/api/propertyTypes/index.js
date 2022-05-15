/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import PropertyType from "../../../models/propertyType";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createPropertyType(req, res);
      break;
    case "GET":
      await getPropertyTypes(req, res);
      break;
  }
};

const createPropertyType = async (req, res) => {
  try {
    const { propertyTypeId, description } = req.body;

    if (!propertyTypeId) {
      return res.status(400).json({ err: "El campo id es requerido." });
    }

    if (!description) {
      return res
        .status(400)
        .json({ err: "El campo description es requerido." });
    }

    const newPropertyType = new PropertyType({ propertyTypeId, description });

    await newPropertyType.save();

    res.json({
      msg: "El nuevo tipo de propiedad ha sido creado satisfactoriamente!",
      newPropertyType,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.find();

    res.json({ propertyTypes });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
