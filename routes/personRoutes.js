const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/' , async (req , res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);  
        const savedPerson = await newPerson.save(); 
        console.log('Data Saved');
        res.status(200).json(savedPerson);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }

})

router.get('/' , async (req , res)=>{
    try{
          const data = await Person.find();
          console.log("Data Fetched !!!");
          res.status(200).json(data);
    }catch(err){
          console.log(err)
          res.status(500).json({error : 'Internal Server error'});
    }
})

router.get('/:workType' , async (req , res)=>{

    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error : 'Invalid Work Type'});
        }
    } 
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})

router.put('/:id' , async (req , res)=>{
    try{
       
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId , updatedPersonData , {
             new : true , 
             runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'Person not Found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id' , async (req , res)=>{

    try{
            const personId = req.params.id;
            const response = await Person.findByIdAndDelete(personId);
            if(!response){
                return res.status(404).json({error:"Person not found"});
            }

            console.log('data deleted Successfully');
            res.status(200).json({message:'person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }

})



module.exports = router;