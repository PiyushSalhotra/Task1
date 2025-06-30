const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('public'))
app.get('/', (req,res)=>{
    res.render('index')
})
app.post('/submit', (req,res)=>{
    const userData = req.body;
    res.render('result', {userData})
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})