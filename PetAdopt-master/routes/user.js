var mysql = require('./mysql');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};
exports.list2=function(req,res){
	res.render('success');
};

exports.list1 = function(req, res){
	var username = req.param("username");
	var pwd = req.param("password");
	console.log(username);
		var myquery = "insert into hello values('"+username+"','"+pwd+"')";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				res.render('success');
				}
			
		},myquery);
		

		
//	if(username === "ankit" && pwd === "gupta")
//		{
//			res.render('success');
//		}
//	else
//		{
//			res.render('fail');
//		}
//	  res.send("respond with a resource");
	};