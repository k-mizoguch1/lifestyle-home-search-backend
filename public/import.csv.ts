import { createReadStream } from 'fs';
import * as csvParser from 'csv-parser';
import { DataSource } from 'typeorm';
import { Home } from '../src/homes/entities/home.entity';
import { env } from 'process';
import ormConfig from '../src/ormconfig'; // TypeORM の設定ファイル

const CSV_FILE_PATH = 'public/data2.csv'; // CSVファイルのパス
const dataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['src/**/entities/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  synchronize: false,
});

async function importCSV() {
  await dataSource.initialize();
  console.log('Database connected!');

  const homeRepository = dataSource.getRepository(Home);
  const homes: Home[] = [];

  createReadStream(CSV_FILE_PATH)
    .pipe(csvParser())
    .on('data', (row) => {
      const home = new Home();
      home.name = row.name;
      home.prefecture = row.prefecture;
      home.city = row.city;
      home.rent = parseInt(row.rent);
      home.layout = row.layout;
      home.year = parseInt(row.year);
      home.building = row.building;
      home.location = row.location;
      home.heights = parseInt(row.heights);
      home.area = parseInt(row.area);
      home.admin = parseInt(row.admin);
      home.deposit = parseInt(row.deposit);
      home.photo_url = row.photo_url;
      home.station_list = row.station_list
      home.thumbnails = row.thumbnails;
      homes.push(home);
    })
    .on('end', async () => {
      try {
        await homeRepository.save(homes);
        console.log('CSV Import Completed');
      } catch (error) {
        console.error('Error saving data:', error);
      } finally {
        await dataSource.destroy();
        console.log('Database connection closed');
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
    });
}

importCSV().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
