# Despliegue en ambiente local

## Requisitos previos

- Tener instalado mongoDB
- Tener instalado Redis

## Preparar ambiente local

- Crear un archivo `.env` en la raíz del proyecto. Puede usar el archivo `.env.example` como base.
- Crear un archivo `tokenization` (sin extensión) en la raíz del proyecto. Puede usar el archivo `tokenization.example` como base.

## Migrar documento inicial

- Ejecutar `npm run seed` para migrar un documento a mongo.

## Ejecutar en ambiente local

- Ejecutar `npm install -g serverless` para instalar serverless globalmente
- Ejecutar `npm install` para instalar las dependencias
- Ejecutar `serverless offline start` para ejecutar el proyecto en ambiente local

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
    Authorization: pk_test_mol23f2no94bc73d
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
    Authorization: pk_test_mol23f2no94bc73d
    ```

## Los endpoints expuestos en AWS son:

- POST | https://6pvnc28q71.execute-api.us-east-1.amazonaws.com/prod/login
- POST | https://6pvnc28q71.execute-api.us-east-1.amazonaws.com/prod/create-token
- GET | https://6pvnc28q71.execute-api.us-east-1.amazonaws.com/prod/get-card-info/{cardToken}

Puede usarse con el mismo body y headers que en ambiente local.

# Despliegue en AWS

- Instalar AWS-CLI https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- Ejecutar `aws configure` para configurar AWS con tus credenciales.
- Ejecutar `npm run deploy` para desplegar las funciones en AWS Lambda.
