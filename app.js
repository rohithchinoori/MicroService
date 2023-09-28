const express = require("express");
const { validationResult, body } = require("express-validator");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Validation middleware
const validateUserProfile = [
  body("email").isEmail(),
  body("age").isInt({ min: 18, max: 45 }),
];

app.post("/submitProfileA", validateUserProfile, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userProfile = req.body;

  try {
    // Forward validated user profile to Service B
    const response = await axios.post(
      "http://localhost:3003/submitProfileB",
      userProfile
    );

    res.json({ userId: response.data.userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log(`Service A is running on port 3001`);
});
