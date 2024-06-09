// initiate payment

app.use(express.urlencoded())
const { default: axios } = require('axios'); 

// if success hit the backend and check otherthings 
// if wrong goto fronted page

app.post('/sslComerece',async(req,res)=>{
  const user = req.body 
  const tranId = new ObjectId().toString()
  const initiatedata = {
    store_id:"abcco66659d6617872",
    store_passwd:"abcco66659d6617872@ssl",
    total_amount:100,
    currency:"BDT",
    tran_id:tranId,
    success_url:"http://localhost:5000/success-payment",
    fail_url:"http://localhost:5173/failure",
    cancel_url:"http://yoursite.com/cancel.php&",
    cus_name:"Customer Name",
    cus_email:"cust@yahoo.com&",
    cus_add1:"Dhaka",
    cus_add2:"Dhaka",
    cus_city:"Dhaka",
    cus_state:"Dhaka",
    cus_postcode:"1000",
    cus_country:"Bangladesh",
    cus_phone:"01711111111",
    cus_fax:"01711111111",
    shipping_method:"NO",
    product_name:"Laptop",
    product_category:"Laptop",
    product_profile:"general",
    multi_card_name:"mastercard,visacard,amexcard",
    value_a:"ref001_A",
    value_b:"ref002_B",
    value_c:"ref003_C",
    value_d:"ref004_D"
  }
    
const response = await axios({
  method:"POST",
  url:"https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
  data:initiatedata,
  headers:{
    "Content-Type":"application/x-www-form-urlencoded",
  },
})

const saveData = {
   paymnetId:tranId,
   amount:200,
   status:"pending"
}

const save = await paymentCollection.insertOne(saveData)

if(save){
  res.send({
    paymentUrl:response.data.GatewayPageURL,
  })

}
})

app.post('/success-payment',async(req,res)=>{
   const successData = req.body 
   if(successData.status !== "VALID"){
    throw new Error("unauthorized,payment","invalid payment")
   }
  //  update the database 
  const query = {
    paymnetId: successData.tran_id
  }
  const update = {
     $set:{
       status:"success",
     }
  }
  res.redirect('http://localhost:5173/success')
    })


// 