const express = require('express');
const table = require('./database')

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.get('/getAll', (request, response) => {
    const db = table.getDbServiceInstance();
    // console.log("getAll")
    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(3000, () => {
    console.log("App listening on port 3000")
})