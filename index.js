import express from 'express';
import axios from 'axios';
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const port=6969;
const host='127.0.0.1';
app.get('/api/jokes/random', async (req, res) => {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = {
            setup: response.data.setup,
            punchline: response.data.punchline
        };
        res.json(joke);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random jokes");
    }
});
app.get('/api/images/random', async (req, res) => {
    try {
        const response = await axios.get('https://picsum.photos/200');
         res.json(response.request.res.responseUrl);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random images");
    }
});
app.get('/api/jokes-and-images/random', async (req, res) => {
    try {
    
        const jokeResponse = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = {
            setup: jokeResponse.data.setup,
            punchline: jokeResponse.data.punchline
        };

        const imageResponse = await axios.get('https://picsum.photos/200');
        
        res.json({
            joke: joke,
            image: `${imageResponse.request.res.responseUrl}`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error fetching random joke and image");
    }
});

app.listen(port,host,()=>console.log(`Server is running on http://${host}:${port}`));
