import express from 'express';
import {config as dotenvConfig} from 'dotenv'

dotenvConfig();
const app = express();
const PORT = process.env.PORT || 2100;

app.use(express.json());

app.get('/', (req, res)=> {
    res.status(200).send("Hello World")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})