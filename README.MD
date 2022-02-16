# API Mutant

// TODO try to use as much as possible english. Is better and the documentation is not extensive 
// TODO try to use naming conventions. BaseTest.test.ts or base-test.test.ts 

PASS  src/repositories/decorator.test.ts
PASS  src/common/CustomError.test.ts
PASS  src/common/middlewares/error.test.ts
PASS  src/common/middlewares/validation.test.ts
PASS  src/repositories/Mutant.test.ts (7.551 s)
PASS  src/controllers/stat.test.ts (7.608 s)
PASS  src/repositories/BaseMongoose.test.ts (7.61 s)
PASS  src/common/db.test.ts (7.632 s)
PASS  src/controllers/mutant.test.ts (7.677 s)

// TODO add instructions to the installation and running of mongo db. It makes the life easier for contributor (Docker if you prefer)
// TODO MuntantSchema typo error, it should be MutantSchema
// TODO naming conventions in methods
// TODO this code is 3 repeated times
if (ValidateSequences(row)) {
sequences++
if (sequences > 1) {
return sequences;
}
// TODO try to explain folder setup. Is nice to understand the division of resposabilities 

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
