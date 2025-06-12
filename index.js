import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const client= new PrismaClient();

app.use(express.json());

app.get("/", (req,res)=>{
    console.group("i am testing")
})
 
//Get all tasks
app.get("/Tasks", async (req, res) => {
  try {
    const tasks_note = await client.Tasks.findMany({
        where:{
            isDeleted:false
        }
    });
    res.status(200).json(tasks_note);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later." });
  }
});

//Get the specific task by id
app.get("/Tasks/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await client.Tasks.findUnique({
            where:{
                id:(id)
            }
           
        });

        if(task){
            return res.json(task)
           }
           else{
            return res.status(403).json({messege:"There was authorization issue:Try again later"})
           }
    }
    catch(e){
        res.status(500).json({messege:"Something went wrong"})
    }
});

//create new tasks
app.post("/Tasks",async(req,res)=>{
    try{
        const {title,description,isCompleted}=req.body
        const task_data=await client.Tasks.create({
            data:{
                title,
                description,
                isCompleted,
                isDeleted:false
            }
           
        })
         res.status(201).json(task_data);
       
    }
     catch(e){
            res.status(500).json({messege:"Something was wrong"});
        }
})

//update tasks
app.put("/Tasks/:id",(req,res)=>{
    try{
        const {title,description,isCompleted}=req.body
        const {id}=req.params
        const update_task=client.Tasks.update({
            where:{
                id:(id)
            },
            data:{
                title:title && title,
                description:description && description,
                isCompleted:isCompleted && isCompleted
            }
        })
        res.json(update_task)
    }
    catch(e){
        res.status(500).json({messege:"Something went wrong"})
    }
})

//delete data

app.delete("/Tasks/:id",async (req,res)=>{
    try{
        const {id}= req.params
        const deleted_data=await client.Tasks.update({
            where:{
                id
            },
            data:{
                isDeleted:true
            }
        })
    
        if(deleted_data){
            res.status(200).json({messege:"Success deletion"})
        }}
        catch(e){
         res.status(500).json({error:"there was an error deleting data"})
        }
    
})


const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`I am listening at port ${port} server`);
});
