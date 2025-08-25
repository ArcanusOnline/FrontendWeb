// Procesa el token pasado como argumento, y recupera el username desde el payload (En caso de existir)

async function protectedName(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload.username;
  } catch (error) {
    return false;
  }
}

export { protectedName };
