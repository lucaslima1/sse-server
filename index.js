const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3002;

const corsOptions = {
    origin: "http://localhost:3000",
}

app.get('/api/sse', cors(corsOptions), (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });


    let i = 0;

    setInterval(() => {
        const data = {
            message: 'Listening from /api/sse',
            status: 'PENDING_REGISTRATION',
        }
        i++;

        if (i >= 10) {
            data.status = 'REGISTRATION_CONFIRMED';
        }

        if (i === 50) {
            res.end()
        }



        console.log('sent in /api/sse:', data);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);

});

app.get('/api/sse/payment', cors(corsOptions), (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });

    let i = 0;

    setInterval(() => {
        const data = {
            message: 'Listening from /api/sse/payment',
            status: 'REGISTRATION_CONFIRMED',
        }

        i++;

        if (i >= 5) {
            data.status = 'AWAITING_PAYMENT';
        }
        
        if (i >= 20) {
            data.status = 'PAYMENT_CONFIRMED';
        }

        if (i >= 25) {
            data.status = 'PAYMENT_UNAUTHORIZED';
        }


        console.log('sent in /api/sse/payment:', data);
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    }, 1000);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});