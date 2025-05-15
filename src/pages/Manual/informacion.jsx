const topicDescriptions = {
  "Clases sociales": () => (
    <div>
      <p>
        Las clases sociales determinan las habilidades iniciales y el rol de tu
        personaje en el mundo.
      </p>
    </div>
  ),

  Habilidades: () => (
    <div>
      <p>
        Las habilidades se mejoran con el uso. Puedes entrenar, practicar y
        especializarte según tu estilo de juego.
      </p>
    </div>
  ),

  Controles: () => (
    <div>
      <p>
        Los controles son intuitivos y se explican en esta sección para
        facilitar tu experiencia.
      </p>
    </div>
  ),

  "Razas y atributos": () => (
    <div>
      <p>
        Cada raza tiene bonificaciones y atributos únicos. Elige sabiamente
        según tu estilo.
      </p>
    </div>
  ),

  "Crear un personaje": () => (
    <div>
      <p>
        El proceso de creación te permite personalizar tu avatar con clase, raza
        y habilidades.
      </p>
    </div>
  ),

  Comandos: () => (
    <div>
      <p>
        Estos son comandos que podés utilizar en el juego para realizar
        acciones, comunicarte y más.
      </p>
    </div>
  ),

  "Vida y muerte": () => (
    <div>
      <p>
        Cuando tus puntos de vida lleguen a cero morirás, y al morir te
        convertirás en un fantasma. Si tu condición es de newbie (nivel entre 1
        y 12) perderás todos tus objetos excepto los correspondientes a los
        newbies (vestimenta, daga, manzanas y agua iniciales) y aquellos objetos
        especiales que nunca caen, salvo que los tires intencionalmente (estos
        son el barco, las llaves y las armaduras de la Armada Real o el Caos).
        En el caso de los newbies, el dinero tampoco cae si lo llevan en la
        billetera (solo caerá si lo llevan en el inventario, es decir, junto a
        todos los objetos).
      </p>
      <p>
        Si eres nivel 13 o mayor, todos los objetos que tienes en el inventario
        (excepto barcas, llaves y) se desparramarán por el suelo al morir, donde
        cualquiera podrá agarrarlos. <strong>NOTA:</strong> Si tienes en tu
        poder 100.001 monedas de oro o más, cuando mueras no se te caerán.
      </p>
      <p>
        Cuando eres un fantasma puedes hablar con otros muertos y con los Game
        Masters. Los usuarios vivos no podrán leer lo que dices, no podrás
        agarrar objetos, atacar ni ser atacado, pero podrán verte y traspasarte.
        Si eres de la faccion del Demonio, el Fantasma se verá de un color Gris
        Oscuro.
      </p>
      <p>
        Tienes dos formas de resucitarte: La primera es yendo a la iglesia.
        Todas las ciudades tienen una y la identificarás por la túnica azul del
        sacedote. Para resucitarte debes hacer doble clic en el sacerdote y para
        curarte, otro doble clic. Otra posibilidad es que otro usuario te
        resucite con un hechizo llamado "Resucitar". Para ser resucitado por un
        usuario debes sacar el modo combate, de lo contrario no podrá usar el
        hechizo sobre tí.
      </p>
      <p>
        Es posible utilizar el comando <code>/cmsg</code> (Clan), también el{" "}
        <code>/pmsg</code> (Party) y el chat global después de muertos.
      </p>
    </div>
  ),

  "Comida y bebida": () => (
    <div>
      <p>
        Si tu personaje se encuentra muy hambriento no podrá recuperar energía,
        y por lo tanto no podrá atacar, trabajar, usar magia e inclusive tampoco
        podrá aprender hechizos nuevos.
      </p>
      <h4 className="mt-2">Comidas</h4>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Hambre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Manzana Roja</td>
            <td>10</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>10</td>
            <td>1</td>
          </tr>
          <tr>
            <td>Porción de tarta</td>
            <td>15</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Frutas del bosque</td>
            <td>15</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Pan de trigo</td>
            <td>20</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Pan de maíz</td>
            <td>20</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Sandía</td>
            <td>25</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Pastel</td>
            <td>25</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Queso de cabra</td>
            <td>50</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Chuleta</td>
            <td>50</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Pollo</td>
            <td>75</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Merluza</td>
            <td>75</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Pejerrey</td>
            <td>75</td>
            <td>18</td>
          </tr>
          <tr>
            <td>Pez espada</td>
            <td>75</td>
            <td>27</td>
          </tr>
          <tr>
            <td>Salmón</td>
            <td>75</td>
            <td>36</td>
          </tr>
          <tr>
            <td>Caballito de mar</td>
            <td>75</td>
            <td>450</td>
          </tr>
        </tbody>
      </table>

      <h4 className="mt-4">Bebidas</h4>
      <p>
        Si tu personaje se encuentra muy sediento no recuperará la energía, y
        por lo tanto no podrá atacar, trabajar, usar magia e inclusive tampoco
        podrá aprender hechizos nuevos.
      </p>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Sed</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Botella de agua</td>
            <td>30</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Cerveza</td>
            <td>60</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Vino</td>
            <td>90</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Jugo de frutas</td>
            <td>100</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),

  "Un jugador con honor": () => (
    <div>
      <p>
        No solo es importante en estas tierras el nivel y el poder que tiene un
        personaje, sino también el honor que este tiene. Presta mucha atención a
        la siguiente frase:
      </p>
      <blockquote>
        "Recuerda respetar a todas las personas dentro del juego, todos
        ingresamos a él con el mismo objetivo: Divertirnos."
      </blockquote>
    </div>
  ),

  Supervivencia: () => (
    <div>
      <p>Beneficios de tener skills en supervivencia en Arcanus:</p>
      <ul>
        <li>
          <strong>60 Skills:</strong> Al hacer click a un NPC te aparecerá la
          vida del mismo.
        </li>
        <li>
          <strong>100 Skills:</strong> También se mostrará la cantidad de ítems
          al clickear en objetos en el piso.
        </li>
      </ul>
      <p>
        Si los indicadores de sed y hambre están vacíos, la energía y vida no se
        recuperarán. Si el personaje no está vestido, la energía irá bajando, y
        en ciertos dungeons podría morir de frío. También la lluvia reduce
        energía, a menos que estés bajo techo o descansando cerca de una fogata.
      </p>
      <p>
        Otra forma de recuperar energía es creando fogatas y descansando cerca.
      </p>
      <h4 className="mt-2">Ramitas</h4>
      <p>
        Necesitás una daga equipada (no newbie). Tirás 3+ leñas al suelo,
        presionás "U" o doble click con la daga seleccionada, y clickeás las
        leñas. No se puede desde arriba ni a más de dos casilleros. La chance
        depende de tu habilidad.
      </p>
      <h4>Fogatas</h4>
      <p>
        Doble click a las ramitas. Si hay varias, se prenden juntas pero el
        efecto es igual que una sola. La distancia no debe ser mayor a 2
        casilleros.
      </p>
      <h4>Descansar</h4>
      <p>
        Con fogata cerca (máximo 2 casilleros), usá el comando{" "}
        <code>/descansar</code>, hacé doble click o clic derecho + "Descansar".
        Recuperás vida y energía más rápido.
      </p>
    </div>
  ),
  Leyes: () => (
    <>
      <p>
        Cada ciudad tiene sus reglas. Romperlas puede convertirte en criminal.
      </p>
    </>
  ),
  "Subir de nivel": () => (
    <>
      <p>
        En algún momento ganarás experiencia, lo que hará que subas de nivel. Lo
        sabrás porque escucharás un sonido característico. El hecho de subir de
        nivel te da muchas ventajas, como que el número de puntos de vida se
        incrementa, el mana, el daño que infringes, la defensa y la energía
        también.
      </p>

      <p>Estos bonus varían bastante según la profesión que hayas elegido.</p>

      <p>
        Además de todo esto podrás aumentar los puntos en tus habilidades, al
        subir de nivel verás que al lado del indicador de nivel aparecerá un
        signo más (+), en cuanto lo pulses se abrirá una ventana en la que
        podrás asignar más puntos a tus habilidades.
      </p>

      <p>
        Cuando pases al nivel 2 se te darán diez puntos para repartir, y en los
        siguientes niveles cinco. De esta manera tu personaje irá mejorando y
        será cada vez más poderoso.
      </p>

      <p>
        Puedes mirar abajo cuánta vida puede subirte al pasar de nivel de
        acuerdo a tu constitución:
      </p>

      <p>
        <strong>Constitución 21</strong>
      </p>
      <p>Guerrero : Entre 9 y 12</p>
      <p>Paladín / Cazador / Herrero / Pirata : Entre 9 y 11</p>
      <p>Clérigo / Asesino / Bardo / Druida : Entre 7 y 10</p>
      <p>Mago / Laburantes : Entre 6 y 8</p>
      <p>Ladrón : Entre 6 y 9</p>

      <p>
        <strong>Constitución 20</strong>
      </p>
      <p>Guerrero : Entre 8 y 12</p>
      <p>Paladín / Cazador / Herrero / Pirata : Entre 8 y 11</p>
      <p>Clérigo / Asesino / Bardo / Druida : Entre 6 y 10</p>
      <p>Mago / Laburantes : Entre 5 y 8</p>
      <p>Ladrón : Entre 5 y 9</p>

      <p>
        <strong>Constitución 19</strong>
      </p>
      <p>Guerrero : Entre 8 y 11</p>
      <p>Paladín / Cazador / Herrero / Pirata : Entre 7 y 11</p>
      <p>Clérigo / Asesino / Bardo / Druida : Entre 6 y 9</p>
      <p>Mago / Laburantes : Entre 4 y 8</p>
      <p>Ladrón : Entre 4 y 9</p>

      <p>
        <strong>Constitución 18</strong>
      </p>
      <p>Guerrero : Entre 7 y 11</p>
      <p>Paladín / Cazador / Herrero / Pirata : Entre 6 y 11</p>
      <p>Clérigo / Asesino / Bardo / Druida : Entre 5 y 9</p>
      <p>Mago / Laburantes : Entre 3 y 8</p>
      <p>Ladrón : Entre 4 y 8</p>
    </>
  ),
  Centinela: () => (
    <>
      <p>
        La tarea del Centinela es vigilar a los trabajadores y comprobar la
        presencia del usuario frente a la computadora. Se deberá verificar con
        un código único dentro del juego.
      </p>

      <p>
        El Centinela no tiene un cronómetro exacto de tiempo; aparece de manera
        aleatoria solamente si el personaje se encuentra trabajando.
      </p>

      <p>
        Aplica para los personajes que se encuentren: Pescando, Talando,
        Minando, Creando ítems con un Herrero o Carpintero.
      </p>

      <p>
        <strong>Comando de uso:</strong>
        <br />
        /CENTINELA código
        <br />
        (El código siempre es generado de manera aleatoria y te aparecerá tanto
        en consola como en el texto del NPC)
      </p>

      <p>
        <strong>Tiempo para ingresar el código:</strong>
        <br />2 minutos.
      </p>

      <p>
        <strong>Consecuencias de no ingresar el código a tiempo:</strong>
        <br />
        En caso de no ingresar el código del Centinela a tiempo, demostrando
        inactividad dentro del juego, el personaje será deslogueado de manera
        automática y se le enviará una notificación por correo electrónico al
        dueño del personaje.
      </p>
    </>
  ),
  Skills: () => (
    <>
      <p>
        Hay dos formas de aumentar los skills de las habilidades. La forma
        "natural" (lo que va aumentando por la práctica) y la "manual" que son
        los puntos que se pueden asignar por nivel a lo que uno desee.
      </p>

      <p>
        De forma natural suben los skills de a 2 o 3 puntos por nivel (suele
        subir 2 puntos, pero cada 2 niveles aumentados, en el tercero se pueden
        subir 3 skills de forma natural). Esto es aparte de los 5 puntos que se
        pueden aumentar por pasar de nivel. Es muy importante que definas cuándo
        asignar tus puntos, ya que aunque asignarlos antes te hará más hábil,
        cuando seas más fuerte los demás tendrán ventaja sobre ti.
      </p>

      <p>
        A la habilidad de Apuñalar (salvo los que tienen como Clase la de
        Asesino) hay que asignarle 10 skillpoints para que pueda aumentar skill
        de forma natural. A la habilidad Resistencia Mágica, todas las clases
        que no usen la magia como forma de ataque, deberán asignar inicialmente
        5 skillpoints para que luego pueda aumentar este skill en forma natural
        (Guerrero y Cazador).
      </p>

      <p>
        En cuanto a la forma manual, se ganan 5 puntos por nivel que se los
        puede asignar a lo que uno quiera (salvo cuando se pasa a nivel 2, que
        se pueden asignar 10).
      </p>

      <p>
        Si ponemos puntos de forma manual, no subirán de forma natural hasta que
        hayamos superado el límite por nivel. Por eso, mucha gente prefiere
        guardarse los puntos para cuando los necesite, o bien ponerlos a una
        habilidad que no suba de forma natural.
      </p>

      <p>
        Cabe destacar que las habilidades de Liderazgo y Navegación son las
        únicas que no suben naturalmente.
      </p>

      <p>
        A continuación explico cómo conseguimos aumentar los puntos de forma
        natural y para qué sirve cada habilidad:
      </p>

      <p>
        <strong>Lista de habilidades</strong>
      </p>
      <p>
        Resistencia Mágica: Reduce el daño de los hechizos que recibes.
        Necesitas un anillo para que funcione.
      </p>
      <p>Magia: Necesaria para lanzar hechizos. Se sube lanzando hechizos.</p>
      <p>
        Robar: Mejora las probabilidades de robar objetos. Solo los Ladrones
        pueden robar objetos.
      </p>
      <p>
        Tácticas de combate: Aumenta la probabilidad de esquivar ataques. Se
        sube luchando cuerpo a cuerpo.
      </p>
      <p>
        Combate con armas: Mejora las probabilidades de acertar al enemigo con
        un arma.
      </p>
      <p>
        Meditar: Incrementa la frecuencia de recuperación de maná. Se sube
        meditando.
      </p>
      <p>Apuñalar: Incrementa el daño con dagas o espadas cortas.</p>
      <p>
        Ocultarse: Mejora las posibilidades de permanecer oculto. Cazadores con
        100 skills y ropa de cazador estarán ocultos indefinidamente.
      </p>
      <p>
        Supervivencia: Permite ver la vida de los NPCs con 60 puntos y la
        cantidad de objetos en el suelo con 100 puntos.
      </p>
      <p>Talar árboles: Aumenta la posibilidad de obtener madera.</p>
      <p>
        Comercio: Reduce los costos en las tiendas. Se sube comprando y
        vendiendo.
      </p>
      <p>Defensa con escudos: Mejora tu habilidad con el escudo.</p>
      <p>Pesca: Mejora la posibilidad de conseguir peces. Se sube pescando.</p>
      <p>
        Minería: Incrementa la posibilidad de obtener metales preciosos. Se sube
        minando.
      </p>
      <p>
        Carpintería: Permite crear arcos, flechas y barcos. Se sube creando
        objetos.
      </p>
      <p>Herrería: Permite crear armas, escudos y armaduras.</p>
      <p>
        Liderazgo: Necesaria para crear clanes y parties. No sube naturalmente.
      </p>
      <p>
        Domar animales: Permite domesticar animales para que sean tus mascotas.
      </p>
      <p>Armas de proyectiles: Incrementa la precisión con armas de rango.</p>
      <p>Wrestling: Mejora la probabilidad de impactar en combate sin armas.</p>
      <p>
        Navegación: Necesaria para utilizar embarcaciones. No sube naturalmente.
      </p>
    </>
  ),
  Introduccion: () => (
    <>
      <p>Ahora voy a explicarte cómo se maneja el dinero en este mundo.</p>

      <p>
        Las transacciones comerciales se realizan con monedas de oro o a través
        del canje con otros usuarios (ver sistema de comercio seguro).
      </p>

      <p>
        Las formas de conseguir estos preciados objetos son muy variadas, la más
        utilizada consiste en matar criaturas en los bosques, dungeons y otros
        lugares en el mundo. Sin embargo, esto para un novato es difícil ya que
        las criaturas que dan oro por lo general son muy fuertes, es por eso que
        los newbies deberán entrenar para poder hacer frente a estas criaturas.
      </p>

      <p>
        Otra forma de conseguir dinero es ejerciendo profesiones, como la de
        pescador, talador, minero, herrero y carpintero, para luego vender lo
        que consigas o fabriques y de esta forma lucrar con las ventas. También
        puedes conseguir oro o items matando a otros usuarios. Recuerda que
        robando, atacando o matando a cualquier usuario que no sea criminal
        dejarás de ser ciudadano.
      </p>

      <p>
        Ahora que ya sabes como conseguir el dinero te contaré cómo
        administrarlo. Cuando tomas oro del piso éste pasa a formar parte del
        inventario como cualquier otro item. Para hacer que el mismo pase a la
        billetera sólo hay que dar doble click sobre las monedas en el
        inventario o seleccionar las mismas y presionar la tecla U. Si no tienes
        el dinero en la billetera no podrá ser utilizado en el comercio. Cabe
        destacar que el dinero que arrojas de tu billetera no caerá al piso en
        el lugar en que te encontrás, sino que lo hará a un paso de distancia,
        en diagonal arriba y a la izquierda, salvo que ese casillero esté
        ocupado, en cuyo caso caerá en otro que se encuentre libre.
      </p>

      <p>
        <b>Nota:</b> Si tienes 100.001 monedas o más en la billetera no se
        caerán al morir.
      </p>
    </>
  ),

  Comercio: () => (
    <>
      <p>
        Una cosa muy importante en este mundo es saber comerciar. La forma de
        pago en Argentum es a través de las monedas de oro.
      </p>

      <p>
        Puedes comerciar con NPCs de compra y venta de ítems o con otros
        usuarios que deseen realizar transacciones.
      </p>

      <p>
        <b>¿Cómo comerciar con NPCs?</b>
      </p>

      <p>
        Con tu personaje y el oro necesario en la billetera, debes ir al NPC y
        hacerle doble clic. Entonces se abrirá una ventana.
      </p>

      <p>
        En la parte izquierda se pueden ver los items que puedes comprar y en la
        derecha los ítems que tú posees. Para comprar o vender un objeto solo
        basta con cliquearlo y tocar sobre el correspondiente botón de compra o
        venta. Por último abajo tenemos un indicador de cantidad el cual
        podremos modificar para comprar o vender en cantidades.
      </p>

      <p>
        Cada comercio tiene un cartel, en caso de no tenerlo podrás reconocer al
        vendedor por su vestimenta o por el texto que dice cuando se lo cliquea.
      </p>
    </>
  ),

  "Comercio seguro": () => (
    <>
      <p>
        <b>TRANSACCIONES ENTRE USUARIOS</b>
      </p>

      <p>
        Cuando se compran, venden o intercambian objetos con otros usuarios es
        imprescindible usar el sistema de Comercio Seguro.
      </p>

      <p>
        A través de él, los usuarios pueden intercambiar items por oro o por
        objetos de otros jugadores. Si no se usa este sistema hay una
        posibilidad muy grande de ser estafado por jugadores malintencionados.
        Para usarlo, hay que clickear sobre el usuario con el que harás la
        transacción y escribir el comando <code>/comerciar</code>.
      </p>

      <p>
        Al hacerlo, deberán esperar a que el otro usuario decida si quiere
        realizar algún tipo de intercambio. Si acepta, él también tiene que usar
        el mismo comando. Entonces se abrirá una ventana como esta:
      </p>

      <p>
        <i>comercio</i>
      </p>

      <p>
        En el cuadro de la izquierda se verán los ítems o el oro que el otro
        usuario ofrece. En el de la derecha deberás elegir la cantidad de oro o
        ítems a ofrecer y presionar “Agregar” para agregarlos al cuadro del
        centro. Una vez que agregaste todo lo que deseas cambiar debes presionar
        “Ofrecer”. Ina vez que ambos usuarios ofrecieron los items o el oro,
        deben revisar lo que se les envía y aceptarlo o rechazarlo. Si aceptan,
        la operación está hecha. Se puede ofrecer cualquier tipo de objeto o
        cualquier cantidad de oro.
      </p>
    </>
  ),
  Bancos: () => (
    <div>
      <p>
        Llevar todas tus pertenencias y tu oro a todos lados es muy peligroso,
        pueden matarte y perder todos tus ítems o robarte y perder tu oro.
      </p>
      <p>
        Pero puedes evitar perder tanto el dinero como los objetos
        depositándolos en un banco. Éstos se identifican por el banquero.
      </p>
      <img
        src="/images/banquero.png"
        alt="Banquero"
        style={{ width: "200px", margin: "1rem 0" }}
      />
      <p>
        El oro también puede depositarse en un banco sin ocupar espacio: cada
        personaje tiene un lugar para guardar oro y otro para guardar ítems.
      </p>
      <p>
        <strong>Comandos disponibles:</strong>
      </p>
      <ul>
        <li>
          <code>/depositar x</code>: Deposita x monedas de tu billetera.
        </li>
        <li>
          <code>/depositartodo</code>: Deposita todo el oro de tu billetera.
        </li>
        <li>
          <code>/balance</code>: Muestra la cantidad de oro en el banco.
        </li>
        <li>
          <code>/retirar x</code>: Retira x monedas del banco.
        </li>
        <li>
          <code>/retirartodo</code>: Retira todo el oro que tienes en el banco.
        </li>
      </ul>
    </div>
  ),

  Talador: () => (
    <div>
      <p>
        El oficio de la tala consiste en la utilización del hacha para conseguir
        leña de los árboles, que luego sirve para carpintería.
      </p>
      <p>
        Hay dos tipos de leña: la común, que se consigue en casi todos los
        árboles con un hacha de leñador, y la de tejo, que solo está en la isla
        del Bosque Místico con un hacha dorada.
      </p>
      <h4>Instrucciones:</h4>
      <ul>
        <li>Equipar el hacha de leñador (o hacha dorada para tejo).</li>
        <li>Hacer click en un árbol.</li>
        <li>
          Presionar <code>F8</code>.
        </li>
      </ul>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        talan.
      </p>
    </div>
  ),

  Pescador: () => (
    <div>
      <p>
        El oficio de la pesca utiliza caña o red para conseguir peces. Estos se
        pueden vender o comer.
      </p>
      <h4>Instrucciones:</h4>
      <ul>
        <li>Equipar caña o red de pesca.</li>
        <li>Colocarse en el agua u orilla y hacer click.</li>
        <li>
          Presionar <code>F8</code>.
        </li>
      </ul>
      <p>
        La caña cuesta 2000 de oro; la red, 4.800.000 (2.400.000 con 100 pts en
        comercio).
      </p>
      <p>
        <strong>Condiciones:</strong> Ser pescador, usar galera (65 navegación),
        100 pesca.
      </p>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        pescan.
      </p>
    </div>
  ),

  Herrero: () => (
    <div>
      <p>
        La herrería fabrica armas, armaduras y herramientas. Necesitas un
        martillo de herrero.
      </p>
      <h4>Instrucciones:</h4>
      <ul>
        <li>Equipar martillo de herrero.</li>
        <li>Ir a una herrería y doble click en el yunque.</li>
        <li>Seleccionar ítem y cantidad.</li>
      </ul>
      <p>
        <strong>Velocidad:</strong> 1–5 niv.: 1 ítem; 6–14: 2; 15–23: 3; 24+: 4.
      </p>
      <h4>Ejemplos de skills y lingotes:</h4>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Skill</th>
            <th>Hierro</th>
            <th>Plata</th>
            <th>Oro</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daga</td>
            <td>10</td>
            <td>2</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Espada corta</td>
            <td>12</td>
            <td>6</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Espada de plata</td>
            <td>85</td>
            <td>50</td>
            <td>100</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Espada mata dragones</td>
            <td>100</td>
            <td>300</td>
            <td>200</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        crean ítems de herrería.
      </p>
    </div>
  ),
  Minero: () => (
    <div>
      <p>
        La minería se separa en dos trabajos: la extracción de minerales y la
        creación de lingotes con estos minerales.
      </p>
      <h4>Yacimientos disponibles:</h4>
      <ul>
        <li>Hierro: entre Ullathorpe y Nix.</li>
        <li>Hierro y plata: cercano al Bosque Dorck.</li>
        <li>Oro: dentro de un peligroso dungeon.</li>
      </ul>
      <h4>Extracción de minerales:</h4>
      <ul>
        <li>Equipar piquete de minero (o piquete de oro para extraer oro).</li>
        <li>Click en el yacimiento.</li>
        <li>
          Presionar <code>F8</code>.
        </li>
      </ul>
      <p>
        Un “Minero” obtiene 1–4 minerales por click; las demás clases solo 1. A
        más skill, más rápido extraes.
      </p>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        extraen minerales.
      </p>

      <h4>Creación de lingotes:</h4>
      <ul>
        <li>Ir a una herrería.</li>
        <li>Equipar el mineral a fundir.</li>
        <li>
          Click en la fragua y presionar <code>F8</code>.
        </li>
      </ul>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Lingote</th>
            <th>Minero</th>
            <th>Herrero</th>
            <th>Otra clase</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hierro</td>
            <td>30</td>
            <td>45</td>
            <td>90</td>
          </tr>
          <tr>
            <td>Plata</td>
            <td>60</td>
            <td>90</td>
            <td>—</td>
          </tr>
          <tr>
            <td>Oro</td>
            <td>82</td>
            <td>—</td>
            <td>—</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Equivalencias:</strong> 1 lingote = 19 hierro, 25 plata, 50 oro.
      </p>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        crean lingotes.
      </p>
    </div>
  ),

  Carpintero: () => (
    <div>
      <p>
        El oficio de la carpintería se basa en crear elementos con madera común
        o de tejo. Necesitas un serrucho y suficiente skill.
      </p>
      <h4>Skills para madera de tejo:</h4>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Inteligencia</th>
            <th>Magia</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>15</td>
            <td>35</td>
          </tr>
          <tr>
            <td>16</td>
            <td>33</td>
          </tr>
          <tr>
            <td>17</td>
            <td>31</td>
          </tr>
          <tr>
            <td>18</td>
            <td>30</td>
          </tr>
          <tr>
            <td>19</td>
            <td>28</td>
          </tr>
          <tr>
            <td>20</td>
            <td>27</td>
          </tr>
          <tr>
            <td>21</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>
      <h4>Velocidad de fabricación:</h4>
      <ul>
        <li>1–5: 1 ítem</li>
        <li>6–14: 2 ítems</li>
        <li>15–23: 3 ítems</li>
        <li>24+: 4 ítems</li>
      </ul>
      <h4>Items disponibles:</h4>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Madera</th>
            <th>Tejo</th>
            <th>Skill</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cuchara</td>
            <td>3</td>
            <td>—</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Silla</td>
            <td>25</td>
            <td>—</td>
            <td>9</td>
          </tr>
          <tr>
            <td>Caña de pescar</td>
            <td>70</td>
            <td>—</td>
            <td>12</td>
          </tr>
          {/* …otras filas… */}
        </tbody>
      </table>
      <p>
        <strong>IMPORTANTE:</strong> Los centinelas controlan a los usuarios que
        crean ítems de carpintería.
      </p>
    </div>
  ),

  Vestimentas: () => (
    <p>
      Cambiar vestimenta no afecta combate, pero sí la estética del personaje.
    </p>
  ),

  Armaduras: () => (
    <p>
      Brindan defensa física y mágica. Pueden mejorarse con materiales raros.
    </p>
  ),

  Pociones: () => (
    <p>Usadas para curar, aumentar estadísticas o proteger temporalmente.</p>
  ),

  Armas: () => (
    <p>Desde espadas hasta bastones mágicos. Se clasifican por daño y tipo.</p>
  ),

  Tunicas: () => (
    <p>Vestimenta mágica que potencia habilidades de hechiceros.</p>
  ),

  "Cascos y escudos": () => (
    <p>Añaden defensa extra y a veces efectos especiales.</p>
  ),

  "Items magicos": () => (
    <p>Objetos raros que otorgan habilidades o mejoras únicas.</p>
  ),

  Magias: () => (
    <p>
      Conjuros ofensivos, defensivos y de soporte. Requieren maná y estudio.
    </p>
  ),

  "Criaturas hostiles": () => (
    <p>
      Son enemigos controlados por IA. Dan experiencia y objetos al derrotarlos.
    </p>
  ),

  Party: () => (
    <p>Unite con otros jugadores para compartir experiencia y recursos.</p>
  ),

  "Domar animales": () => (
    <p>Algunas clases pueden domesticar criaturas y usarlas como aliadas.</p>
  ),

  "Armada Real": () => (
    <div>
      <p>
        La Armada Real lucha contra el mal en Argentum. Debes ser nivel 25+, no
        haber matado ciudadanos y haber eliminado 50 criminales.
      </p>
      <p>
        Para enlistarte, click en el Rey en Banderbill y escribe{" "}
        <code>/ENLISTAR</code>. Recibirás armadura real que no se cae al morir.
      </p>
      <h4>Rangos:</h4>
      <ul>
        <li>
          <strong>1º rango</strong>: 50 criminales + lvl 25 ⇒ Armadura +
          Aprendiz
        </li>
        <li>
          <strong>2º rango</strong>: 100 criminales + 1.500.000 oro + lvl 30 ⇒
          Armadura + Caballero
        </li>
        <li>
          <strong>3º rango</strong>: 200 criminales + 3.000.000 oro + lvl 36 ⇒
          Armadura + Guardián
        </li>
        <li>
          <strong>4º rango</strong>: 350 criminales + 5.000.000 oro + lvl 40 ⇒
          Armadura + Campeón
        </li>
      </ul>
    </div>
  ),

  "Legion Oscura": () => (
    <div>
      <p>
        La Legión Oscura propaga el Mal. Requisitos: lvl 25+, ser criminal y 50
        ciudadanos muertos.
      </p>
      <p>
        Para unirte click en el Demonio en Ciudad Oscura y escribe{" "}
        <code>/ENLISTAR</code>. Recibirás armadura oscura.
      </p>
      <h4>Rangos:</h4>
      <ul>
        <li>
          <strong>1º</strong>: 50 ciudadanos + lvl 25 ⇒ Armadura + Esbirro
        </li>
        <li>
          <strong>2º</strong>: 100 ciudadanos + 1.500.000 oro + lvl 30 ⇒
          Armadura + Caballero Oscuro
        </li>
        <li>
          <strong>3º</strong>: 200 ciudadanos + 3.000.000 oro + lvl 36 ⇒
          Armadura + Protector
        </li>
        <li>
          <strong>4º</strong>: 350 ciudadanos + 5.000.000 oro + lvl 40 ⇒
          Armadura + Devorador
        </li>
        <li>
          <strong>5º</strong>: 1.000 ciudadanos + 20.000.000 oro + lvl 45 ⇒
          Armadura + Portador del Caos
        </li>
      </ul>
    </div>
  ),

  Ciudades: () => (
    <div>
      <p>
        En Arcanus las ciudades son zonas seguras con bancos, comercios e
        iglesias.
      </p>
      <h4>Banderbill</h4>
      <p>Ciudad principal con banco, Palacio Real y gran muelle.</p>
      <h4>Lindos</h4>
      <p>Pueblo pequeño libre de Guardia, con bóveda e iglesia.</p>
      <h4>Nix</h4>
      <p>Ciudad de principiantes, con río y muelle.</p>
      <h4>Ullathorpe</h4>
      <p>Centro neurálgico entre Banderbill y Nix.</p>
      <h4>Esperanza</h4>
      <p>Zona insegura, con pocos comercios.</p>
      <h4>Ciudad Oscura</h4>
      <p>Entrada a la Legión Oscura.</p>
      <h4>Arghâl</h4>
      <p>Ciudad portuaria al este de Banderbill.</p>
    </div>
  ),

  Dungeons: () => (
    <div>
      <h4>Newbie</h4>
      <p>Para lvl ≤ 12, zona segura.</p>
      <h4>Marabel</h4>
      <p>lvl ≥ 15, zona insegura.</p>
      <h4>Dragon</h4>
      <p>lvl ≥ 20, Bosque Fantasmal.</p>
      <h4>Veriil</h4>
      <p>lvl ≥ 25, peligrosísimo.</p>
      <h4>Vespar</h4>
      <p>lvl ≥ 25, nuevo dungeon.</p>
      <h4>Speculum / Portal</h4>
      <p>lvl ≥ 40, laberintos.</p>
      <h4>Magma</h4>
      <p>lvl ≥ 40, criaturas poderosas.</p>
      <h4>Polo Norte</h4>
      <p>Zona nevada con bestias letales.</p>
    </div>
  ),

  Mapa: () => (
    <div>
      <p>
        Aquí un mapa aproximado de Argentum. Rumores hablan de tierras
        desconocidas...
      </p>
      <img
        src="/images/mapa.png"
        alt="Mapa de Arcanus"
        style={{ width: "100%", margin: "1rem 0" }}
      />
    </div>
  ),

  Clanes: () => (
    <div>
      <p>
        Un clan es una asociación de jugadores. Solo puedes pertenecer a uno.
      </p>
      <h4>Fundar:</h4>
      <ul>
        <li>lvl 25+ y 90 skill Liderazgo.</li>
        <li>
          Comando: <code>/fundarclan</code>.
        </li>
      </ul>
      <p>Luego completas nombre, sitio y normas.</p>
      <p>El líder dura 45 días, luego votación.</p>
    </div>
  ),

  Navegacion: () => (
    <div>
      <p>
        Usa barcos para moverte por el mar. Equípalo y presiona <code>U</code> o
        doble click junto al muelle.
      </p>
      <table className="manual-table">
        <thead>
          <tr>
            <th>Barco</th>
            <th>Nav.</th>
            <th>Compra</th>
            <th>Venta</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Barca</td>
            <td>35</td>
            <td>24000</td>
            <td>8000</td>
          </tr>
          <tr>
            <td>Galera</td>
            <td>65</td>
            <td>44000</td>
            <td>14666</td>
          </tr>
          <tr>
            <td>Galeón</td>
            <td>65</td>
            <td>67000</td>
            <td>22333</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Nota:</strong> lvl 25+ para navegar (excepto Pescador/Pirata).
      </p>
    </div>
  ),

  Comandos: () => (
    <div>
      <h4>Listado de comandos</h4>
      <ul>
        <li>
          <code>/mercado</code>: abre el mercado.
        </li>
        <li>
          <code>/passw</code>: cambia tu contraseña.
        </li>
        <li>
          <code>/comerciar</code>: inicia comercio seguro.
        </li>
        {/* …agrega el resto según necesidad… */}
      </ul>
    </div>
  ),

  Retos: () => (
    <div>
      <p>
        Duelo 1-vs-1 o 2-vs-2. Presiona <code>F5</code> para configurar apuesta,
        participantes y monto (mín 5000).
      </p>
      <p>
        Ambos pagan 20000 de arena. El rival acepta con{" "}
        <code>/retar Nombre</code>. Gana quien venza 2 de 3 rounds.
      </p>
    </div>
  ),
};

function traerInformacion(topic) {
  const content = topicDescriptions[topic];
  return typeof content === "function" ? content() : content;
}
export { traerInformacion };
