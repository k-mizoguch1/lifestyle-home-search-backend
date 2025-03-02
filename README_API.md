# lifestyle-home-search-backend

# Homes API

## Overview

The **Homes API** allows users to search for properties based on various criteria, such as city, rent range, layout, year, and building type.

## Base URL

```
http://your-api-domain.com/homes
```

## Endpoints

### **1. Get Homes List**

#### **Endpoint:**

```
GET /homes
```

#### **Query Parameters:**

| Parameter   | Type              | Description                                        |
| ----------- | ----------------- | -------------------------------------------------- |
| `cities`    | `string[]`        | List of cities to filter (comma-separated)         |
| `max_rent`  | `number`          | Maximum rent value                                 |
| `min_rent`  | `number`          | Minimum rent value                                 |
| `layouts`   | `Layout[]`        | List of layouts to filter (comma-separated)        |
| `year`      | `number`          | Year of construction                               |
| `buildings` | `BUILDING_TYPE[]` | List of building types to filter (comma-separated) |

#### **Example Request:**

```
GET /homes?cities=Tokyo,Osaka&max_rent=100000&min_rent=50000&layouts=1LDK,2LDK&year=2020&buildings=Apartment,Condo
```

#### **Example Response:**

```json
[
  {
    "id": 1,
    "city": "Tokyo",
    "rent": 95000,
    "layout": "1LDK",
    "year": 2020,
    "building": "Apartment",
    "created_at": "2024-02-25T12:00:00Z"
  },
  {
    "id": 2,
    "city": "Osaka",
    "rent": 80000,
    "layout": "2LDK",
    "year": 2019,
    "building": "Condo",
    "created_at": "2024-02-20T10:30:00Z"
  }
]
```

## Query Parameter Handling

- `cities`, `layouts`, and `buildings` should be comma-separated lists.
- `max_rent` and `min_rent` should be numerical values.
- `year` should be a valid 4-digit number.
- The API supports searching across multiple cities, layouts, and building types.

## Technologies Used

- **NestJS** (Backend framework)
- **TypeORM** (Database ORM)
- **PostgreSQL/MySQL** (Database, depending on configuration)

## License

This project is licensed under the MIT License.

## Contact

For issues or feature requests, please contact the development team at `support@yourdomain.com`.

