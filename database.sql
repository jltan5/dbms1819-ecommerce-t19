CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR(80),
  "first_name" VARCHAR(80),
  "last_name" VARCHAR(80),
  "street" VARCHAR(80),
  "municipality" VARCHAR(80),
  "province" VARCHAR(80),
  "zipcode" VARCHAR(80),
  "password" VARCHAR(20)
);


CREATE TABLE "products_category" (
  "id" SERIAL PRIMARY KEY,
  "category_name" VARCHAR(80)
);

CREATE TABLE "brands" (
  "id" SERIAL PRIMARY KEY,
  "brand_name" VARCHAR(80),
  "description" VARCHAR(250)
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(80),
  "description" VARCHAR(250),
  "tagline" VARCHAR(150),
  "price" FLOAT(2),
  "warranty" INT,
  "category_id" INT REFERENCES products_category(id),
  "brand_id" INT REFERENCES brands(id),
  "image" VARCHAR(250)
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "customer_id"INT REFERENCES customers(id),
  "product_id" INT REFERENCES products(id),
  "order_date" VARCHAR(150),
  "quantity" INT  
);


CREATE TABLE "customer_favorite_products" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" INT REFERENCES customers(id),
  "product_id" INT REFERENCES products(id) 
);

insert into products_category (category_name) values ('Cat'), ('Dog'), ('Snake'), ('Bird'), ('Dragon'), ('Dinosaur'), ('Tiger'), ('Elephant'), ('Pig'), ('Chicken'), ('Zebra'), ('Giraffe');


insert into brands (brand_name, description) values ('Persian','The Persian cat is a long-haired breed of cat characterized by its round face and short muzzle.');
insert into brands (brand_name, description) values ('Ragdoll','The Ragdoll is a cat breed with blue eyes and varying colours and patterns.');
insert into brands (brand_name, description) values ('Bulldog','The Bulldog, also known as the English Bulldog or British Bulldog, is a medium-sized breed of dog.');
insert into brands (brand_name, description) values ('Poodle','The poodle is a group of formal dog breeds, the Standard Poodle, Miniature Poodle and Toy Poodle.');
insert into brands (brand_name, description) values ('Cobra','Cobra is any of several species of snake usually belonging to the family Elapidae.');
insert into brands (brand_name, description) values ('Anaconda','The green anaconda, also known as common anaconda and water boa, is a non-venomous boa species found in South America.');
insert into brands (brand_name, description) values ('Parrot','Parrots, also known as psittacines, are birds of the roughly 393 species in 92 genera that make up the order Psittaciformes, found in most tropical and subtropical regions.');
insert into brands (brand_name, description) values ('Cockatoo','A cockatoo is a parrot that is any of the 21 species belonging to the bird family Cacatuidae, the only family in the superfamily Cacatuoidea.');
insert into brands (brand_name, description) values ('Wyvern','A Wyvern is a legendary creature with a dragon head and wings, a reptilian body, two legs, and a tail often ending in a diamond- or arrow-shaped tip.');
insert into brands (brand_name, description) values ('Hydra','Hydra dragons are extremely picky eaters.');
insert into brands (brand_name, description) values ('Velociraptor','Velociraptor is a genus of dromaeosaurid theropod dinosaur that lived approximately 75 to 71 million years ago during the later part of the Cretaceous Period.');
insert into brands (brand_name, description) values ('Carnotaurus','Carnotaurus is a genus of large theropod dinosaur that lived in South America during the Late Cretaceous period, from about 72 to 69.9 million years ago.');
insert into brands (brand_name, description) values ('Siberian','The Siberian tiger is a Panthera tigris tigris population in Siberia.');
insert into brands (brand_name, description) values ('Malayan','The Malayan tiger is a Panthera tigris tigris population in Peninsular Malaysia.');
insert into brands (brand_name, description) values ('Forest','The African forest elephant is a forest-dwelling species of elephant found in the Congo Basin.');
insert into brands (brand_name, description) values ('Asian','The Asian elephant, or Asiatic elephant, is the only living species of the genus Elephas and is distributed in Southeast Asia, from India and Nepal in the west to Borneo in the south.');
insert into brands (brand_name, description) values ('Duroc','The Duroc pig is an older breed of domestic pig. The breed was developed in the United States and formed the basis for many mixed-breed commercial hogs.');
insert into brands (brand_name, description) values ('Tamworth','The Tamworth, also known as Sandy Back and Tam, is a breed of domestic pig originating in its namesake Tamworth, Staffordshire United Kingdom, with input from Irish pigs.');
insert into brands (brand_name, description) values ('Leghorn','The Leghorn is a breed of chicken originating in Tuscany, in central Italy. Birds were first exported to North America in 1828 from the port city of Livorno, on the western coast of Tuscany.');
insert into brands (brand_name, description) values ('Cornish','Cornish is a revived language that became extinct as a first language in the late 18th century.');
insert into brands (brand_name, description) values ('Plains','The plains zebra, also known as the common zebra or Burchells zebra, or locally as the "quagga", is the most common and geographically widespread species of zebra. ');
insert into brands (brand_name, description) values ('Mountain','The mountain zebra is a species in the family Equidae. It is native to south-western Angola, Namibia, and South Africa.');
insert into brands (brand_name, description) values ('Nubian','The Nubian giraffe is the nominate subspecies of giraffe. It is found in Ethiopia, Kenya, Uganda, South Sudan and Sudan.');
insert into brands (brand_name, description) values ('Masai','The Masai giraffe, also spelled Maasai giraffe, also called Kilimanjaro giraffe, is the largest subspecies of giraffe.');