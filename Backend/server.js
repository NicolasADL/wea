require("dotenv").config();
const express = require("express");
const cors=require("cors")

const app = express();

const routerRegistro= require("./routes/routerRegistro");


app.use(cors())
app.use(express.json());
app.use("/registro",routerRegistro);
app.use("/auth",require("./routes/routerAuth"))

const port= process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Sv is up in port',port);
});
