import http from 'http';

const REMOTE_URL_SERVER = '127.0.0.1';
const REMOTE_PORT = 3000;

// GET ------------------------------------------------------
if (false){
    const options = {
        hostname: REMOTE_URL_SERVER,
        port: REMOTE_PORT,
        path: '/page?param=123',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', (d) => {
            process.stdout.write(d)
        })
    });

    req.on('error', (error) => {
        console.error(error)
    });

    req.end();
}


// POST/PUT/DELETE ------------------------------------------------------


const data = JSON.stringify({
    todo: 'Buy the milk'
});

const options = {
    hostname: REMOTE_URL_SERVER,
    port: REMOTE_PORT,
    path: '/page',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};
const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', (d) => {
        process.stdout.write(d)
    })
});
req.on('error', (error) => {
    console.error(error)
});
req.write(data);// send
req.end();

