# Backend.

## Instalación

Descargar [NodeJS](https://nodejs.org/es/) se sugiere utilizar la versión LTS

### Instalar paquetes requeridos
Una vez instalado Node, desde la carpeta base de este proyecto ejecutar:
```bash
npm install
```
### Ejecutar las Migraciones

Con el fin de crear las tablas que utilizaremos en la BD, se deben echar a andar las migraciones del proyecto con el comando:

```bash
npx sequelize db:migrate
```

### Iniciar el Proyecto

Una vez teniendo todo listo y configurado, podemos levantar nuestro servidor web con el comando:

```bash
npm start
```
# Frontend
## Diseño

El proyecto utiliza bootstrap junto con react-bootstrap, puede visualizar los componentes que tiene a disposición, junto con el sistema de grilla en [https://react-bootstrap.github.io/](https://react-bootstrap.github.io/)

Tambien puede resultarle de utilidad la documentación oficial de [Bootstrap](https://getbootstrap.com/)

## Librerías Importantes

El proyecto utiliza varias, librerías, a continuación se mencionan algunas y enlaces a su documentación:

- [React](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/web/guides/quick-start)
- [Axios](https://axios-http.com/docs/intro)

Se recomienda visiten esta documentación pues les resolverá muchas de sus dudas.


## Ejecución

```bash
npm run start
```
