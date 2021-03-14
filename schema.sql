DROP TABLE IF EXISTS "businesses";
CREATE TABLE "businesses" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "phone" VARCHAR,
  "address" VARCHAR,
  "description" VARCHAR,
  "picture_url" VARCHAR,
  "active" boolean,
  "open_date" date,
  "admin_user_id" int,
  "avg_rating" real
);

DROP TABLE IF EXISTS "biz_admin_users";
CREATE TABLE "biz_admin_users" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR,
  "firstname" VARCHAR,
  "lastname" VARCHAR,
  "phone" VARCHAR
);

ALTER TABLE "businesses" ADD FOREIGN KEY ("admin_user_id") REFERENCES "biz_admin_users" ("id");

INSERT INTO biz_admin_users(email, firstname, lastname, phone)
  VALUES('alejandrofranco@pursuit.org', 'Alejandro', 'Franco', '917-555-1234');


INSERT INTO businesses(name, phone, address, description, picture_url, active, open_date, admin_user_id, avg_rating)
  VALUES('Henry''s Tacos', '917-555-1234', '1234 Main St, Somewhere, NY, 12345', 'Best tacos in town', 'https://cdn.vox-cdn.com/uploads/chorus_image/image/38996208/2013_henrystacos-thumb.0.jpg', true, '2003-03-10', 1, 4.5);

