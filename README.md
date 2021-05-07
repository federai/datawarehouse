Data Warehouse: <br>

Company mode <br>

Installation of dependencies <br>
npm install <br><br>

Preparing the DB <br>
First you need to create a database in your mySQL Server named 'datawarehouse'. <br>
After that you need to run the queries stored in the .mysql files (following that specific order,
which you can find in the database folder. <br>
First you create the tables, and then you should execute specific queries to add some standard data, which you can find in the canales.sql, usuarios.sql, regiones.sql files. <br>
Here, you'll find that some users have been provided (one administrator and one basic profile), some regions and channels. <br>
Finally you must setup an .env file at the root of the data_warehouse directory (similar to the example.env file) with the configuration of your mySQL database. <br><br>

To run locally <br>
To run the service locally, you must run the following command at the root of the data_warehouse directory :<br><br>

npm run start<br><br>

Then, open the index.html file in your browser. <br>
In order to login, you can use the following credentials: <br>
ADMIN: <br>
email: fede@gmail.com <br>
password: password1 <br><br> 

or <br>
BASIC: <br>
email: mica@gmail.com <br>
password: password2 <br><br>

Swagger <br>
There is a swagger file with the documentation of the API 