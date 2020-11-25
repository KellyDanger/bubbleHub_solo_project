
CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(25) NOT NULL,
	"password" varchar(100) NOT NULL,
	"name" varchar(50),
	"email" varchar(255),
	"city" varchar(50),
	"state" varchar(50),
	"hubNumber" integer,
	"tolerance" integer,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "activities" (
	"id" serial NOT NULL,
	"description" varchar(250) NOT NULL,
	"riskLevel" int NOT NULL,
	CONSTRAINT "activities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "user_activities" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"activity_id" int NOT NULL,
	CONSTRAINT "user_activities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "bubble_mates_junction" (
	"id" serial NOT NULL,
	"bubble_owner" integer NOT NULL,
	"bm_id" integer NOT NULL,
	CONSTRAINT "bubble_mates_junction_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_fk1" FOREIGN KEY ("activity_id") REFERENCES "activities"("id");

ALTER TABLE "bubble_mates_junction" ADD CONSTRAINT "bubble_mates_junction_fk0" FOREIGN KEY ("bubble_owner") REFERENCES "user"("id");
ALTER TABLE "bubble_mates_junction" ADD CONSTRAINT "bubble_mates_junction_fk1" FOREIGN KEY ("bm_id") REFERENCES "user"("id");

SELECT * FROM "user";

SELECT * FROM "activities";


--retrieves the raw hubNumber of a given user based on the risk-level of their activities
SELECT sum("riskLevel"), count("riskLevel") FROM "activities"
JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
JOIN "user" ON "user"."id" = "user_activities"."user_id"
WHERE "user"."id" = 6;

SELECT sum("riskLevel"), count("riskLevel") FROM "activities"
JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
JOIN "user" ON "user"."id" = "user_activities"."user_id"
WHERE "user"."id" = 1 AND "user_activities"."active"=true;




--list all the activities and risk levels associated with a given user
SELECT "activities"."id","activities"."description", "activities"."riskLevel", "user_activities"."active" FROM "activities"
JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
JOIN "user" on "user"."id" = "user_activities"."user_id"
WHERE "user"."id" = 6 ORDER BY "activities"."id";


--select all bubbleMates for a given user
SELECT "user"."name", "user"."hubNumber" FROM "user"
JOIN "bubble_mates_junction" on "user"."id" = "bm_id"
WHERE "bubble_mates_junction"."bubble_owner" = 7;

--insert activities data
INSERT INTO "activities" ("description", "riskLevel")
VALUES ('Wearing a Mask',0), ('Staying Home',0),('Solo Outdoor Exercise',0), ('Getting Takeout',1), ('Tennis',1), ('Getting Gas',1), ('Golf',4), ('Friend Uses Your Bathroom',1), ('Older Kids Playdate',4), ('Camping-SD',1), ('Beach-SD',4), ('Outdoor Dining-SD',4), ('Road Trip-SD',4), ('Vacation Home with Another Family - with quarantine prep',4), ('Grocery Shopping',4), ('Library/Museum-SD',4), ('See Your Doctor - EC',4), ('Stay at a Hotel',9), ('Small Backyard BBQ-SD',9), ('Use a Public Restroom',9), ('Visit a Mall-SD',9),('Small Indoor Dinner Party',9), ('Public Pool',9), ('Get a Haircut',16), ('Work in a Shared Office',9), ('Young Kid Playdates',9), ('Send Kids to School/Camp/Daycare',9), ('Casino - SD',16), ('Movie Theatre - SD',16), ('Playground',16), ('Visit an Elder in Their Home',16), ('Bowling', 16), ('Exercise at a gym', 16), ('Ride the Subway or Bus', 16), ('Eat in at a Restaurant', 16), ('Airplane', 16), ('Basketball', 16), ('Attend a Wedding or Funeral', 25), ('Hug or Shake Hands', 25), ('Not Wear a Facemask Routinely', 25), ('Go Out with Someone You Do Not Know Well', 25), ('Attend Amusement Park', 25), ('See Concert or Play', 25), ('Indoor Party', 25), ('Attend Sports in a Stadium', 25), ('Church', 25), ('Indoor Bar', 25), ('Nightclub', 25), ('Eat at a Buffet', 25);

SELECT * FROM "activities";

--add the user's activities to the junction table
INSERT INTO "user_activities" ("activity_id", "user_id")
VALUES (22, 1);

--update the user's tolerance 
UPDATE "user" SET "tolerance" = 2 WHERE "id" = 1;

--update the user's hubNumber
UPDATE "user" SET "hubNumber" = 1 WHERE "id" = 1;


--retrieve the user's tolerance
SELECT "tolerance" FROM "user" WHERE "id" = 1;

--update the user's profile with their data
UPDATE "user" 
SET "name" = 'Kelly', "email" = 'kellyanndanger@gmail.com', "city" = 'Minneapolis', "state" = 'Minnesota'
WHERE "id" = 6;

--delete an activity from a user's profile
DELETE FROM "user_activities" WHERE "user_id" = 11 AND "activity_id" = 22;

--fetch user by email
SELECT * FROM "user" WHERE "email" = 'allen.joeg@gmail.com';

--add bubblemate relationship
INSERT INTO "bubble_mates_junction" ("bubble_owner", "bm_id")
VALUES (7, 6);

--delete a bubblemate relationship from junction table
DELETE FROM "bubble_mates_junction" WHERE "bubble_owner"= 11 AND "bm_id"=7;


--transaction to insert user info AND activities at the same time
BEGIN;
UPDATE "user" SET "name" = 'Kelly', "email" = 'kellyanndanger@gmail.com', "city" = 'Minneapolis', "state" = 'Minnesota' WHERE "id" = 1;
--this ID will be from req.user.id
INSERT INTO "user_activities" ("activity_id", "user_id") VALUES (34, 1),(22, 1),(23, 1),(24, 1),(25, 1),(26, 1),(27, 1),(28, 1),(29, 1),(30, 1),(31, 1),(32, 1),(33, 1),(35, 1),(36, 1),(37, 1),(38, 1),(39, 1),(40, 1),(41, 1),(42, 1),(43, 1),(44, 1),(45, 1),(46, 1),(47, 1),(48, 1),(49, 1),(50, 1),(51, 1),(52, 1),(53, 1),(54, 1),(55, 1),(56, 1),(57, 1),(58, 1),(59, 1),(60, 1),(61, 1),(62, 1),(63, 1),(64, 1),(65, 1),(66, 1),(67, 1),(68, 1),(69, 1),(70, 1) ; 
--these will be req.body.id and req.user.id, maybe I can map for the activity_id??
COMMIT;

--update an activity as active for a user
UPDATE "user_activities" SET "active"= true WHERE "user_id" = 1 AND "activity_id" = 22;