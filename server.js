import express from 'express';

import bodyParser from 'body-parser';

import ejs from 'ejs';

import {translate} from '@vitalets/google-translate-api';

const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view enjine', 'ejs');

let text_to_translate = '';
let target_language = '';
let translated_text = '';
let text;
app.route('/')
.get((req, res)=>{
    res.render('index.ejs', {
        text: text,
        text_to_translate: text_to_translate
    })
})
.post((req, res)=>{
    text_to_translate = req.body.text_to_translate;
    target_language = req.body.language;
    translated_text = translate(text_to_translate,{to: target_language})
    .then((result)=>{
        text = result.text;
        text_to_translate = req.body.text_to_translate;
        console.log(text);
        res.redirect('/')
    })
    
})

//console.log(text);


app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})