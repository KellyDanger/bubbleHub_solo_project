
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
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
SELECT sum("riskLevel") FROM "activities"
JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
JOIN "user" ON "user"."id" = "user_activities"."user_id"
WHERE "user"."id" = 4;


--list all the activities and risk levels associated with a given user
SELECT "activities"."description", "activities"."riskLevel" FROM "activities"
JOIN "user_activities" ON "activities"."id" = "user_activities"."activity_id"
JOIN "user" on "user"."id" = "user_activities"."user_id"
WHERE "user"."id" = 3;


--select all bubbleMates for a given user
SELECT "user"."name" FROM "user"
JOIN "bubble_mates_junction" on "user"."id" = "bm_id"
WHERE "bubble_mates_junction"."bubble_owner" = 5;


