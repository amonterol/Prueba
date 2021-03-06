/* eslint-disable import/no-anonymous-default-export */
import connectDB from "../../../utils/connectDB";
import Owner from "../../../models/owner";
import Properties from "../../../models/property";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PUT":
      await updateOwner(req, res);
      break;
    case "DELETE":
      await deleteOwner(req, res);
      break;
  }
};

const updateOwner = async (req, res) => {
  try {
    const { id } = req.query;
    const { ownerId, name, telephone, email, identificationNumber, address } =
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

    if (!identificationNumber) {
      return res
        .status(400)
        .json({ err: "IdentificationNumber can not be left blank." });
    }

    if (!address) {
      return res.status(400).json({ err: "Address can not be left blank." });
    }

    const newOwner = await Owner.findOneAndUpdate(
      { _id: id },
      {
        ownerId,
        name,
        telephone,
        email,
        identificationNumber,
        address,
      }
    );
    res.json({
      msg: "El owner ha sido actualizado satisfactoriamente.",
      owner: {
        ...newOwner._doc,
        ownerId,
        name,
        telephone,
        email,
        identificationNumber,
        address,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteOwner = async (req, res) => {
  try {
    const { id } = req.query;

    const owner = await Owner.findById(id);

    var num = owner.ownerId;

    const properties = await Properties.find({
      ownerId: num,
    });

    if (properties.length > 0)
      return res.status(400).json({
        err: "Antes de proceder debe borrar todas las propiedades relacionadas con este propertyType",
      });

    await Owner.findByIdAndDelete(id);

    res.json({ msg: "Success! Deleted a property type" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
