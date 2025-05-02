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
  if (!password.trim()) return "Este campo es requerido";
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

// Validación para rol (se mantiene igual)
export const validateRole = (role: string) => {
  if (!role) return "Este campo es requerido";
  return "";
};
