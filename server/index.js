const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db')

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT NOW() as now', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(`Connected to postgres at time ${res.rows[0].now}`)
    }
  })
})