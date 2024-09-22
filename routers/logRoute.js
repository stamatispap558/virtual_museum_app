const mongoose = require('mongoose')
const path = require('path');
const admin = require('../models/admin_model');
const router = require('express').Router();

router.post('/login', async (req, res) => {
    console.log('Admin login attempt');
    
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        // Find the admin by username (Email)
        const adminFind = await admin.findOne({ Email: username }).lean();
        
        if (!adminFind) {
            // Return a 401 with an appropriate JSON response if the user is not found
            return res.status(401).json({ success: false, message: 'Invalid username' });
        }

        // Check if the password matches
        if (password === adminFind.password) {
            console.log('Admin found');
            
            // Set session info if the login is successful
            req.session.loggedUserId = username; 
            
            // Send a JSON response indicating success with the redirect URL
            return res.status(200).json({ 
                success: true, 
                message: 'Login successful', 
                redirectUrl: '/intermediate.html' // This will be handled by the frontend
            });
        } else {
            // If password doesn't match, return a 401 with an error message
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        // In case of any unexpected error, return a 500 error with a message
        return res.status(500).json({ success: false, message: 'An error occurred, please try again later.' });
    }
})

.get('/logout',(req,res) =>{
    req.session.destroy();
    res.redirect('/html/login_prot.html');

})    


module.exports = router;