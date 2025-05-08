// Validacion para nombres y apellidos
export const validateName = (name: string) => {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;

  if (!name.trim()) return "Este campo es requerido";
  if (!nameRegex.test(name)) return "Solo se permiten letras y espacios";
  if (name.trim().length < 2) return "Debe tener al menos 2 caracteres";
  if (name.trim().length > 50) return "No puede exceder los 50 caracteres";
  return "";
};

//Validacion para username
export const validateUsername = (username: string) => {
  const usernameRegex = /^[a-zA-ZñÑ][a-zA-Z0-9ñÑ]*(?:[-_][a-zA-ZñÑ0-9]+)*$/;

  if (!username) return "Este campo es requerido";
  if (!usernameRegex.test(username)) {
    return (
      "Solo letras (a-z, A-Z), números y guiones (-_)\n" +
      "No puede empezar con números o guiones\n" +
      "No puede terminar con guiones"
    );
  }
  if (username.length < 4) return "Mínimo 4 caracteres";
  if (username.length > 30) return "Maximo 20 caracteres";

  return "";
};

// Validacion para contraseña
export const validatePassword = (password: string) => {
  if (!password) return "Este campo es requerido";
  if (password.length < 4) return "Debe tener al menos 4 caracteres";
  if (password.length > 16) return "No puede exceder los 16 caracteres";
  return "";
};

// Validacion para telefono en (México)
export const validatePhoneMX = (phone: string) => {
  if (!phone.trim()) return "Este campo es requerido";
  if (/\D/.test(phone)) return "Solo se permiten números (0-9)";
  if (phone[0] === "0" || phone[0] === "1") return "La region no es valida";
  if (phone.length !== 10) return "Debe tener 10 dígitos exactos";
  return "";
};

// Validación para rol
export const validateRole = (role: string) => {
  if (!role) return "Este campo es requerido";
  return "";
};

// Validacion para direccion
export const validateAddress = (address: string) => {
  if (!address.trim()) return "Este campo es requerido";
  return "";
};

// Validación para fk(number != 0)
export const validateFk = (fk: number) => {
  if (!fk) return "Este campo es requerido";
  return "";
};

export const validateStartDate = (date: string) => {
  if (!date) return "Este campo es requerido";
  return "";
};

export const validateEndDate = (startDate: string, endDate: string) => {
  if (!startDate) return "La fecha de inicio no sea definido";
  if (!endDate) return "Este campo es requerido";

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    return "La fecha de finalización no puede ser anterior a la de inicio.";
  }

  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 7) {
    return "El proyecto debe tener una duración mínima de una semana.";
  }

  return "";
};
