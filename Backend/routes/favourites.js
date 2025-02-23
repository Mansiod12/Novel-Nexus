const router=require("express").Router();
const {authenticateToken}=require("./userAuth");
const User=require("../models/user");

router.put("/add-to-favourite",authenticateToken,async(req,res)=>{
    try{
     const {bookid,id}=req.headers;
     const userData=await User.findById(id);
     const isBookFavourite=userData.favourites.includes(bookid);
     if(isBookFavourite){
        return res.status(200).json({message:"Book is already in favourites"}); 
     }

     await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
     return res.status(200).json({message:"Book is added to favourites"}); 

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

router.put("/remove-book-from-favourite",authenticateToken,async(req,res)=>{
    try{
     const {bookid,id}=req.headers;
     const userData=await User.findById(id);
     const isBookFavourite=userData.favourites.includes(bookid);
     if(isBookFavourite){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
     }

     return res.status(200).json({message:"Book is removed from favourites"}); 

    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

router.get("/get-favourite-books",authenticateToken,async(req,res)=>{
    try{
     const {id}=req.headers;
     const userData=await User.findById(id).populate("favourites");
     const favouriteBoooks=userData.favourites;
    
     return res.status(200).json({status:"Success", data : favouriteBoooks,}); 

    }catch(error){
        res.status(500).json({message:"An error occured"});
    }
});

module.exports=router;