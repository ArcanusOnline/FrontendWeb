//const urlBase = import.meta.env.VITE_API_URL;
const urlBase = "/api"; // relativo - activar cuando se deploye el netlify.toml

async function login(nick, pass, captcha) {
  try {
    let response = await fetch(`${urlBase}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        nick: nick,
        pass: pass,
        captcha: captcha,
      }),
    });
    console.log(response);
    // Parsear la respuesta
    let respuesta = await response.json();

    // Manejo de errores si la respuesta no es ok
    if (!response.ok) {
      return {
        message: respuesta?.message || "Error desconocido",
        state: false,
      };
    }

    // Si todo es correcto, devolver mensaje y datos
    return {
      message: `Bienvenido ${respuesta.username}`,
      state: true,
      username: respuesta.username,
    };
  } catch (error) {
    // Manejo de errores en caso de fallo en la llamada fetch
    console.error("Error en el login:", error);
    return {
      message:
        "Hubo un error al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.",
      state: false,
    };
  }
}

async function getTop100() {
  try {
    let response = await fetch(`${urlBase}/top100`);

    // Si la respuesta no es ok, devolver mensaje de error
    if (!response.ok) {
      return { message: "Hubo un error al cargar el ranking", state: false };
    }

    // Parsear la respuesta en formato JSON
    let data = await response.json();

    // Si no hay datos en el top 100, devolver un mensaje
    if (data.length === 0) {
      return { message: "No hay datos para mostrar", state: false };
    }

    // Si todo está bien, devolver los datos con estado true
    return data;
  } catch (error) {
    // Capturar errores de la llamada fetch
    console.error("Hubo un error al conectarse con el servidor:", error);
    return { message: "Error al conectarse con el servidor", state: false };
  }
}

async function getRankingRetos() {
  try {
    let response = await fetch(`${urlBase}/obtener-ranking-retos`);

    // Si la respuesta no es ok, devolver mensaje de error
    if (!response.ok) {
      return { message: "Hubo un error al cargar el ranking", state: false };
    }

    // Parsear la respuesta en formato JSON
    let data = await response.json();

    // Si no hay datos en el ranking de retos, devolver un mensaje
    if (data.ranking.length === 0) {
      return { message: "No hay datos para mostrar", state: false };
    }

    // Si todo está bien, devolver el ranking con estado true
    return data.ranking;
  } catch (error) {
    // Capturar errores de la llamada fetch
    console.error("Hubo un error al conectarse con el servidor:", error);
    return { message: "Error al conectarse con el servidor", state: false };
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
    // Enviar la clase al servidor
    const response = await fetch(`${urlBase}/rankingByClass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clase }),
    });

    // Obtener los datos de la respuesta
    const data = await response.json();
    // Si no hay datos para la clase, devolver un mensaje adecuado
    if (data.length === 0) {
      return {
        message: "No se encontraron datos para esta clase.",
        state: false,
      };
    }

    // Retornar los datos transformados
    return data;
  } catch (error) {
    // Manejo de errores de conexión
    console.error("Error al cargar el ranking:", error);
    return { message: "Error al conectar con el servidor.", state: false };
  }
}

