CREATE TABLE IF NOT EXISTS "User" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(64),
	"password" varchar(64)
);
