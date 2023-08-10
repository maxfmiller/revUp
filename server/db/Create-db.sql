CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE "posts" (
	"imagePath"	TEXT,
	"title"	TEXT NOT NULL,
	"body"	TEXT NOT NULL,
	"author"	INTEGER NOT NULL,
	PRIMARY KEY("imagePath")
)