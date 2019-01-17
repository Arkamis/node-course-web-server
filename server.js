const express =  require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

app.engine('hbs', hbs.__express);
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, Url: ${req.url}`;
    console.log(req);

    fs.appendFile('server.log', log + '\n', err => {
        if(err)console.log('Unable to register the log');
        
        next();
    });
});

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About me',
        mrsName: 'Mike'
    });
});
app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
