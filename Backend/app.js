const express= require("express");
const app=express();
require("dotenv").config();
require("./conn/conn");
const cors=require("cors");
const user=require("./routes/user");
const book=require("./routes/book");
const favourites=require("./routes/favourites");
const cart=require("./routes/cart");
const order=require("./routes/order");

app.use(express.json());
app.use(cors());

//routes

app.use("/api/v1",user);
app.use("/api/v1",book);
app.use("/api/v1",favourites);
app.use("/api/v1",cart);
app.use("/api/v1",order);

app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});

