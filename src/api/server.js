

console.log('hello world again')

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*',
}))

app.post('/create-checkout-session', (req, res) => {
    console.log('HELLO WORLD')
    res.status(200).send({
        msg: 'HELLO WORLD',
        msg2: 'AGAIN'
    })
    
})

// app.get('/ingredients', (req, res) =>{
//     res.send(ingredients);
// });


const PORT = 4242;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
