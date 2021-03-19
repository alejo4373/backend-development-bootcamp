const pgp = require('pg-promise')();
const DATABASE_URL = process.env.DATABASE_URL

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
        id,
        name,
        phone,
        address,
        description, 
        picture_url,
        active,
        open_date,
        admin_user_id,
        avg_rating
     ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     RETURNING *
    `
    const business = await db.one(SQL, [
      newBusiness.id,
      newBusiness.name,
      newBusiness.phone,
      newBusiness.address,
      newBusiness.description,
      newBusiness.picture_url,
      newBusiness.active,
      newBusiness.open_date,
      newBusiness.admin_user_id,
      newBusiness.avg_rating,
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

const remove = async (id) => {
  try {
    const SQL = `DELETE FROM businesses WHERE id = $1 RETURNING *`;
    let deletedBusiness = await db.one(SQL, [id]);
    return deletedBusiness;
  } catch (err) {
    throw (err);
  }
}

module.exports = {
  getAll: getAll,
  getById: getById,
  add: add,
  update,
  remove
}
