const express = require('express');
const router = express.Router();
const openai = require('../utils/openaiClient');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const path = require('path');

const outputDir = path.join(__dirname, '../outputs');

router.post('/generate', async (req, res) => {
  try {
    const { genre = "HipHop", tempo = 90 } = req.body;

    // call OpenAI to generate a beat (simulated with text for now)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI music producer." },
        { role: "user", content: `Generate a ${tempo} BPM ${genre} beat.` }
      ],
      temperature: 0.7,
    });

    const textOutput = response.choices[0].message.content;

    // Save a dummy audio file placeholder
    const filename = `beat-${uuidv4()}.txt`;
    const filePath = path.join(outputDir, filename);
    fs.writeFileSync(filePath, textOutput);

    res.json({ message: "Beat generated!", file: filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate beat" });
  }
});

module.exports = router;
