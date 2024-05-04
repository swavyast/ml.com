const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const REACT_APP_GITHUB_CLIENT_SECRET = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('getAccessToken', async function (req, res) {
    req.query.code;

    const params = '?client_id=' + REACT_APP_GITHUB_CLIENT_ID + '&client_secret='
        + REACT_APP_GITHUB_CLIENT_SECRET + '&code=' + req.query.code;

    await fetch('https://github.com/login/oauth/login/access_token=' + params, {
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




app.listen(4000, () => console.log('CORS server is running on port : 4000'));