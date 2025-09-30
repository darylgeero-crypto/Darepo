const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config();

const beatsRouter = require('./routes/beats');

const app = express();
app.use(cors());
app.use(express.json());

const outputDir = path.join(__dirname, 'outputs');
fs.ensureDirSync(outputDir); // create outputs folder if missing

app.use('/api/beats', beatsRouter);

app.get('/', (req, res) => {
  res.send('DJ AI Backend is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
