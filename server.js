

var express = require('express');
var cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
var bodyParser = require('body-parser');

const app = express();

const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REACT_APP_GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

console.log('client id and secret in server.js');
console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);

app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    console.log(req.query.code);

    const params = '?client_id=' + REACT_APP_GITHUB_CLIENT_ID + '&client_secret='
        + REACT_APP_GITHUB_CLIENT_SECRET + '&code=' + req.query.code;

    await fetch('https://github.com/login/oauth/access_token=' + params, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        }
    }).then((response) => {
        return response.json();     //response of github api
    }).then((data) => {
        console.log('response of cors server : [data] =>', data)
        return res.json(data);      //response of cors server
    })
})


app.get('/getUserData', async function (req, res){
    req.get('Authorization');   //Bearer access-token
    await fetch('https://api.github.com/user', {
        method : 'GET',
        headers : {
            'Authorization' : req.get('Authorization')   //Bearer access-token
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log('response of cors server : [userData] =>', data);
        res.json(data);
    })
});

app.listen(4000, () => console.log('CORS server is running on port : 4000'));