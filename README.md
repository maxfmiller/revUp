
# revUp
## A social media app for car enthusiasts
#### mmiller-project

This is a social media app created with node.js and express. It is a photo sharing social media concept which would be marketed towards car enthusiasts. It is designed to run locally, and currently has no cloud or online functionality. It is nowhere near complete, and MANY of the user and posting functions that are present have not been implemented yet. It will be continued on as a personal project. It has a few external requirements to run.
<pre>

</pre>
***Dependencies***

HTTP

Newest version of Express (for updated body-parser syntax)

Path

Multer

SQLite 3 (PostgreSQL was having serious path issues, multiple accidental installations from different sources made it not feasible to use) 
<pre>

</pre>
***Commands to run***

This program is ran completely through node. The command to start the server:

node server/app.js

It operates locally on port 1337. The URL of the homepage is:

localhost:1337
<pre>

</pre>
***Database setup / configuration***

As stated before, this is an SQLite database. The commands to create the required tables are in the "Create-db.sql" file in the repository. Much of the code present in the server, especially the Routes and Services, is SQLite specific.
<pre>


</pre>

Dev Notes

***This project is a clear work-in-progress. It has reached the point where it fulfills the requriments of the lab, but it is structured towards becoming so much more. Much is incomplete, and some things have zero functionality or do not make the most sense in the current configuration. However, as this project continues to develop, it will all come into view as a social media distinctly for drivers and enthusiasts.***


