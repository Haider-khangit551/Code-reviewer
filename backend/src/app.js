const express = require('express')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors');
const app = express();
const path = require('path')
const _dirname = path.resolve()

app.use(cors());
app.use(express.json());


    // app.get('/', (_, res) => {
    //     res.send("hello word")
    // })

app.use('/ai', aiRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
    // app.get('*', (_, res)=>{
    //     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
    // })

 
  


module.exports = app


// import express from 'express';
// const router = express.Router();

// router.get('/test', (req, res) => {
//     res.send('test');
// });

// export default router;
