import express from "express";
import fetch from "node-fetch";
import cors from 'cors'
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome");
})
app.post("/api/recognize", async (req, res) => {
  try {
    console.log("Inside api");
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + "AIzaSyDGhTE6_7me2Fs_X4SkSjaLnMUTGQROuF8",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001,()=>console.log("Server is listening at 3001"));