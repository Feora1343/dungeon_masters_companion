/*Schema as of 3/20/18 */

CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"username" varchar(80) NOT NULL UNIQUE,
	"password" varchar(240) NOT NULL,
	"profile_image" varchar,
	CONSTRAINT users_pk PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "campaign" (
	"campaign_id" serial NOT NULL UNIQUE,
	"campaign_name" varchar(50) NOT NULL UNIQUE,
	"campaign_notes" varchar(3000),
	"character_id" varchar(30),
	"user_id" int NOT NULL UNIQUE,
	CONSTRAINT campaign_pk PRIMARY KEY ("campaign_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "character" (
	"character_id" serial NOT NULL,
	"name" varchar(30) NOT NULL,
	"character_icon" varchar(20) NOT NULL,
	CONSTRAINT character_pk PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "encounter" (
	"encounter_id" serial NOT NULL,
	"campaign_id" int NOT NULL,
	CONSTRAINT encounter_pk PRIMARY KEY ("encounter_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "monster" (
	"monster_id" serial NOT NULL,
	"monster_name" varchar(30) NOT NULL UNIQUE,
	"monster_icon" varchar(20) NOT NULL,
	CONSTRAINT monster_pk PRIMARY KEY ("monster_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "character_encounter" (
	"character_id" serial NOT NULL,
	"encounter_id" int NOT NULL,
	CONSTRAINT character_encounter_pk PRIMARY KEY ("character_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "monster_encounter" (
	"monster_id" serial NOT NULL,
	"encounter_id" int NOT NULL,
	CONSTRAINT monster_encounter_pk PRIMARY KEY ("monster_id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("user_id") REFERENCES "campaign"("user_id");


ALTER TABLE "character" ADD CONSTRAINT "character_fk0" FOREIGN KEY ("character_id") REFERENCES "character_encounter"("character_id");

ALTER TABLE "encounter" ADD CONSTRAINT "encounter_fk0" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("campaign_id");

ALTER TABLE "monster" ADD CONSTRAINT "monster_fk0" FOREIGN KEY ("monster_id") REFERENCES "monster_encounter"("monster_id");

ALTER TABLE "character_encounter" ADD CONSTRAINT "character_encounter_fk0" FOREIGN KEY ("encounter_id") REFERENCES "encounter"("encounter_id");

ALTER TABLE "monster_encounter" ADD CONSTRAINT "monster_encounter_fk0" FOREIGN KEY ("encounter_id") REFERENCES "encounter"("encounter_id");