async function showMiniStats(nick) {
  try {
    // Validación del nick (solo letras y espacio opcional)
    const regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/g;
    if (!regex.test(nick)) {
      return { message: "Por favor ingrese un nick valido", state: false };
    }

    // Realizar la consulta al backend
    let response = await fetch(`${urlBase}/miniStats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nick: nick }),
    });

    let data = await response.json();

    // Si la respuesta no es ok, devolver el mensaje adecuado
    if (!response.ok) {
      return {
        message: data.message || "Error al obtener las mini estadísticas",
        state: false,
      };
    }

    // Si no se encuentran estadísticas, devolver un mensaje adecuado
    if (data.message === "Personaje no encontrado") {
      return { message: "Personaje no encontrado", state: false };
    }
    return data;
  } catch (error) {
    // Manejo de errores generales
    console.error("Error al obtener las mini estadísticas:", error);
    return { message: "Error al conectar con el servidor.", state: false };
  }
}

async function extraerNoticias() {
  try {
    let response = await fetch(`${urlBase}/getNews`);

    // Si la respuesta no es ok, manejar el error con un mensaje adecuado
    if (!response.ok) {
      let msg = { message: "No se pudo cargar la noticia", state: false };
      return msg;
    }

    let data = await response.json();

    // Si no hay datos o la respuesta contiene un mensaje de error
    if (!data || data.message === "No hay noticias disponibles") {
      return { message: "No hay noticias disponibles", state: false };
    }
    return data;
  } catch (error) {
    // Manejo de errores generales
    console.error(error);
    return { message: "Error al conectar con el servidor", state: false };
  }
}

async function listarPersonajes(email) {
  try {
    let response = await fetch(`${urlBase}/obtener-listado-personajes-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    // Si la respuesta no es exitosa, manejar el error
    if (!response.ok) {
      return { error: 1, message: "No se encontraron personajes" };
    }

    // Obtener los datos JSON de la respuesta
    let data = await response.json();

    // Retornar los datos de los personajes con estado positivo
    return data;
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    return { message: "Error al conectar con el servidor", error: 1 };
  }
}

async function personajesPorCuenta() {
  try {
    let response = await fetch(`${urlBase}/showCharacterCount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Si la respuesta no es exitosa, manejar el error
    if (!response.ok) {
      let msg = {
        message: "No se encontraron personajes para esta cuenta",
        state: false,
      };
      return msg;
    }

    // Obtener los datos JSON de la respuesta
    let data = await response.json();

    // Si no se encuentran personajes, retornar mensaje de error
    if (data.message && data.message === "No se encontraron personajes.") {
      return { message: data.message, state: false };
    }

    // Retornar los datos de los personajes con estado positivo
    return data;
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
    return { message: "Error al conectar con el servidor", state: false };
  }
}

async function cambiarContra(userPin, userOldPass, userNewPass, userEmail) {
  try {
    let response = await fetch(`${urlBase}/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userPin,
        userOldPass,
        userNewPass,
        userEmail,
      }),
    });

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      let data = await response.json();
      return data.message;
    }

    // Obtener la respuesta JSON
    let data = await response.json();

    // Devolver el mensaje de éxito si todo salió bien
    return data.state;
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    return { message: "Error al conectar con el servidor", state: false };
  }
}

async function generarDonacion(valor) {
  try {
    let response = await fetch(`${urlBase}/generate-link-donate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        valor,
      }),
    });
    if (!response.ok) {
      let data = await response.json();
      return data.message;
    }

    // Obtener la respuesta JSON
    let data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al generar la donacion", error);
    return { message: "Error al conectar con el servidor", error: 1 };
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

    // Si la respuesta no es exitosa, manejar el error
    if (!response.ok) {
      let data = await response.json();
      return {
        message: data.message || "Error al activar la cuenta.",
        state: false,
      };
    }

    // Si la respuesta es exitosa, devolver el mensaje
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar activación:", error);
    return { message: "Error al conectar con el servidor", state: false };
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

    // Esperamos a que el servidor responda
    const data = await response.json();

    // Verificamos si la respuesta fue exitosa
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

async function cambiarPin(userPin, userOldPass, userNewPin, userEmail) {
  try {
    let response = await fetch(`${urlBase}/changePinCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
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

async function cambiarEmail(userPin, userOldPass, userNewEmail, userEmail) {
  try {
    // Realiza la solicitud a la API para cambiar el email
    let response = await fetch(`${urlBase}/changeAccountEmail`, {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Tipo de contenido JSON
      },
      credentials: "include",
      body: JSON.stringify({
        userPin,
        userOldPass,
        userNewEmail,
        userEmail,
      }), // Datos que se envían al servidor
    });

    // Convertir la respuesta a JSON
    let data = await response.json();

    // Verificar si el servidor devolvió un mensaje de error
    if (data.error) {
      throw new Error(data.message || "Error desconocido");
    }
    // Retornar el mensaje de éxito
    return data.state;
  } catch (error) {
    // Manejo de errores
    console.error("Error en la solicitud de cambio de email:", error);
    return `Error: ${error.message}`;
  }
}

async function recuperarCuenta(fields) {
  try {
    // Realiza la solicitud a la API para recuperar la cuenta
    let response = await fetch(`${urlBase}/recoverAccount`, {
      method: "POST", // Método POST
      headers: {
        "Content-Type": "application/json", // Tipo de contenido JSON
      },
      body: JSON.stringify(fields), // Enviar los datos recibidos
    });

    // Convertir la respuesta a JSON
    let data = await response.json();

    // Verificar si la respuesta contiene un campo 'error'
    if (data.error) {
      throw new Error(data.message || "Error desconocido");
    }

    // Retornar los datos de la respuesta si es exitosa
    return data;
  } catch (error) {
    // Manejo de errores
    console.error(
      "Error al hacer la solicitud de recuperación de cuenta:",
      error
    );
    return { message: `Error: ${error.message}`, error: true }; // Responder con el mensaje de error
  }
}

async function cambioPasswordRecupero(fields, token) {
  try {
    // Verificar si el token fue proporcionado
    if (!token) {
      throw new Error("Token no proporcionado");
    }

    // Realiza la solicitud para cambiar la contraseña
    let response = await fetch(`${urlBase}/changeRecoveryPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tipo de contenido JSON
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      body: JSON.stringify(fields), // Enviar los datos (nueva contraseña)
    });

    // Obtener los datos de la respuesta
    let data = await response.json();

    // Verificar si la respuesta contiene un error
    if (data.error) {
      throw new Error(
        data.message || "Error desconocido al cambiar la contraseña"
      );
    }

    // Retornar los datos si la solicitud fue exitosa
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al cambiar la contraseña:", error);
    return { message: `Error: ${error.message}`, error: true }; // Devolver el error con un mensaje
  }
}

async function recuperarPersonaje(fields) {
  try {
    // Realiza la solicitud para recuperar el personaje
    let response = await fetch(`${urlBase}/recoverCharacter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tipo de contenido JSON
      },
      body: JSON.stringify(fields), // Enviar los datos del personaje
    });

    // Obtener los datos de la respuesta
    let data = await response.json();

    // Verificar si la respuesta contiene un error
    if (data.error) {
      throw new Error(
        data.message || "Error desconocido al recuperar el personaje"
      );
    }

    // Retornar los datos si la solicitud fue exitosa
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al recuperar el personaje:", error);
    return { message: `Error: ${error.message}`, error: true }; // Devolver el error con un mensaje
  }
}

