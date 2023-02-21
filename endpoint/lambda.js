const AWS = require('aws-sdk');
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
//==============================================================
exports.handler = async (event,context) => {
  //==============================================================
  let s3file = {
    Bucket: 'bridgepage-content',
    Key: 'index.html'
  };
  let _replaceData = '';
  let _replaceTitle = 'SERVER_URL';
  let lambdaResponse;
  //==============================================================
  try {
    //==============================================================
    console.log(event);
    console.log(context);
    //==============================================================
    const sendResponse = function(param){
      //==============================================================
      let response = {};
      response.body = JSON.stringify({});
      if(param.headers) response.headers = param.headers;
      if(param.result&&param.result.body) response.body = JSON.stringify(param.result.body);
      if(param.result&&param.result.file) response.body = param.result.file;
      if(param.option&&param.option.Return&&param.option.Return.Type=='ReturnTypeBodyOnly')
      {
        response = param.result.body;
      }
      if(event.Records){
        response.status = 200;
      }
      if(param.err) param.promise.reject(param.err);
      else param.promise.resolve(response);
    };
    //==============================================================
    // html page requst
    //==============================================================
    lambdaResponse = await new Promise((resolve,reject) => {
      let _headers = {
        'Content-Type':'text/html',
        'Content-Encoding':'UTF-8',
      };
      if(event.Records){
        _headers = {
          'content-type':[{key:'Content-Type',value:'text/html'}],
          'content-encoding':[{key:'Content-Encoding',value:'UTF-8'}],
        };
      }
      //==============================================================
      if(
        (event.path)
        &&(event.path!=='/')
        &&(!event.multiValueQueryStringParameters)
      )
      {
        s3.getObject(s3file, function(err, fileData) {
          if (err) console.log(err);
          dynamoDBClient.get({
            TableName: 'bridgepage-content',
            Key: {pageId: event.path.replace('/','')}
          },(err,output) => {
            if(err) console.log(err);
            // console.log(output);
            if(output.Item) {
              // _replaceData = safeString(JSON.stringify(output.Item.html));
              if(output.Item.html.p) _replaceData = output.Item.html.p;
              if(output.Item.html.title) _replaceTitle = output.Item.html.title;
              if(event.headers['CloudFront-Is-Mobile-Viewer']==='true') _replaceData = output.Item.html.m;
            }
            sendResponse({
              promise: {resolve: resolve, reject: reject},
              headers: _headers,
              result: {file: fileData.Body.toString('ascii').replace('LANDINGPAGEDATA', _replaceData)},
              err:err
            });
          });
        });
      }
      else
      {
        s3.getObject(s3file, function(err, fileData) {
          if (err) console.log(err);
          sendResponse({
            promise: {resolve: resolve, reject: reject},
            headers: _headers,
            result: {file: fileData.Body.toString('ascii').replace('LANDINGPAGEDATA', _replaceData)},
            err:err
          });
        });
      }
      //==============================================================
    });
    //==============================================================
  }
  catch (err) {
    console.log(err);
    return err;
  }
  return lambdaResponse;
};