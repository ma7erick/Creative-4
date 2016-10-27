var express = require('express');
var fs = require('fs');
var router = express.Router();
//\/\/\/\/\/
//var request = require("request");
//^^^^^^^

/* GET home page. */
router.get('/', function(req, res, next) {
	res.sendFile('workouts.htm', { root:  'public' });


});
//\/\/\/\/
/*router.get('/getdefinition', function(req, res) {
var url = "https//owlbot/" + req.query.q + "?/format=sol";

request(url).pipe(res);

});*/
//^^^^

router.get('/getcity',function(req,res,next) {
	console.log("In getcity route");

fs.readFile(__dirname + '/workouts.json',function(err,data) //might need to change here
{ 

	// var myRe = new RegExp("^" + req.query.q);
	var quer = req.query.q;

	if(err) throw err; 

	var JSONobj = JSON.parse(data);
	var WorkoutGuideObject = JSONobj.WorkoutGuide;
	var workoutsListObject = WorkoutGuideObject.workouts;
	var jsonresult = [];

	console.log("checking For loop...");
	if (quer != "") {
		for(var key in workoutsListObject)
		{
			if(workoutsListObject.hasOwnProperty(key))
			{
				var stringObjName = "" + workoutsListObject[key].name;
				var stringObjMuscle = "" + workoutsListObject[key].muscle;
				console.log("checking " + stringObjName + "...");
				console.log("checking " + stringObjMuscle + "...");
			// if(stringObjName.search(myRe) != -1)
			// {
			// 	jsonresult.push(workoutsListObject[key]);
			// 	console.log("Matched " + stringObjName + "!");
			// }
			if(stringObjName.toLowerCase().includes(quer.toLowerCase()))
			{
				jsonresult.push(workoutsListObject[key]);
				console.log("Matched " + stringObjName + "!");
			}
			else if(stringObjMuscle.toLowerCase().includes(quer.toLowerCase()))
			{
				jsonresult.push(workoutsListObject[key]);
				console.log("Matched " + stringObjMuscle + "!");
			}

		}
	}}
	

	console.log(jsonresult);
	res.status(200).json(jsonresult);

}); 

});
module.exports = router;