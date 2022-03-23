const express=require("express");
const mongoose=require("mongoose");
const app=express();

const connect=()=>{

    return mongoose.connect(
    "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority"
    );
};
const bookSchema= new mongoose.Schema({
    bookName:{type:String,required:true},
    body:{type:String,required:true},
})
const book=mongoose.model("book",bookSchema);

const authorSchema= new mongoose.Schema(
    {
firstName:{type:String,required:true},
lastName:{type:String,required:true}
    },
    {
        versionKey: false,
        timestamps: true,
    },
)
const Schema= new mongoose.Schema(
    {
firstName:{type:String,required:true},
lastName:{type:String,required:true}
    },
    {
        versionKey: false,
        timestamps: true,
    },
)
const author=mongoose.model("author",authorSchema);

app.get("/book",async(req,res)=>{

    try {
        const book=await book.find().lean().exec();
        return res.status(201).send({book:book})
        
    } catch (error) {
        return res.status(501).send({message:"worng"})
        
    }
})


app.get("/author",async(req,res)=>{

    try {
        const author=await author.find().lean().exec();
        return res.status(200).send({author:author})
        
    } catch (error) {
        return res.status(500).send({message:"worng"})
        
    }
})
app.post("/author",async(req,res)=>{

    try {
        const author=await author.findofOne().lean().exec();
        return res.status(202).send({author:author})
        
    } catch (error) {
        return res.status(502).send({message:"worng"})
        
    }
})


app.listen(9989,async()=>{
    try {
        await connect();
        
    } catch (error) {
        console.log(error)
    }
    console.log("listening on port 9989")
});