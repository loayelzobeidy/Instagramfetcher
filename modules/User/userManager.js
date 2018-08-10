import  {V1} from 'instagram-private-api';
var _ = require('lodash');
const fs = require('fs');
var Promise = require('bluebird');
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
const json2csv = require('json2csv').parse;
const Json2csvTransform = require('json2csv').Transform;

async function getInstagramData(req,res){
const device = new V1.Device(req.body.username);
const storage = new V1.CookieFileStorage('./storage/'+req.body.username+'.json');
const session = await V1.Session.create(device, storage,req.body.username,req.body.password)

           var feed = new V1.Feed.AccountFollowers(session,req.body.id);
           var i = 0;
           var max = 70; 
let results =await Promise.mapSeries(_.range(0, max), () =>{
    process.stdout.clearLine();  // clear current text
  process.stdout.cursorTo(0);  // move cursor to beginning of line

    i = (i + 1)
    process.stdout.write("loading   " + i+'/'+max);  
    return feed.get();
})


     let contacts = _.flatten(results)
 
     var paramss = []
     var params = _.map(contacts, function(contact) {
     paramss.push(contact._params)
    });
   
    const content = JSON.stringify(paramss);
    fs.writeFile("./storage/followers.json", content, 'utf8',  (err)=> {
        if (err) {
            return console.log(err);
        }
    
    console.log("The file was saved!");
        
    const Json2csvParser = require('json2csv').Parser;
    const fields = ['pk', 'username', 'fullName','isPrivate','profilePicUrl','profilePicId','isVerified','hasAnonymousProfilePicture','reelAutoArchive','reelAutoArchive','picture','id'];
    const opts = { fields };
    const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };
     
    const input = fs.createReadStream('./storage/followers.json', { encoding: 'utf8' });
    const output = fs.createWriteStream('./storage/followers.csv', { encoding: 'utf8' });
    const json2csv = new Json2csvTransform(opts, transformOpts);
     
    const processor = input.pipe(json2csv).pipe(output);
     
    
    console.log("csvvvv doneeee!!!!")
    res.json({message:"csv doneee!!"})
    });    

}
module.exports = {
    getInstagramData
  }