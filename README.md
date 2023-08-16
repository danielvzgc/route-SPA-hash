# Módulo `route-spa-hash`

Este módulo está diseñado para la creación de aplicaciones de una sola página (SPA), cambiando el contenido del sitio web en función del hash que tiene la URL. Esto permite crear una SPA y poder subirla a un servidor sin la necesidad de hacer configuraciones extras para la gestión de las rutas de la aplicación.

## Instalación

El módulo puede integrarse en un proyecto JS vanilla con el siguiente comando: 
```bash
npm i route-spa-hash
```
## Descripción
El módulo añade la clase RoutesHash, la cual permite configurar, en su método constructor, los hashes que funcionarán como rutas de la SPA, el contenido que mostrará en cada ruta y un nodo para poder centralizar el contenido que mostrará en cada una de las rutas.

Para integrar la clase `RoutesHash`, esta debe ser importada:
```js 
import { RoutesHash } from 'route-spla'; 
```

### Interfaz
La clase `RoutesHash` en su mayoría consta de propiedades y métodos que deben ser tratados como privados; a continuación, se describen los métodos que pueden tratarse como públicos.

➤ **Constructor:** Cuando se instancia un nuevo objeto, este puede recibir dos parámetros:
```js
new RoutesHash(rutas, nodoRaiz);
```
Donde:

- _rutas_: Es un arreglo de objetos con las propiedades `hash`, cuyo valor es una cadena de caracteres con el hash que se usará como ruta, y `view`, cuyo valor es el contenido que se mostrará en el nodo raíz asociado al hash. Su valor por defecto es un arreglo vacío.

```js
// Estructura de los objetos que debe contener el arreglo de rutas
{
    hash: ruta,
    view: contenido
}
```
- _nodoRaíz_: es una referencia a un elemento HTML que cambiará su contenido en función del hash de la URL. Si no se le pasa ningún valor, se crea una etiqueta div con el id "root".

➤ __getRoutes()__: Método que imprime en consola los hash establecidos al instanciar la clase RoutesHash().

➤ __getRootNode()__: Método que imprime en consola la referencia al nodo raíz establecido al instanciar la clase RoutesHash.

## Configuración
Algunas consideraciones para declarar las rutas:

- Para que el valor de hash sea válido, debe comenzar con el símbolo #.
- Una ruta inexistente es aquella que no fue declarada en el arreglo de rutas al instanciar la clase `RoutesHash`. Al tratar de acceder a la ruta, esta no muestra contenido.
- Existen dos rutas especiales:
    - `#`: Hace referencia a la ruta principal de la SPA. Si se omite, al cargar la web por primera vez, la ruta se trata como inexistente.
    - `#*`: Permite establecer contenido cuando la ruta a la que se quiere acceder en la SPA no existe.
- El módulo está diseñado para que el valor de view sea una referencia a un nodo del DOM; sin embargo, se le puede pasar cualquier tipo de valor:
    - Para los elementos HTML o un fragmento, basta con pasar la referencia al nodo.
    - Para los templates, se pasa el valor de la propiedad `content` de la referencia al nodo del template.
    - Para cualquier otro nodo o valor diferente, el contenido se interpreta como una cadena de caracteres.

## Ejemplos
Los siguientes ejemplos dan por hecho que el módulo ya fue instalado.

### Rutas básicas
En este ejemplo se mostrará la configuración básica de la clase `RoutesHash`. Solo se establecerán las rutas, pero no el nodo raíz.

Para navegar entre las diferentes rutas de la SPA, se puede crear un menú de navegación en HTML usando la etiqueta `<a>`.
```html
<nav>
    <ul>
      <li>
        <a href="#">Pagina principal</a>
      </li>
      <li>
        <a href="#a">Pagina A</a>
      </li>
      <li>
        <a href="#b">Pagina B</a>
      </li>
    </ul>
</nav>
```

