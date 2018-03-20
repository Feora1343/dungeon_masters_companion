/*Schema as of 3/20/18 */

CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);

CREATE TABLE "campaign" (
  "campaign_id" serial NOT NULL UNIQUE,
  "campaign_name" varchar(50) NOT NULL UNIQUE,
  "campaign_notes" varchar(3000),
  "character_id" varchar(30),
  "user_id" int NOT NULL UNIQUE
);

CREATE TABLE "character" (
  "character_id" serial NOT NULL,
  "name" varchar(30) NOT NULL,
  "character_icon" varchar(20) NOT NULL,
  CONSTRAINT character_pk PRIMARY KEY ("character_id")
);

CREATE TABLE "encounter" (
  "encounter_id" serial NOT NULL,
  "campaign_id" int NOT NULL,
  CONSTRAINT encounter_pk PRIMARY KEY ("encounter_id")
);

CREATE TABLE "monster" (
  "monster_id" serial NOT NULL,
  "monster_name" varchar(30) NOT NULL UNIQUE,
  "monster_icon" varchar(20) NOT NULL
);

CREATE TABLE "character_encounter" (
  "character_id" serial NOT NULL,
  "encounter_id" int NOT NULL
);

CREATE TABLE "monster_encounter" (
  "monster_id" serial NOT NULL,
  "encounter_id" int NOT NULL
);




