# Módulo route-spa-hash

Este módulo está diseñado para la creación de aplicaciones de una sola página (SPA), cambiando el contenido de la web en función del hash que tiene la URL. Esto permite crear una SPA y poder subirla a un servidor sin la necesidad de hacer configuraciones extras para la gestión de las rutas de la aplicación.

## Instalación

Para poder integrar el módulo en un proyecto JS vanilla con npm:

```bash
npm i route-spa-hash
```
## Descripción
El módulo añade la clase RoutesHash, la cual permite configurar en su método constructor los hash que funcionarán como rutas de la SPA, el contenido que mostrará cada ruta y un nodo para poder centralizar el contenido que mostrará cada una de las rutas.

### Interfaz
La clase RoutesHash en su mayoría consta de propiedades y métodos que deben ser tratados como privados; a continuación, se describen los métodos que pueden tratarse como públicos.

➤ __Constructor__: Cuando se instancia un nuevo objeto, este puede recibir dos parámetros:
```js
new RoutesHash(routes, rootNode);
```
Donde:

- _routes_: es un arreglo de objetos con las propiedades hash, cuyo valor es una cadena de caracteres con el hash que se usará como ruta, y view, cuyo valor es el contenido que se mostrará en el nodo raíz asociado al hash. Su valor por defecto es un arreglo vacío.
```js
{
    hash: ruta,
    view: contenido
}
```
- _rootNode_: es una referencia a un elemento HTML que cambiará su contenido en función del hash de la URL. Si no se le pasa ningún valor, se crea una etiqueta div con el id "root".
➤ getRoutes(): Método que imprime en consola las rutas establecidas al instanciar la clase RoutesHash().

➤ __getRootNode()__: Método que imprime en consola la referencia al nodo raíz establecido al instanciar la clase RoutesHash.

## Configuración
Algunas consideraciones para declarar las rutas:

- Para que el valor de hash sea válido, debe iniciar con el símbolo #.
- Existen dos rutas especiales:
    - `#`: Hace referencia a la ruta principal de la SPA. Si se omite, al cargar la web por primera vez, la ruta se trata como inexistente.
    - `#*`: Permite establecer contenido cuando la ruta a la que se quiere acceder en la SPA no existe. Si se omite contenido en el nodo raíz al acceder a una ruta inexistente.
- El módulo está diseñado para que el valor de view sea una referencia a un nodo del DOM. Si el nodo es:
    - Un elemento HTML o un fragmento: Basta con pasar la referencia al nodo o el nodo.
    - Un template: Se pasa el valor de la propiedad content de la referencia al nodo del template.
    - Para cualquier otro nodo o valor diferente a un nodo, el contenido se interpreta como una cadena de caracteres.
