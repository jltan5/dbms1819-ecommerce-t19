CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(80),
  "first_name" VARCHAR(80),
  "last_name" VARCHAR(80),
  "street" VARCHAR(80),
  "municipality" VARCHAR(80),
  "province" VARCHAR(80),
  "zipcode" VARCHAR(80)
);
CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80),
  "description" VARCHAR(250),
  "tagline" VARCHAR(150),
  "price" FLOAT(2),
  "warranty" INT,
  "category_id" INT REFERENCES products_category(id),
  "brand_id" INT REFERENCES brands(id)
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id"INT REFERENCES customers(id),
  "product_id" INT REFERENCES products(id),
  "order_date" timestamp default current_timestamp,
  "quantity" INT  
);


CREATE TABLE "customer_favorite_products" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INT REFERENCES customers(id),
  "product_id" INT REFERENCES products(id) 
);


CREATE TABLE "products_category" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80)
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80),
  "description" VARCHAR(250)
);

INSERT INTO brands (name, description) VALUES ('ellaine', 'mataba');
