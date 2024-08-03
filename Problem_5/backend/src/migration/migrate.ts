import { pool } from '../config/postgres';
import * as fs from 'fs';
import * as path from 'path';

const migrate = async () => {
  const filePath = path.join(__dirname, 'schema.sql');
  const sql = fs.readFileSync(filePath, 'utf-8');

  try {
    await pool.query(sql);
    console.log('Migration successful');
  } catch (err) {
    console.error('Migration failed', err);
  } finally {
    await pool.end();
  }
};

migrate().catch((err) => console.error('Error running migration', err));
