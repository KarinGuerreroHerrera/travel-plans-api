# Travel Plans API

API REST modular en NestJS para la gestión de planes de viaje con integración a RestCountries.

## Instalación y ejecución

```bash
git clone https://github.com/KarinGuerreroHerrera/travel-plans-api.git
cd travel-plans-api
npm install
npm run start:dev
```

La API corre en `http://localhost:3000`

## Arquitectura interna

El proyecto tiene dos módulos:

- **CountriesModule**: Gestiona los datos geográficos. No expone endpoints públicos. Cuando se solicita un país, primero lo busca en la base de datos local (caché). Si no existe, lo obtiene de la API externa RestCountries y lo almacena para futuras solicitudes.

- **TravelPlansModule**: Expone los endpoints públicos. Al crear un plan, invoca internamente al CountriesService para validar y cachear el país destino.

### Flujo de caché de países

## Endpoints

POST /travel-plans Crear un plan 
GET /travel-plans Listar todos 
GET /travel-plans/:id Detalle de uno 
DELETE /travel-plans/:id Eliminar uno 

## Ejemplos Postman

### Crear plan
**POST** `http://localhost:3000/travel-plans`
```json
{
  "title": "Viaje a Colombia",
  "startDate": "2025-07-10",
  "endDate": "2025-07-20",
  "countryCode": "COL"
}
```

### Eliminar plan
**DELETE** `http://localhost:3000/travel-plans/1`