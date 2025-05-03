function obtenerPromedio(clase, raza) {
  let prom = 0;
  clase = clase.toLowerCase();
  raza = raza.toLowerCase();

  switch (clase) {
    case "guerrero":
      switch (raza) {
        case "humano":
          prom = 10;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 9.5;
          break;
        case "gnomo":
          prom = 9;
          break;
        case "enano":
          prom = 10.5;
          break;
      }
      break;
    case "cazador":
      switch (raza) {
        case "humano":
          prom = 9.5;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 9;
          break;
        case "gnomo":
          prom = 8.5;
          break;
        case "enano":
          prom = 10;
          break;
      }
      break;
    case "paladin":
      switch (raza) {
        case "humano":
          prom = 9.5;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 9;
          break;
        case "gnomo":
          prom = 8.5;
          break;
        case "enano":
          prom = 10;
          break;
      }
      break;
    case "asesino":
      switch (raza) {
        case "humano":
          prom = 8;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 7.5;
          break;
        case "gnomo":
          prom = 7;
          break;
        case "enano":
          prom = 8.5;
          break;
      }
      break;
    case "clerigo":
    case "bardo":
    case "druida":
      switch (raza) {
        case "humano":
          prom = 8;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 7.5;
          break;
        case "gnomo":
          prom = 7;
          break;
        case "enano":
          prom = 8.5;
          break;
      }
      break;
    case "mago":
      switch (raza) {
        case "humano":
          prom = 6.5;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 6;
          break;
        case "gnomo":
          prom = 5.5;
          break;
        case "enano":
          prom = 7;
          break;
      }
      break;
    case "ladron":
      switch (raza) {
        case "humano":
          prom = 7;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 6.5;
          break;
        case "gnomo":
          prom = 6;
          break;
        case "enano":
          prom = 7.5;
          break;
      }
      break;
    case "pescador":
    case "herrero":
    case "leñador":
    case "minero":
    case "carpintero":
      switch (raza) {
        case "humano":
          prom = 6.5;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 6;
          break;
        case "gnomo":
          prom = 5.5;
          break;
        case "enano":
          prom = 7;
          break;
      }
      break;
    case "pirata":
      switch (raza) {
        case "humano":
          prom = 9.5;
          break;
        case "elfo":
        case "elfo oscuro":
          prom = 9;
          break;
        case "gnomo":
          prom = 8.5;
          break;
        case "enano":
          prom = 10;
          break;
      }
      break;
  }

  return prom;
}

export { obtenerPromedio };
