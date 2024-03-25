// import { createClient } from '@libsql/client'

// const client = createClient({
//   url: "libsql://technologyline-database-trimeas.turso.io",
//   authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MDg2MzI2NDksImlkIjoiY2Y0YzhiODktZDE3Yi0xMWVlLWEyYTctOGU4YjRkMDEwY2ViIn0.2SH_T4fnPJIT4V5RV8NT9s2peRX19ArtmnY4Kp4bmrMg1ZkyKFltOUUz6-RfkoD9Ams6Zh9Sbtq-pOIaltoGBQ",
// })

const createTableBillingData = `
CREATE TABLE billingdata (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  company TEXT COLLATE NOCASE,
  client INTEGER,
  user TEXT COLLATE NOCASE,
  numberBill INTEGER,
  createDate TEXT,
  checkDate TEXT DEFAULT '0',
  verificationNumber INTEGER,
  link TEXT COLLATE NOCASE
);`

export async function createTable() {
  try {
    const dropTableQuery = `DROP TABLE IF EXISTS concepts`
    await client.execute(dropTableQuery)
    const resultCreateTable = await client.execute(createTableBillingData)
    console.log('Tabla creada:', resultCreateTable)
  } catch (error) {
    console.error('Error al crear la tabla:', error)
  }
}