async function cambioPasswordRecuperoPersonaje(fields, token) {
  try {
    // Realiza la solicitud para cambiar la contraseña del personaje
    let response = await fetch(`${urlBase}/changeRecoveryPasswordCharacter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar token en el header
      },
      body: JSON.stringify(fields), // Enviar los datos de la nueva contraseña
    });

    // Obtener los datos de la respuesta
    let data = await response.json();

    // Verificar si la respuesta contiene un error
    if (data.error) {
      throw new Error(
        data.message ||
          "Error desconocido al cambiar la contraseña del personaje"
      );
    }

    // Retornar los datos si la solicitud fue exitosa
    return data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al cambiar la contraseña del personaje:", error);
    return { message: `Error: ${error.message}`, error: true }; // Devolver el error con un mensaje
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
  captcha,
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
        captcha,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: true, message: errorData.message };
    }

    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud de registro:", error);
    return {
      message:
        "Ocurrió un error al intentar registrar la cuenta. Por favor, inténtelo nuevamente.",
      error: true,
    };
  }
}

async function quitarPersonajeCuenta(nick) {
  try {
    const response = await fetch(`${urlBase}/removeCharacterForAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: nick }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al eliminar personaje:", data.message);
      return { success: false, message: data.message };
    }
    return data;
  } catch (error) {
    console.error("Error de red o servidor:", error);
    return { success: false, message: "Error al conectar con el servidor." };
  }
}

async function eliminarPersonajeCuenta(nick) {
  try {
    const response = await fetch(`${urlBase}/deleteCharacterForAccount`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: nick }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al enviar solicitud de eliminación:", data.message);
      return { success: false, message: data.message };
    }
    return data;
  } catch (error) {
    console.error("Error de red:", error);
    return { success: false, message: "Error al conectar con el servidor." };
  }
}

