#  App de Turismo - Tandil (MVP)

Aplicación web desarrollada como prototipo inicial para explorar puntos turísticos, gastronomía y cultura de Tandil.

---

##  ¿Por qué usamos estas tecnologías?
* **JavaScript:** Es el lenguaje de programación principal que le da la lógica y el funcionamiento a toda la aplicación.
* **React:** Es la librería que nos permite construir la interfaz de usuario dividiéndola en **componentes** (bloques reutilizables), haciendo que la navegación sea rápida y dinámica sin recargar la página.
* **Vite:** Es la herramienta de desarrollo que usamos para levantar el entorno local. Lo elegimos porque es extremadamente rápido para compilar el código y actualizar los cambios al instante en el navegador (*Hot Module Replacement*).

---

## ¿Qué programas necesitas instalar en tu PC?
Para poder clonar, correr y editar este proyecto en tu computadora, vas a necesitar tener instalado lo siguiente:

1. **Node.js** (Entorno de ejecución para JavaScript y npm):
   * [Descargar Node.js](https://nodejs.org/) *(Se recomienda la versión LTS)*


---

## ¿Cómo arrancar el proyecto por primera vez?
Una vez que clones el repositorio en tu PC, abrí la terminal dentro de la carpeta del proyecto y ejecutá estos comandos:

1. **Instalar las dependencias:**
   ```bash
   npm install



en terminal despues d todo->
   npm run dev
(La terminal te va a dar un link local).

Archivos modificados y creados:
src/App.jsx (Modificado): Es la pantalla principal de nuestra aplicación. Acá armamos la estructura visual (la barra superior, el buscador, las categorías horizontales y las tarjetas de los lugares).

src/data/tandilData.js (Creado): Funciona como nuestra base de datos local temporal. Contiene el listado en formato de datos (JSON/JavaScript) con los puntos turísticos iniciales de Tandil.

src/App.css (Modificado/Base): Contiene los estilos globales de la aplicación.

package.json (Automático): Registra las librerías instaladas y los comandos de ejecución del proyecto.
