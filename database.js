const mysql = require('mysql')
let instance = null;
 
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "shopsmart",
})
 
class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM table_paris;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`)
        connection.query(`use shopsmart`)
        connection.query(`select * from table_paris`,
        function (err, result) {
            if (err)
                console.log(`Error executing the query - ${err}`)
            else
            {
                console.log("Result: ", result)
                exports.table = result;
            }
        })
    }
})

module.exports = DbService;


