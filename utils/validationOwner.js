const validationOwner = (
  ownerId,
  name,
  telephone,
  email,
  identificationNumber,
  address
) => {
  if (
    !ownerId &&
    !name &&
    !telephone &&
    !email &&
    !identificationNumber &&
    !address
  )
    return "Por favor complete toda la información requerida.";

  if (!ownerId)
    return "El número de identificación de la propietario  es un campo requerido.";

  if (!validateOwnerId(ownerId)) return "La OwnerId debe ser un número entero.";

  if (!validateOwnerIdMayorQueCero(ownerId)) {
    return "Ingrese un property_Id que sea un número entero.";
  }

  if (!name) return "El nombre del propietario es un campo requerido.";

  if (!validateName(name))
    return "El campo name requiere se ingrese solo caracteres alfanuméricos -- NO USE TILDES.";

  if (!telephone) return "Telephone es un campo requerido";

  if (!validateTelephone(telephone))
    return "El campo telephone requiere se ingrese 8 caracteres numéricos sin ser 0 el primero.";

  if (!email) return "El email es un campo requerido.";

  if (!validateEmail(email))
    return "El email debe corresponder a una dirección de correo electrónico válida.";

  if (!identificationNumber)
    return "IdentificationNumber es un campo requerido.";

  if (!validateIdentificationNumber(identificationNumber)) {
    return "El campo identificationNumber requiere se ingrese solo caracteres alfanuméricos y guiones.";
  }

  if (!address) return "La dirección de la propiedad es un campo requerido.";

  if (!validateAddress(address)) {
    return "El campo address requiere se ingrese solo caracteres alfanuméricos ---  NO USE TILDES.";
  }
};

function validateOwnerId(ownerId) {
  const re = /^[0-9]*$/;
  return re.test(ownerId);
}

function validateOwnerIdMayorQueCero(ownerId) {
  const parsed = parseInt(ownerId, 10);
  if (parsed === 0) {
    return false;
  } else {
    return true;
  }
}

function validateName(name) {
  const re = /^([A-Za-z\s]+)$/;
  return re.test(name);
}

function validateTelephone(telephone) {
  const re = /((^[1-9])+([0-9]{7}))$/;
  return re.test(telephone);
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateIdentificationNumber(identificationNumber) {
  const re =
    /(((^[0-9]+[-A-Za-z]+))$)|(((^[0-9]+[A-Za-z]+))$)|(((^[A-Za-z]+)+([0-9]+))$)|(((^[A-Za-z]+)+(-[0-9]+))$)|(((^[A-Za-z])+(-[0-9]+))$)|(((^[1-9])+([0-9]{8}))$)|(((^[1-9])+(-[0-9]{4})+(-[0-9]{4}))$)/;
  return re.test(identificationNumber);
}

function validateAddress(address) {
  const re = /^([A-Za-z0-9\s]+)$/;
  return re.test(address);
}

export default validationOwner;
