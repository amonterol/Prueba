/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Owner from "../../../models/OwnerModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createOwner(req, res);
      break;
    case "GET":
      await getOwners(req, res);
      break;
  }
};

const createOwner = async (req, res) => {
  try {
    const { ownerId, name, telephone, email, identificacionNumber, address } =
      req.body;

    if (!ownerId) {
      return res.status(400).json({ err: "El campo id es requerido." });
    }

    if (!name) {
      return res.status(400).json({ err: "Name can not be left blank." });
    }

    if (!telephone) {
      return res.status(400).json({ err: "Telephone can not be left blank." });
    }

    if (!email) {
      return res.status(400).json({ err: "Email can not be left blank." });
    }

    if (!identificacionNumber) {
      return res
        .status(400)
        .json({ err: "IdentificationNumber can not be left blank." });
    }

    if (!address) {
      return res.status(400).json({ err: "Address can not be left blank." });
    }

    const newOwner = new Owner({
      ownerId,
      name,
      telephone,
      email,
      identificacionNumber,
      address,
    });

    await newOwner.save();

    res.json({
      msg: "El nuevo tipo de propiedad ha sido creado satisfactoriamente!",
      newOwner,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getOwners = async (req, res) => {
  try {
    const Owners = await Owner.find();

    res.json({ Owners });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
