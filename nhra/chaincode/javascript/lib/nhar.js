/*
 * Lordshire: ChainCodeNode NHAR-1.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const query = require("./query.js");
class Nhar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
       
        console.info('============= END : Initialize Ledger ===========');
    }

    async requestForNewLicenceHcp(ctx, bmleKey, message, name, email, gender,userKey) //done
    {
       
        const bmle = {
            bmleKey,
            message,
            name,
            email,
            gender,
            userKey,
            status: "REQUESTED"
        };
        try {
            await ctx.stub.putState(bmleKey, Buffer.from(JSON.stringify(bmle)));
            let resultObj = {};
            resultObj.status = true;
            resultObj.data = {};
            resultObj.msg = "New Request is successfully send to NHAR";
            return resultObj;
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj;
        }  
    }

    async approveLicence(ctx, bmleKey, message)
    {
        try {
            const licenceAsBytes = await ctx.stub.getState(bmleKey); // get the licence from chaincode state
            if (!licenceAsBytes || licenceAsBytes.length === 0) {
                throw new Error(`${bmleKey} does not exist`);
            }
            const licence = JSON.parse(licenceAsBytes.toString());
            licence.status = "ACCEPTED";
            licence.message = message;
    
            await ctx.stub.putState(bmleKey, Buffer.from(JSON.stringify(licence)));
            let resultObj = {};
            resultObj.status = true;
            resultObj.data = {};
            resultObj.msg = "Licence have successfully accpted.";
            return resultObj;
            console.info('============= END : APPROVED LICENCE ===========');

        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj;
            
        }  
    }

    async requestdAllLicence(ctx) //done
    {
        try {
            let queryString = {};
            queryString.selector = {
                "status":"REQUESTED"
              };
              let allResults = await query.runQuery(ctx,queryString);
    
              let returnObj = {}
             returnObj.status = "true";
             returnObj.data = allResults;
             
            return returnObj;  
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj;
        } 
    }

    async rejectLicence(ctx, bmleKey, message) //done
    {
        try {
            const licenceAsBytes = await ctx.stub.getState(bmleKey); // get the licence from chaincode state
            if (!licenceAsBytes || licenceAsBytes.length === 0) {
                throw new Error(`${bmleKey} does not exist`);
            }
            const licence = JSON.parse(licenceAsBytes.toString());
            licence.status = "REJECTED";
            licence.message = message;
    
            await ctx.stub.putState(bmleKey, Buffer.from(JSON.stringify(licence)));
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj;
        }  
    }

    async rejectedAllLicence(ctx) //done
    {
        try {
            let queryString = {};
        queryString.selector = {
            "status":"REJECTED"
          };
          let allResults = await query.runQuery(ctx,queryString);
          let returnObj = {}
         returnObj.status = "true";
         returnObj.data = allResults;
        return returnObj;
        } catch (error) {
             let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj;
        } 
    }

    async approvedAllLicence(ctx, bmleKey)
    {
        try {
            let queryString = {};
            queryString.selector = {
                "status":"ACCEPTED"
              };
              let allResults = await query.runQuery(ctx,queryString);
    
              let returnObj = {}
             returnObj.status = "true";
             returnObj.data = allResults;
             
            return returnObj;
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj; 
        }  
    }

    async viewMyLicence(ctx, userKey)
    {
        try {
            let queryString = {};
        queryString.selector = {
            "userKey":userKey
          };
          let allResults = await query.runQuery(ctx,queryString);

          let returnObj = {}
         returnObj.status = "true";
         returnObj.data = allResults;
         
        return returnObj;
        console.info('============= END : Licence ==========='); 
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj; 
        }
       
    }

    async queryLicence(ctx, bmleKey) {
        try {
              let allResults = await query.traverseHistory(ctx,bmleKey);
              let returnObj = {}
             returnObj.status = "true";
             returnObj.data = allResults;
             
            return returnObj;
        } catch (error) {
            let resultObj = {};
            resultObj.status = false;
            resultObj.data = {};
            resultObj.msg = "Something went wrong ! error: "+error;
            return resultObj; 
        }  
    }
}

module.exports = Nhar;
