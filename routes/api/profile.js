import express from 'express';
import {auth} from '../../middleware/auth';
import {Profile} from '../../models/Profile';
import {User} from '../../models/User';
import {check,validationResult} from 'express-validator';

export const router = express.Router();

// @route   GET     api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'Profile not found'});
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
