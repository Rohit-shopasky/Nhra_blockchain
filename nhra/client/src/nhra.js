const { FileSystemWallet, Gateway } = require('fabric-network')
const fs = require('fs')
const path = require('path')

const ccpPath = './connection.json'
const ccpJSON = fs.readFileSync(ccpPath, 'utf8')
const ccp = JSON.parse(ccpJSON)
const connection = require('./common/connect.js')

module.exports = {
  async requestNewLicence (req, res, wallet_data) {
    try {
      let { bmleKey,message,name,email,gender} = req.body
      let status ="REQUESTED";
      let contract = await connection.get_contract(wallet_data)
      let result = await contract.submitTransaction(
        'requestForNewLicenceHcp',
        bmleKey,message,name,email,gender,status
      )
      console.log('Transaction has been submitted ' + result)
    
      res.json({ status: true, data: '', msg: 'New licence requested' });
    } catch (error) {
      console.log('error in user identity')
      res.json({ status: false, data: '', msg: error })
    }
  },

  async requestdAllLicence (req, res, wallet_data) {
    let contract = await connection.get_contract(wallet_data);
    let result = await contract.evaluateTransaction('requestdAllLicence');
    result = JSON.parse(result);
    let respData = {};
    let data = result.data;
    if(data.length==0)
    {
      respData.status=true;
      respData.data="Empty";
      res.send(respData);
      return;
    }
    respData.data = await parse_json(result.data);
    respData.status = result.status;
    res.send(respData);
    return;
  },

  async rejectedAllLicence (req, res, wallet_data) {
    let contract = await connection.get_contract(wallet_data);
    let result = await contract.evaluateTransaction('rejectedAllLicence');
    result = JSON.parse(result);
    let respData = {};
    let data = result.data;
    if(data.length==0)
    {
      respData.status=true;
      respData.data="Empty";
      res.send(respData);
      return;
    }
    respData.data = await parse_json(result.data);
    respData.status = result.status;
    res.send(respData);
    return;
  },

  async approvedAllLicence (req, res, wallet_data) {
    let contract = await connection.get_contract(wallet_data);
    let result = await contract.evaluateTransaction('approvedAllLicence');
    result = JSON.parse(result);
    let respData = {};
    let data = result.data;
    if(data.length==0)
    {
      respData.status=true;
      respData.data="Empty";
      res.send(respData);
      return;
    }
    respData.data = await parse_json(result.data);
    respData.status = result.status;
    res.send(respData);
    return;
  },


  async approveLicence(req,res,wallet_data)
  {
    try {
      let { bmleKey,message} = req.body
      let status ="REQUESTED";
      let contract = await connection.get_contract(wallet_data)
      let result = await contract.submitTransaction(
        'approveLicence',
        bmleKey,message
      )
      console.log('Transaction has been submitted ' + result)
    
      res.json({ status: true, data: '', msg: 'Licence have successfully accpted.' });
    } catch (error) {
      console.log('error in user identity')
      res.json({ status: false, data: '', msg: error })
    }
  },


  async rejectLicence(req,res,wallet_data)
  {
    try {
      let { bmleKey,message} = req.body
      
      let contract = await connection.get_contract(wallet_data)
      let result = await contract.submitTransaction(
        'rejectLicence',
        bmleKey,message
      )
      console.log('Transaction has been submitted ' + result)
    
      res.json({ status: true, data: '', msg: 'Licence have successfully rejected.' });
    } catch (error) {
      console.log('error in user identity')
      res.json({ status: false, data: '', msg: error })
    }
  },

  async viewMyLicence (req, res, wallet_data) {
    try {
      let { userKey} = req.body
      let contract = await connection.get_contract(wallet_data)
      let result = await contract.submitTransaction(
        'viewMyLicence',
        userKey
      )
    result = JSON.parse(result);
    let respData = {};
    let data = result.data;
    if(data.length==0)
    {
      respData.status=true;
      respData.data="Empty";
      res.send(respData);
      return;
    }
    respData.data = await parse_json(result.data);
    respData.status = result.status;
    res.send(respData);
    return;
    } catch (error) {
      console.log('error in user identity')
      res.json({ status: false, data: '', msg: error })
    }
  },


  async queryLicence (req, res, wallet_data) {
    try {
      let { bmleKey} = req.body
      let contract = await connection.get_contract(wallet_data)
      let result = await contract.submitTransaction(
        'queryLicence',
        bmleKey
      )
    result = JSON.parse(result);
    let respData = {};
    let data = result.data;
    if(data.length==0)
    {
      respData.status=true;
      respData.data="Empty";
      res.send(respData);
      return;
    }
    respData.data = await parse_json(result.data);
    respData.status = result.status;
    res.send(respData);
    return;
    } catch (error) {
      console.log('error in user identity')
      res.json({ status: false, data: '', msg: error })
    }
  },

   

}


async function parse_json(data){

  var arr = new Array();
for(var i=0;i<data.length;i++)
{
  arr[i] = JSON.parse(data[i].value);
}

return arr;

}
