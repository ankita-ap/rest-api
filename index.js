const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

const findHighestLowercase = (arr) => {
    const lowercaseAlphabets = arr.filter(char => char >= 'a' && char <= 'z');
    return lowercaseAlphabets.sort().reverse()[0] || null;
};

app.get('/bfhl', (req, res) => {
    res.status(200).send({
        operation_code: 1
    });
});

app.post('/bfhl', (req, res) => {
    const { user_id, college_email_id, college_roll_number, input_array } = req.body;

    if (!user_id || !college_email_id || !college_roll_number || !input_array) {
        return res.status(400).send({ 
            message: 'Please provide user_id, college_email_id, college_roll_number, and input_array in the request body.'
        });
    }

    const [firstName, lastName, dob] = user_id.split('_');
    
    if (!dob || dob.length !== 8) {
        return res.status(400).send({ 
            message: 'user_id should be in the format first_name_last_name_ddmmyyyy.'
        });
    }
    
    const numbersArray = input_array.filter(item => typeof item === 'number');
    const alphabetsArray = input_array.filter(item => typeof item === 'string' && /^[a-zA-Z]$/.test(item));
    const highestLowercaseAlphabet = findHighestLowercase(alphabetsArray);

    res.status(200).send({
        status: 'Success',
        user_id: `${firstName}_${lastName}_${dob}`,
        college_email_id: college_email_id,
        college_roll_number: college_roll_number,
        numbers: numbersArray,
        alphabets: alphabetsArray,
        highest_lowercase: highestLowercaseAlphabet
    });
});

app.listen(
    PORT,
    () => console.log(`It's alive on http://localhost:${PORT}`)
);
