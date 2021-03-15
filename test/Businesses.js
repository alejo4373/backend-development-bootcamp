const pgp = require('pg-promise')(); // Import pg-promise
const DATABASE_URL = 'postgres://jpgnalgc:1bFUAaoVDEyxh7KhFJWWI3SAbuXw2YG4@queenie.db.elephantsql.com:5432/jpgnalgc' // ⚠️ Replace with YOUR database url
const db = pgp(DATABASE_URL)

const getAll = async () => {
  try {
    let businesses = await db.any('SELECT * from businesses')
    return businesses
  } catch (err) {
    throw (err)
  }
}

const getById = async (id) => {
  try {
    let business = await db.one('SELECT * from businesses WHERE id = $1', [id])
    return business            // $1 will be the fist element of this list⤴  
  } catch (err) {
    throw (err)
  }
}

const add = async (newBusiness) => {
  try {
    let SQL = `
      INSERT INTO businesses (name, phone, address, description, picture_url, active, open_date, admin_user_id, avg_rating)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *
      `
    let business = await db.one(SQL, [
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
    throw (err)
  }
}

const update = async (id, updates) => {
  try {
    let SQL = `
      UPDATE businesses 
      SET name = $1, phone = $2, address = $3, description = $4,
        picture_url = $5, active = $6, open_date = $7, admin_user_id = $8, avg_rating = $9
      WHERE id = $10
      RETURNING *
      `
    let business = await db.one(SQL, [
      updates.name,
      updates.phone,
      updates.address,
      updates.description,
      updates.picture_url,
      updates.active,
      updates.open_date,
      updates.admin_user_id,
      updates.avg_rating,
      id
    ])
    return business
  } catch (err) {
    throw (err)
  }
}

const main = async () => {
  let businessUpdates = {
    name: "Alejo's Ricos Tacos",
    phone: "917-123-4567",
    address: "1234 Main St, Sometown, NY, 12345",
    description: "Best tacos in town",
    picture_url: "https://cdn.vox-cdn.com/uploads/chorus_image/image/38996208/2013_henrystacos-thumb.0.jpg",
    active: false,
    open_date: "2003-03-10",
    admin_user_id: "1",
    avg_rating: 4.5
  }
  let result = await update(1, businessUpdates) // Updating business with id = 1 with the new information of businessUpdates
  console.log(result)
  process.exit(0)
}

main()
