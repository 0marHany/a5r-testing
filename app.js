const express = require('express');
const mongoose = require('mongoose')
const {
    userRouter,
    // TestRunRouter,
    speedRouter,
    //     websiteRouter,
    linkRouter
} = require('./router/allRouter');
const app = express();
const cors = require('cors');
require("dotenv").config();
const { createPdf } = require('./common/CreatePDF');
const speedsModel = require('./model/speeds.model');

app.use(express.json())
app.use(cors({ origin: '*' }))

// createTables()
app.use(
    userRouter,
    // TestRunRouter,
    speedRouter,
    //     websiteRouter,
    linkRouter
)

app.get('/generatePdf', async (req, res) => {
    const invoice = await speedsModel.findOne({}, {}, { sort: { 'createdAt': -1 } });
    console.log(invoice);
    createPdf(invoice, "Test.pdf");
    res.end();
})

mongoose.connect(process.env.MONGOO_CONNECTION);
app.listen(process.env.PORT || 5000)