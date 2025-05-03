import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://local:27017/myfirstdatabase", {
    useNewUrlParser: true,
    useUnfiedToplogy: true,
});


const itemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
});
 const Item = mongoose.model("Item", itemSchema);

app.get('/items', async(requestAnimationFrame,res) => {
    const items = await Item.find();
    res.json(items);
});

app.post("/items",async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});

app.put("/items/:id", async (req,res) => {
const {id} = req.params;
const updatedData = req.body;
const updatedItem = await Item.findByIdAndUpdate(id, updatedData, {
new: true,
});
if (!updatedData) {
   return res.status(404). json({error: "item not found"});
}
res.json(updatedItem);
});

app.delete("/itmes/:id", async(req,res) => {
  const {id} = req.params;
  const deletedItem = await Item.findByIdAndDelete(id);
  if (!deletedItem) {
  return res.status(404).json({ error: "item not found"})
  }
  res.json({message: "item deleted", item: deletedItem});
});

app.listen(3000, () => 
console.log("server is running at http://localhost:3000")
);