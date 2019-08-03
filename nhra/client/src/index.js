"use strict";

//const user = require("./user.js");
const nhra = require("./nhra.js");
// const gdt = require("./gdt.js");
// const insurance = require("./insurance.js");
// const dealer = require("./dealer.js")
 const wallet_store = require("./common/create_wallet.js");

module.exports = function(app) {



app.post("/enroll_user",async (req,res)=>{
    user.enrollUser(req,res);
})

app.post("/request_new_licence",async(req,res)=>{
    console.log("request_new_licence called!");
   let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
    nhra.requestNewLicence(req,res,wallet_data);
});

app.get("/get_all_requested_licence",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.requestdAllLicence(req,res,wallet_data);
})

app.get("/get_all_rejected_licence",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.rejectedAllLicence(req,res,wallet_data);
})

app.get("/get_all_approved_licence",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.approvedAllLicence(req,res,wallet_data);
})

app.post("/approve_licence",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.approveLicence(req,res,wallet_data);
});

app.post("/reject_licence",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.rejectLicence(req,res,wallet_data);
});


app.post("/get_my_license",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.viewMyLicence(req,res,wallet_data);
});


app.post("/search_license",async(req,res)=>{
    let wallet_data = await wallet_store.store_wallet(req);
   if(wallet_data==-1)
   {
       res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
       return;
   }
   nhra.queryLicence(req,res,wallet_data);
});

// app.post("/owner_transfer",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    manufacturer.owner_transfer(req,res,wallet_data)
// })

// app.post("/add_vehicle_number",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }

//    gdt.addVehicleNumber(req,res,wallet_data);

// })

// app.post("/add_vehicle_policy",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }

//    insurance.addVehiclePolicy(req,res,wallet_data);
// });

// app.get("/get_vehicle_history",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }

//    manufacturer.traveseHistory(req,res,wallet_data);
// })


// app.post("/request_for_plate_number",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    console.log("Request for plate number called");
//      dealer.request_for_plate_number(req,res,wallet_data);
// })


// app.post("/request_for_policy_number",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    dealer.request_for_policy_number(req,res,wallet_data);
// })



// app.post("/reject_policy_number",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    insurance.rejectNewPolicyRequest(req,res,wallet_data);
// })

// app.post("/reject_plate_number",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    gdt.rejectNewPlateNumberRequest(req,res,wallet_data);
// });


// app.get("/get_all_plate_requests",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    gdt.viewAllGdtRequests(req,res,wallet_data);
// });


// app.get("/get_all_policy_requests",async(req,res)=>{
//     let wallet_data = await wallet_store.store_wallet(req);
//    if(wallet_data==-1)
//    {
//        res.json({status:"false","data":"",msg:"Error in user certificates or private key"})
//        return;
//    }
//    insurance.viewInsuranceRequest(req,res,wallet_data);
// });



}






