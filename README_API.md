# lifestyle-home-search-backend

# Homes API

## Overview

The **Homes API** allows users to search for properties based on various criteria, such as city, rent range, layout, year, and building type.

## Base URL

```
http://localhost:3000
```

## Endpoints

### **1. Get Homes Info**

#### **Endpoint:**
```
GET /homes/{home_id}：物件IDをもとに物件情報を取得
```

### **2. Get Home List**

#### **Endpoint:**

```
GET /homes：以下のクエリパラメータを条件に該当物件を検索
```

#### **Query Parameters:**

| Parameter   | Type              | Description                                        |
| ----------- | ----------------- | -------------------------------------------------- |
| `cities`    | `string[]`        | List of cities to filter (comma-separated) 市区町村名をカンマ区切りで指定|
| `max_rent`  | `number`          | Maximum rent value                                 |
| `min_rent`  | `number`          | Minimum rent value                                 |
| `layouts`   | `Layout[]`        | List of layouts to filter (comma-separated) レイアウトをカンマ区切りで指定|
| `year`      | `number`          | Year of construction                               |
| `buildings` | `BUILDING_TYPE[]` | List of building types to filter (comma-separated) 物件種別をカンマ区切りで指定|

#### **Example Request:**

```
GET /homes?cities=墨田区,福岡市&max_rent=100000&min_rent=50000&layouts=1LDK,2LDK&year=2020&buildings=アパート,マンション
```

```JavaScript
const fetchHomes = async () => {
      try {
        const queryParams = new URLSearchParams({
          cities: '墨田区,福岡市',
          max_rent: '100000',
          min_rent: '50000',
          layouts: '1LDK,2LDK',
          year: '2020',
          buildings: 'アパート,マンション'
        }).toString();

        const response = await fetch(`http://your-api-domain.com/homes?${queryParams}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch homes');
        }
        const data = await response.json();
        setHomes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
```

#### **Example Response:**

```json
[
  {
    "id": 1,
    "city": "墨田区",
    "rent": 95000,
    "layout": "1LDK",
    "year": 2020,
    "building": "アパート",
    "created_at": "2024-02-25T12:00:00Z"
  },
  {
    "id": 2,
    "city": "福岡市",
    "rent": 80000,
    "layout": "2LDK",
    "year": 2020,
    "building": "マンション",
    "created_at": "2024-02-20T10:30:00Z"
  }
]
```

## Query Parameter Handling

- `cities`, `layouts`, and `buildings` should be comma-separated lists.
- `max_rent` and `min_rent` should be numerical values.
- The API supports searching across multiple cities, layouts, and building types.

## Technologies Used

- **NestJS** (Backend framework)
- **TypeORM** (Database ORM)
- **PostgreSQL (Database, depending on configuration)

## License

This project is licensed under the MIT License.

## Contact

For issues or feature requests, please contact the development team at `support@yourdomain.com`.