Para poder establecer el contenido que se mostrará en cada ruta definida en el menú con HTML, se instancia la clase `RoutesHash` y se configura el primer parámetro.
```js
const paginas = new RoutesHash([
  {
    hash:'#',
    view: 'Pagina principal'
  },
  {
    hash:'#a',
    view: 'Pagina A'
  },
  {
    hash:'#b',
    view: 'Pagina B'
  }
]);
```

### Rutas inexistentes
Complementando el ejemplo anterior, si deseas añadir contenido a rutas que no están definidas, se declara la ruta especial `#*`.
```js
const paginas = new RoutesHash([
  {
    hash:'#',
    view: 'Pagina principal'
  },
  {
    hash:'#a',
    view: 'Pagina A'
  },
  {
    hash:'#b',
    view: 'Pagina B'
  },
  {
    hash:'#*',
    view: 'foo'
  }
]);
```

Para simular el acceso a rutas inexistentes, se añaden dos nuevas etiquetas `<a>` al menú, cuyo contenido no está definido.
```html
<nav>
   <ul>
     <li>
       <a href="#">Pagina principal</a>
     </li>
     <li>
       <a href="#a">Pagina A</a>
     </li>
     <li>
       <a href="#b">Pagina B</a>
     </li>
     <li>
       <a href="#c">Pagina C</a>
     </li>
     <li>
       <a href="#d">Pagina D</a>
     </li>
   </ul>
</nav>
```
Para este caso, la ruta con el hash `#c` y `#d` mostrará el mismo contenido, debido a que ambas no fueron declaradas al instanciar la clase `RoutesHash`. Por lo tanto, se muestra el contenido establecido en la ruta `#*`.

### Mostrar nodos como contenido
El objetivo principal del módulo es mostrar contenidos completos, como plantillas o elementos HTML. Tomando como referencia el ejemplo anterior,
para elementos HTML, primero se crea el elemento y luego se le añade el contenido.
 ```js
const elemento = document.createElement('div');

elemento.textContent = "Elemento HTML";
```
Posteriormente, se pasa la referencia del elemento a la propiedad *view* de la ruta deseada.
 ```js
  {
    hash:'#',
    view:elemento
  }
```
Para templates, primero se crea el template en HTML.
```html
<template id="template">
  <section>
    <h2>TEMPLATE</h2>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit maxime ex id porro doloribus maiores. Perspiciatis amet quam, autem vitae quibusdam aspernatur ipsum veniam perferendis iure est voluptas necessitatibus consequatur?</p>
  </section>
</template>
```
En Js se crea una referencia al template.
```js
const tm = document.getElementById('template');
```
Por último se pasa el contenido del nodo a la propiedad *view* de la ruta deseada.
 ```js
  {
    hash:'#a',
    view:tm.content
  }
```
Para fragmentos, primero se crea el fragmento y se le añade el contenido.
 ```js
const contenido = document.createElement('section');
const fragmento = document.createDocumentFragment();

contenido.textContent = "fragmeno";
fragmento.appendChild(contenido);
```
Posteriormente, se pasa la referencia del fragmento a la propiedad *view* de la ruta deseada.
 ```js
  {
    hash:'#b',
    view:fragmento
  }
```
### Establecer nodo raíz
Para establecer este nodo, se debe pasar la referencia de un elemento HTML como segundo parámetro. En este caso, no se crea el elemento `div` con el id "root".
```js
const nodoRaiz = document.getElementById('raiz');

const paginas = new RoutesHash([
  {
    hash:'#',
    view: 'Pagina principal'
  }
], nodoRaiz);
```
## Consideraciones generales.

Es importante destacar que el módulo sigue en desarrollo, por lo que hay varios aspectos que no se consideran, entre los cuales se encuentran:
- El módulo no valida que los objetos del arreglo de rutas tengan las propiedades de `hash` y `view`.
- De igual forma, no se valida que los valores de la propiedad `view` inicien con #, ni que no se repitan.
- Por el momento, el módulo no está diseñado para que haya más de una instancia de la clase `RoutesHash`. Tener más de una instancia de esta clase puede tener resultados inesperados.

Es probable que haya más detalles que no se han considerado, pero estos son algunos de los más relevantes. Es posible que se solucionen estos problemas en futuras actualizaciones.
