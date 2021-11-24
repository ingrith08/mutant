# API Mutant

## Variables de entorno

Antes de iniciar es necesario contar con un archivo en la raiz del proyecto:

- Un archivo `.env` conteniendo las variables de entorno que utilizara la API, debe tener la siguiente estructura:

```
PORT=3000
NODE_ENV=dev
MONGO_URI=<TU MONGODB CONNECTION STRING>
```

## Iniciar la API desde el host

- Primero asegurarse de tener la version de node 14.16.X
- Instalar las dependencias:

```sh
npm install
```

- Iniciar la aplicacion en modo desarrollo:

```sh
npm run dev
```

- La aplicacion deberia iniciar en el puerto 3000 o cualquier otro indicado por el archivo `.env`

## Pruebas Unitarias o de Integracion

- Para correr la suite de pruebas se recomienda hacerlo desde el host (para una mejor experiencia con el editor). Para eso correr:

```sh
npm test
```

- Para una mejor experiencia con TDD se puede correr en modo `watch`:

```sh
npm run watch
```

- En caso de querer conocer la cobertura, utilizar el siguiente comando:

```sh
npm run coverage
```

## End-points
GET http://{URL}/stats


POST http://{URL}/mutant
```sh
payload
{
    "dna": [
        "ATGCGA",
        "CAGTGC",
        "TTATGT",
        "AGAAGG",
        "CCCCTA",
        "TCACTC"
    ]
}
