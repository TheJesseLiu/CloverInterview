const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
var cors = require('cors');
app.use(cors());
var item_set= {
	0:{amount:20},
	1:{amount:40},
}

//localhost:3000/item/{item_id}/
app.get('/item/:item_id/',function(req, res, next) {
    let item_id = req.params.item_id;
    console.log(item_set);
    returnItem = {
    				"item_id":"0",
    				"amount":"20"
    			};
    res.send(returnItem);

});

//localhost:3000/item/{item_id}/
app.put('/item/:item_id/',function(req, res, next) {
    let item_id = req.params[0];
    console.log(req.body);
    res.send();

});

//localhost:3000/item/{item_id}/
app.delete('/item/:item_id/',function(req, res, next) {
    let item_id = req.params.item_id;
   	if(item_set[item_id]===undefined){
   		res.status(400).send("err msg");
   	}
   	else{
	    delete item_set[item_id];
	    res.send();   		
   	}

});

function createID(email){
    let hash = 5381;
    for (i = 0; i < email.length; i++) {
        let char = email.charCodeAt(i);
        hash = Math.abs(((hash << 5) + hash) + char); /* hash * 33 + c */
    }
    return hash.toString();
}
//localhost:3000/item/
app.post('/item/',function(req, res, next) {

    let amt = req.body.amount;
    console.log(req.body);
    let item_id = createID(amt);
    item_set[item_id] = req.body;
    res.setHeader('content-type', 'text/javascript');
    res.send(JSON.stringify({"item_id":item_id, "amount":amt}));

});

//localhost:3000/item/
app.get('/item/',function(req, res, next) {
    res.send(item_set);

});

app.listen(3000, () => console.log('Example app listening on port 3000!'))



