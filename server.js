const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, Url: ${req.url}`;

    fs.appendFile('server.log', log + '\n', err => {
        if(err)console.log('Unable to register the log');
        
        next();
    });
});

app.use((req, res) => {
    res.render('mantenimiento.hbs');
});

app.get('/', (req, res) => {
    res.send({
        name: 'mike',
        age: '19'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Testing',
        mrsName: 'Mike'
    });
});
app.listen(3000, () => {
    console.log('Server Running on port 3000');
});
