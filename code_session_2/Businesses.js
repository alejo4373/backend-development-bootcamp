const pgp = require('pg-promise')();
const DATABASE_URL = 'postgres://zuaanwyt:zw0RbnnKE_aFsWgINGWwDDV35Yawdzls@queenie.db.elephantsql.com:5432/zuaanwyt'

const db = pgp(DATABASE_URL)

const getAll = async () => {
  try {
    const businesses = await db.any('SELECT * FROM businesses')
    return businesses;
  } catch (err) {
    throw (err)
  }
}

const getById = async (id) => {
  try {
    const business = await db.one('SELECT * FROM businesses WHERE id = $1', [id])
    return business;
  } catch (err) {
    throw (err)
  }
}

const add = async (newBusiness) => {
  try {
    const SQL = `
      INSERT INTO businesses(
        name,
        phone,
        address,
        description, 
        picture_ulr,
        active,
        open_date,
        admin_user_id,
        avg_rating
     ,) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *
    `
    const business = await db.one(SQL, [
      newBusiness.name, // Will be embedded in $1
      newBusiness.phone,        // $2
      newBusiness.address,      // $3
      newBusiness.description,  // $4
      newBusiness.picture_url,  // $5
      newBusiness.active,       // $6
      newBusiness.open_date,    // $7
      newBusiness.admin_user_id,// $8
      newBusiness.avg_rating,   // $9
    ])
    return business
  } catch (err) {
    throw err
  }
}

const update = async (id, updates) => {
  try {
    const SQL = `
      UPDATE businesses SET
        name = $1,
        phone = $2,
        address = $3,
        description = $4,
        picture_url = $5,
        active = $6,
        admin_user_id = $7,
        avg_rating = $8,
        open_date = $9
      WHERE id = $10
      RETURNING *
    `
    let updatedBusiness = await db.one(SQL, [
      updates.name,
      updates.phone,
      updates.address,
      updates.description,
      updates.picture_url,
      updates.active,
      updates.admin_user_id,
      updates.avg_rating,
      updates.open_date,
      id
    ])

    return updatedBusiness
  } catch (err) {
    throw (err)
  }
}

const partialUpdate = (id, updates) => {
  const SQL = `UPDATE businesses`

}

const main = async () => {

  let updates = {
    address: "234 W 42nd St, New York, NY 10036",
    picture_url: "https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/theatres/552/05520_mobile.jpg",
    open_date: "April 21, 2000",
    name: "AMC Empire 25",
  }

  let result = await update(2, updates)
  console.log(result)
  process.exit(0)
}

main();
