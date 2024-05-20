const mysql = require('mysql')
let instance = null;
 
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
})
 
class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }

    async getAllData(city) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM table_" + city + ";";

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
        connection.query(`use shopsmart`,
        function (err, result) {
            if (err)
                console.log(`Error executing the query - ${err}`)
        })
    }
})

module.exports = DbService;