async function confirmarEliminacionPersonaje(token) {
  try {
    const response = await fetch(`${urlBase}/confirmCharacterDeletion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error al confirmar la eliminación:", data.message);
      return { success: false, message: data.message };
    }

    return data;
  } catch (error) {
    console.error("Error de red al confirmar eliminación:", error);
    return {
      success: false,
      message: "No se pudo conectar con el servidor.",
    };
  }
}

async function confirmUpdateEmailAccountQuery(token) {
  try {
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
  } catch (error) {
    console.error("Error en confirmUpdateEmailAccountQuery:", error);
    return {
      status: 500,
      message: "Error al conectar con el servidor.",
    };
  }
}

async function agregarPersonajeCuenta({ nombre, contrasena, pin, email }) {
  try {
    const response = await fetch(`${urlBase}/agregarPersonajeCuenta`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ nombre, contrasena, pin, email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al agregar personaje.");
    }
    return data.state || "Personaje agregado exitosamente.";
  } catch (error) {
    console.error("Error en agregarPersonajeCuenta:", error);
    return {
      success: false,
      message: error.message || "Error de red al agregar personaje.",
    };
  }
}

async function confirmAddCharacterAccount(token) {
  if (!token) {
    throw new Error("No se proporcionó token.");
  }

  try {
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
      success: res.ok,
      status: res.status,
      message: data.message || "",
    };
  } catch (error) {
    console.error("Error confirmando personaje:", error);
    return {
      success: false,
      status: 500,
      message: "Error al intentar confirmar la operación.",
    };
  }
}

async function obtenerSoportes() {
  try {
    const url = `${urlBase}/recuperarSoportes`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Error desconocido",
      };
    }

    return data;
  } catch (error) {
    console.error("Error al obtener soportes:", error);
    return {
      success: false,
      message: "Error de red o del servidor.",
    };
  }
}

async function obtenerDataSoporte(id) {
  if (!id) {
    throw new Error("Faltan parámetros requeridos.");
  }

  try {
    const response = await fetch(`${urlBase}/traerDataSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "No autorizado o no pertenece.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener data del soporte:", error);
    throw new Error(error.message || "Error en la carga del soporte.");
  }
}

async function traerInfoPersonajeAsuntoSoporte() {
  try {
    const response = await fetch(`${urlBase}/traerInformacionParaSoporte`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok || data.error !== 0) {
      return { message: data.message || "Error desconocido", error: 1 };
    }

    return { data, error: 0 };
  } catch (error) {
    throw new Error(error.message || "Error al cargar los datos");
  }
}

async function checkAuth() {
  try {
    const response = await fetch(`${urlBase}/checkAuth`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok || data.error !== 0) {
      return { valid: false }; // No autorizado
    }

    return data; // { valid: true, username: "..." }
  } catch (error) {
    console.error("Error en checkAuth:", error.message);
    return { valid: false, message: error.message || "Error en la solicitud" };
  }
}

async function enviarNuevoSoporte(datos) {
  try {
    let response = await fetch(`${urlBase}/insertarSoporte`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
      },
      credentials: "include",
      body: JSON.stringify({
        censura: datos.censura,
        texto: datos.texto,
        idSoporte: datos.idSoporte,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      return {
        message: result.message || "Error desconocido al enviar respuesta",
        error: 1,
      };
    }
  } catch (error) {
    console.error("Error al enviar la respuesta:", error.message);
    return {
      message: error.message || "Error al procesar la solicitud",
      error: 1,
    };
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

    if (response.ok) {
      return result;
    } else {
      return {
        message: result.message || "Error desconocido al cerrar soporte",
        error: 1,
      };
    }
  } catch (error) {
    console.error("Error al cerrar soporte:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

async function bloquearPersonaje({ usuario, status }) {
  try {
    let response = await fetch(`${urlBase}/bloquear-personaje-panel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, status }),
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al bloquear personaje:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

async function obtenerOnlinesServidor() {
  try {
    let response = await fetch(`${urlBase}/obtener-onlines`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerOnlinesServidor:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

async function obtenerRangosGms() {
  try {
    let response = await fetch(`${urlBase}/obtener-rangos-gms`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en obtenerRangosGms:", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}
async function logout() {
  try {
    const response = await fetch(`${urlBase}/logout-panel`, {
      method: "GET",
      credentials: "include",
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cerrar la sesion", error.message);
    return { message: error.message || "Error en la solicitud", error: 1 };
  }
}

export {
  login,
  logout,
  checkAuth,
  generarDonacion,
  listarPersonajes,
  getTop100,
  getRankingRetos,
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
  bloquearPersonaje,
  obtenerOnlinesServidor,
  obtenerRangosGms,
};
