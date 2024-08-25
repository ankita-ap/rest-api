const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());


app.post('/bfhl', (req, res) => {
    const { first_name, last_name, dob } = req.body;

    
    if (!first_name || !last_name || !dob) {
        return res.status(400).send({
            is_success: false,
            message: 'Please provide first_name, last_name, and dob in the request body.'
        });
    }

    
    const formatted_dob = dob.split('-').reverse().join(''); 
    const user_id = `${first_name.toLowerCase()}_${last_name.toLowerCase()}_${formatted_dob}`;

    
    res.status(200).send({
        is_success: true,
        user_id: user_id
    });
});


app.get('/bfhl', (req, res) => {
    res.status(200).send({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`It's alive on http://localhost:${PORT}`);
});
