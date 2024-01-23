import MatchModel from "../models/match.js";


const createMatch = async (req, res) => {
  try {
    // Extract user data from the request body, including the password
    const { date, time, place, price } =
      req.body;

    // Check if user with the provided userId already exists
    const existingMatch = await MatchModel.findOne({ date });

    if (existingMatch) {
      return res
        .status(400)
        .json({ error: "You already have a match that day!" });
    }


    // Create a new match
    const newMatch = await MatchModel.create({
      date,
      time,
      place,
      price
    });

    // Send response
    res.status(200).json({
      match: newMatch,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export { createMatch };
