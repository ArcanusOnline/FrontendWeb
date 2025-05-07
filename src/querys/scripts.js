let urlBase = import.meta.env.VITE_API_URL;

async function login(nick, pass) {
  try {
    let response = await fetch(`${urlBase}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nick: nick,
        pass: pass,
      }),
    });
    let data;
    let respuesta = await response.json();
    if (!response.ok) {
      data = {
        message: respuesta?.message || "Error desconocido",
        state: false,
      };
      return data;
    }
    data = {
      message: `Bienvenido ${respuesta.username}`,
      state: true,
      token: respuesta.token,
      username: respuesta.username,
    };
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getTop100() {
  try {
    let response = await fetch(`${urlBase}/top100`);
    let data;

    if (!response.ok) {
      data = { message: "Hubo un error al cargar el ranking" };
      return data;
    }
    data = await response.json();
    if (data.length === 0) {
      return { message: "No hay datos para mostrar", state: false };
    }
    return data;
  } catch (error) {
    console.error("Hubo un error al conectarse con el servidor");
  }
}

async function comenzarDescarga() {
  try {
    let response = await fetch(`${urlBase}/download`);

    if (response.ok) {
      let blob = await response.blob();
      let url = window.URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.href = url;

      let filename =
        response.headers.get("Content-Disposition")?.split("filename=")[1] ||
        "clienteArcanus.txt";
      a.download = filename.replace(/"/g, "");

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      return;
    } else {
      console.log("Fallo la descarga");
    }
  } catch (error) {
    console.error("Error en la descarga:", error);
  }
}

async function rankingPorClases(clase) {
  try {
    const response = await fetch(`${urlBase}/rankingByClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clase }),
    });

    const data = await response.json();

    // Si no está ok, devolvemos el mensaje que vino del backend o uno por defecto
    if (!response.ok) {
      return data.message
        ? data
        : { message: "No se pudo obtener el ranking." };
    }

    return data;
  } catch (error) {
    console.error("Error al cargar el ranking:", error);
    return { message: "Error al conectar con el servidor." };
  }
}

