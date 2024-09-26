const router = require('express').Router();
const { json } = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const List = require('../models/list');
const User = require('../models/user')

router.post("/addtodo", authMiddleware, async (req, res) => {
   try {
      const user = req.user;
      const title = req.body.title;
      const description = req.body.description;
      const list = new List({ title, description, user });
      await list.save().then(() => res.status(200).json(({ list })));
      user.list.push(list)
      await user.save();
   } catch (error) {
      console.log(error)
   }
})

router.put('/updatetodo/:id', async(req, res) =>{
   try {
      const title = req.body.title;
      const description = req.body.description;
      const list = await List.findByIdAndUpdate(req.params.id, {title, description})
      list.save().then(()=>res.status(200).json({message: "Todo Updated"}))
   } catch (error) {
      res.status(400).json({
         message: "Error updating todo"
      })
   }
})

router.delete('/deletetodo/:id', authMiddleware ,async(req, res)=>{
   try {
      const user = req.user;
      await User.findOneAndUpdate(user._id, {$pull: {list: req.params.id}})
      await List.findByIdAndDelete(req.params.id).then(()=>{
         res.status(200).json({message: "Todo deleted"})
      })
   } catch (error) {
      console.log(error)
   }
})

router.get('/gettodo/:id', async(req, res)=>{
   try {
      const list = await List.find({user: req.params.id}).sort({createdAt: -1})
      if (list.length !==0) {
         res.status(200).json({list: list})
      }else{
         res.status(200).json({message: 'No task'})
      }
   } catch (error) {
      console.log(error)
   }
})

module.exports = router;