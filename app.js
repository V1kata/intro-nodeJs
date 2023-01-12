const http = require('http');
const cats = require('./data.json');
const homepage = require('./src/homepage');
const style = require('./src/style.css');
const edit = require('./src/editpage');

const server = http.createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    const id = url.split('/')[2];

    switch (url) {
        case '/': 
            res.write(homepage);
        break;

        case `/edit/${id}`:
            const cat = cats.find(el => el.id == Number(id));
            res.write(edit(cat));
        break;

        case '/style.css':
            res.writeHead(200, {
                'Content-type': 'text/css'
            });

            res.write(style);
        break;

        default: 
            res.write('<h1>Not Found 404</h1>');
        break; 
    }
    res.end();
});

server.listen(5000);

console.log('Server is running on port 5000...');