async function showMiniStats(nick) {
  try {
    let response = await fetch(`${urlBase}/miniStats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nick: nick,
      }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function extraerNoticias() {
  try {
    let response = await fetch(`${urlBase}/getNews`);
    if (!response.ok) {
      let msg = { message: "No se pudo cargar la noticia" };
      return msg;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error al conectar con el servidor" };
  }
}

async function personajesPorCuenta(token) {
  try {
    let response = await fetch(`${urlBase}/showCharacterCount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      let msg = { message: "No se encontraron personajes para esta cuenta" };
      return msg;
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function cambiarContra(
  userName,
  userPin,
  userOldPass,
  userNewPass,
  userEmail
) {
  try {
    let response = await fetch(`${urlBase}/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userPin,
        userOldPass,
        userNewPass,
        userEmail,
      }),
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
}

async function enviarActivacion(token) {
  try {
    let response = await fetch(`${urlBase}/activateAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    let data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
}

async function traerInfoIndividual(nombre) {
  try {
    const response = await fetch(`${urlBase}/getInfoByCharacter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        message: data.message || "Error al traer los datos",
        error: true,
      };
    }

    return { ...data, error: false };
  } catch (error) {
    console.error("Error de red al conectarse con el servidor:", error);
    return { message: "Error de red o del servidor", error: true };
  }
}

async function cambiarPin(
  userName,
  userPin,
  userOldPass,
  userNewPin,
  userEmail
) {
  try {
    let response = await fetch(`${urlBase}/changePinCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userPin,
        userOldPass,
        userNewPin,
        userEmail,
      }),
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
}

async function cambiarEmail(
  userName,
  userPin,
  userOldPass,
  userNewEmail,
  userEmail
) {
  try {
    let response = await fetch(`${urlBase}/changeAccountEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userPin,
        userOldPass,
        userNewEmail,
        userEmail,
      }),
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    console.error(error);
  }
}

async function recuperarCuenta(fields) {
  try {
    let response = await fetch(`${urlBase}/recoverAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // importante
      },
      body: JSON.stringify(fields), // <-- enviás directamente los campos
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function cambioPasswordRecupero(fields, token) {
  try {
    let response = await fetch(`${urlBase}/changeRecoveryPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function recuperarPersonaje(fields) {
  try {
    let response = await fetch(`${urlBase}/recoverCharacter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function cambioPasswordRecuperoPersonaje(fields, token) {
  try {
    let response = await fetch(`${urlBase}/changeRecoveryPasswordCharacter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function registrarCuenta({
  NombreCuenta,
  Clave,
  Mail,
  Nombre,
  Apellido,
  Pais,
  Localidad,
  Provincia,
  FechaNacimiento,
  pin,
}) {
  try {
    let response = await fetch(`${urlBase}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        NombreCuenta,
        Clave,
        Mail,
        Nombre,
        Apellido,
        Pais,
        Localidad,
        Provincia,
        FechaNacimiento,
        pin,
      }),
    });
    let data = await response.json();
    alert(data.message);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function quitarPersonajeCuenta(nick) {
  try {
    let response = await fetch(`${urlBase}/removeCharacterForAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: nick }),
    });
    let data = await response.json();
    return data?.message;
  } catch (error) {
    console.error(error);
  }
}

async function eliminarPersonajeCuenta(nick) {
  try {
    let response = await fetch(`${urlBase}/deleteCharacterForAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: nick }),
    });
    let data = await response.json();
    return data?.message;
  } catch (error) {
    console.error(error);
  }
}

async function confirmarEliminacionPersonaje(token) {
  try {
    let response = await fetch(`${urlBase}/confirmCharacterDeletion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function confirmUpdateEmailAccountQuery(token) {
  if (!token) {
    throw new Error("No se proporcionó token.");
  }
  const url = `${urlBase}/confirmUpdateEmailAcc`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return {
    status: res.status,
    message: data.message || "",
  };
}
async function agregarPersonajeCuenta({
  nombre,
  contrasena,
  pin,
  email,
  nombreCuenta,
}) {
  try {
    const response = await fetch(`${urlBase}/agregarPersonajeCuenta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        contrasena,
        pin,
        email,
        nombreCuenta,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al agregar personaje.");
    }
    const data = await response.json();
    return data.message || "Personaje agregado exitosamente.";
  } catch (error) {
    throw new Error(error.message || "Error de red al agregar personaje.");
  }
}

async function confirmAddCharacterAccount(token) {
  if (!token) {
    throw new Error("No se proporcionó token.");
  }
  const url = `${urlBase}/confirmAddAccountCharacter`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return {
    status: res.status,
    message: data.message || "",
  };
}

async function obtenerSoportes(token) {
  if (!token) {
    throw new Error("No se proporcionó token.");
  }
  const url = `${urlBase}/recuperarSoportes`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return { message: data.message || "Error desconocido" };
  }

  return data;
}

async function obtenerDataSoporte(id, token) {
  try {
    let response = await fetch(`${urlBase}/traerDataSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      return null; // No autorizado o no pertenece
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Error en la carga del soporte.");
  }
}

async function traerInfoPersonajeAsuntoSoporte(token) {
  try {
    let response = await fetch(`${urlBase}/traerInformacionParaSoporte`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    if (data.error === 0) {
      return { data, error: 0 };
    } else {
      return { message: data.message, error: 1 };
    }
  } catch (error) {
    throw new Error(error.message || "Error al cargar los datos");
  }
}

async function enviarNuevoSoporte(datos) {
  try {
    let response = await fetch(`${urlBase}/insertarSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${datos.token}`,
      },
      body: JSON.stringify({
        sector: datos.sector,
        asunto: datos.asunto,
        texto: datos.texto,
        nick: datos.nick,
        censura: datos.censura,
      }),
    });

    let data = await response.json();
    if (data.error === 0) {
      return { message: data.message, error: 0 };
    } else {
      return data.message;
    }
  } catch (error) {
    throw new Error(error.message || "Error al cargar los datos");
  }
}
async function enviarRespuestaNuevaSoporte(datos) {
  try {
    let response = await fetch(`${urlBase}/agregarRespuestaSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${datos.token}`,
      },
      body: JSON.stringify({
        censura: datos.censura,
        texto: datos.texto,
        idSoporte: datos.idSoporte,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al enviar la respuesta:", error.message);
  }
}

async function cerrarSoporte(id) {
  try {
    let response = await fetch(`${urlBase}/cerrarSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idSoporte: id }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al enviar la respuesta:", error.message);
  }
}
export {
  login,
  getTop100,
  comenzarDescarga,
  rankingPorClases,
  showMiniStats,
  extraerNoticias,
  personajesPorCuenta,
  cambiarContra,
  enviarActivacion,
  traerInfoIndividual,
  cambiarPin,
  cambiarEmail,
  recuperarCuenta,
  recuperarPersonaje,
  registrarCuenta,
  cambioPasswordRecupero,
  eliminarPersonajeCuenta,
  quitarPersonajeCuenta,
  confirmarEliminacionPersonaje,
  cambioPasswordRecuperoPersonaje,
  confirmUpdateEmailAccountQuery,
  agregarPersonajeCuenta,
  confirmAddCharacterAccount,
  obtenerSoportes,
  obtenerDataSoporte,
  traerInfoPersonajeAsuntoSoporte,
  enviarNuevoSoporte,
  enviarRespuestaNuevaSoporte,
  cerrarSoporte,
};
