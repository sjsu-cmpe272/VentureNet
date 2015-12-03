var mysql = require('./mysql');

exports.ad_signup = function(req, res){
	var ad_email = req.param("ad_email");
	var ad_password = req.param("ad_password");
	var ad_fname = req.param("ad_fname");
	var ad_lname = req.param("ad_lname");
	var ad_contact = req.param("ad_contact");
	var ad_address = req.param("ad_address");
//	if (ad_email == null)
//		{
//			res.render('')
//		}
		var myquery = "select * from Adoptor where ad_emailid = '"+ad_email+"'";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				if (results.length>0)
					{
					res.send({"status":150});
					}
				else
					{
					var myquery = "insert into Adoptor values ('"+ad_email+"','"+ad_password+"','"+ad_fname+"','"+ad_lname+"','"+ad_contact+"','"+ad_address+"','AD')";
					mysql.fetchData(function(err,results){
					if(err)
						{
							throw err;
						}
					else
						{
							res.send({"status":200});
						}
					},myquery);
					}}
		},myquery);
		
		
	};
	
exports.checkLogin = function(req,res){
	console.log("checking session");
	if(req.session.type){
		console.log("session is " + req.session.name);
		console.log("mail of session is " + req.session.mail);
		res.send({"status":200,"name":req.session.name,"type":req.session.type,"mail":req.session.mail});
	}
}
exports.ad_signin = function(req, res){
	var email = req.param("email");
	var password = req.param("password");
		var myquery = "select * from Adoptor where ad_emailid = '"+email+"' and ad_password = '"+password+"'";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				console.log(results);
				if (results.length>0)
					{
					req.session.name=results[0].ad_fname;
					req.session.type=results[0].ad_type;
					req.session.mail=results[0].ad_emailid;
					res.send({"status":200,"name":results[0].ad_fname,"email":results[0].ad_emailid});
					}
				else
					{
					console.log("Invalid details");
					res.send({"value1":"Invalid Email Id or Password"});
					}
				}
			
		},myquery);
	};