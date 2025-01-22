const User =require("../Models/userModel");
const createUser = async (req, res)=>{
    const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Simulate user creation logic
  res.status(201).json({
    message: 'User created successfully',
    user: { username, email },
});
console.log(username, email, password)
}


const getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json({ users, message: "Users fetched successfully" });
      console.log(users, 'users')
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  };
  

const getUser = async(req,res)=>{
try {
    const {UserId} =params();
    const user =await User.findByPk(UserId);
    if(!user){
        res.status(404).json({message:"User not found"});
    } else{
        res.json(user)
    }
} catch (error) {
    res.status(500).json({message:"Error fetching user"});
}
}

const updateUser =async(req,res)=>{
    try {
        const {UserId}=params();
        const user =await User.findByPK(UserId);
        if(!user){
            res.status(404).json({message:"User not found"});
        } else{
           await user.update(req.body);
           res.json({user, message:"User updated successfully"})
        }
    } catch (error) {
        res.status(500).json({message:"Error updating user"});
    }
}

const deleteUser =async(req, res)=>{
    try {
        const {UserId}=Params();
        const user =await User.findByPK(UserId);
        if(!user){
            res.status(404).json({message:"User not found"});
        } else{
           await user.delete(req.body);
           res.json({user, message:"User deleted sucessfully"})
        }
    } catch (error) {
        res.status(500).json({message:"Error deleting user"});
    }
}

module.exports={deleteUser, getUser, createUser, updateUser, deleteUser, getUsers}
