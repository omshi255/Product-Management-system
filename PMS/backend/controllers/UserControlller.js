import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';


const UserController = {
  register: async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Registering user:', { name, email, password }); // Add this to debug

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    console.log("User registered successfully:", newUser);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error during registration.' });
  }
},
 login: async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }


     console.log("login succesfull");
     
    res.status(200).json({ message: 'Login successful!', user }); 
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
}
,
logout: async (req, res) => {
    res.status(200).json({ message: 'User logged out successfully.' });
}
}

export default UserController;