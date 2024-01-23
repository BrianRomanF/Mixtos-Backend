import UserModel from "../models/user.js";


const createUser = async (req, res) => {
  try {
    // Extract user data from the request body, including the password
    const { userId, password, firstName, gender, lastName, email, phone, accountType } =
      req.body;

    // Check if user with the provided userId already exists
    const existingUser = await UserModel.findOne({ userId });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this userId already exists" });
    }

    // Hash the password before creating the new user
   // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = await UserModel.create({
      userId,
      password,
      firstName,
      lastName,
      gender,
      email,
      phone,
      accountType,
    });

    // Send response
    res.status(200).json({
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { userId, password } = req.body;

    // Find the user in the database by userId
    const user = await UserModel.findOne({ userId });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid userId " });
    }

    // Use the custom isValidPassword method for password validation
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Password is valid, user is authenticated
    // You can generate a token or perform additional actions here

    res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        accountType: user.accountType,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser, loginUser };
