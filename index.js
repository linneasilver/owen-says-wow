import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

/* Homepage */
app.get('/', async (req, res) => {
  res.render('index.ejs');
});

/* Gets random wow */
app.post('/random', async (req, res) => {
  try {
    const result = await axios.get ('https://owen-wilson-wow-api.onrender.com/wows/random')
    const data = result.data[0];
    res.render('random.ejs', { movie: data });
  } catch (error) {
    console.error('Error fetching random movie:', error);
    res.status(500).send('Internal Eerver Error')
  }
});

/* Gets random wow from specific director */
app.post('/director', async (req, res) => {
  const chosenDirector = req.body.director
  try {
    const result = await axios.get (`https://owen-wilson-wow-api.onrender.com/wows/random?director=${chosenDirector}`)
    const data = result.data[0];
    res.render('random.ejs', { movie: data });
  } catch (error) {
    console.error('Error fetching random movie:', error);
    res.status(500).send('Internal Server Error')
  }
});

/* Gets random wow from specific movie */
app.post('/movie', async (req, res) => {
  const chosenMovie = req.body.movie
  try {
    const result = await axios.get (`https://owen-wilson-wow-api.onrender.com/wows/random?movie=${chosenMovie}`)
    const data = result.data[0];
    res.render('random.ejs', { movie: data });
  } catch (error) {
    console.error('Error fetching random movie:', error);
    res.status(500).send('Internal Server Error')
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});