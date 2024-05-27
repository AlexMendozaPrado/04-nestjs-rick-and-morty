CREATE TABLE IF NOT EXISTS "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"characterId" integer NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
