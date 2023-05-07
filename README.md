# Despliegue en ambiente local

## Requisitos previos

- Tener instalado y ejecutado mongoDB
- Tener instalado y ejecutado Redis

## Preparar ambiente local

- Crear un archivo llamado `.env` en la raíz del proyecto. Puede usar el archivo `.env.example` como base. Puede dejar los valores por defecto si tiene configurado mongo y redis con los puertos por defecto, caso contrario, deberá insertar las urls correspondientes.
- Crear un archivo llamado `tokenization` (sin extensión) en la raíz del proyecto. Puede usar el archivo `tokenization.example` como base.
- Ejecutar `npm install` para instalar las dependencias

## Migrar documento inicial

- Ejecutar `npm run seed` para migrar un documento a mongo.

## Ejecutar en ambiente local

- Ejecutar `npm install -g serverless` para instalar serverless globalmente
- Ejecutar `npm run start` para ejecutar el proyecto en ambiente local

## Endpoints

Los endpoints expuestos son:

- POST | http://localhost:3000/dev/login
  - BODY
    ```json
    {
      "username": "commerce_a",
      "password": "admin"
    }
    ```
- POST | http://localhost:3000/dev/create-token
  - HEADER
    ```sh
    authorization: pk_test_mol23f2no94bc73d
    ```
  - BODY
    ```json
    {
      "card_number": 371212121212122,
      "cvv": 1245,
      "expiration_month": "5",
      "expiration_year": "2028",
      "email": "jose@mail.com"
    }
    ```
- GET | http://localhost:3000/dev/get-card-info/{cardToken} | `{cardToken}` es el token devuelto por el endpoint para crear el token.
  - HEADER
    ```sh
    authorization: pk_test_mol23f2no94bc73d
    ```

## Los endpoints expuestos en AWS son:

POST - https://m8r6ajcw66.execute-api.us-east-1.amazonaws.com/login
POST - https://m8r6ajcw66.execute-api.us-east-1.amazonaws.com/create-token
GET - https://m8r6ajcw66.execute-api.us-east-1.amazonaws.com/get-card-info/{cardToken}

Puede usarse con el mismo body y headers que en ambiente local.

# Despliegue en AWS

- Instalar AWS-CLI https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- Ejecutar `aws configure` para configurar AWS con tus credenciales.
- Ejecutar `npm run deploy` para desplegar las funciones en AWS Lambda.

# Correr tests

Ejecutar `npm run test`
