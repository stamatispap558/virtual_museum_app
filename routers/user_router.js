const User = require('../models/user_model')

const router = require('express').Router()

router.post('/signup', async (req, res) => {
  try {
    const { user_name, user_last,Email, dateofregistration,  phone } = req.body

    // validation
    if (!user_name || !user_last || !Email || !dateofregistration || !phone  )
      return res
        .status(400)
        .json({ errorMessage: 'Please enter all required fields.' })

  const existingUser = await User.findOne({ Email })
  if (existingUser)

    return res.status(400).json({
      errorMessage: 'An account with this email already exists.',

    })
const newUser = new User({
    user_name, user_last,Email, dateofregistration,  phone 
    })
const savedUser = await newUser.save()
return res.status(200).json({
    successMessage: 'User was created successfully',

  })
} catch (err) {
  console.error(err)
  res.status(500).send()
}
})



module.exports=router;