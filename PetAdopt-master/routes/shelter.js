var mysql = require('./mysql');
var ejs = require('ejs');
var nodemailer = require('nodemailer');

//create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: 'venturenet11@yahoo.com',
        pass: 'venture11'
    }
});

//send mail with defined transport object
exports.sendmail = function(req, res){
	console.log("in send mail option");
	var dat = req.param("date");
	var tim = req.param("time");
	var adfnm1 = req.param("adfnm");
	var admld1 = req.param("admld");
	var pid = req.param("pid");
	var shmld1 = '<'+req.param("shmld")+'>';
	var re = admld1+","+req.param("shmld");
	
	var t = 'Hi '+adfnm1+','+"\r\n\r\n"+'Please meet us at San Jose for further proceedings.'+"\r\n"+'Date: '+dat+"\r\n"+'Time: '+tim+"\r\n\r\n"+'Thanks & Regards'+"\r\n"+'Pet Adopt'
	console.log(t);
		var mailOptions = {
		    from: '<venturenet11@yahoo.com>', // sender address
		    to: re,
		    subject: 'Meeting for Pet Adopt!', // Subject line
		    text: t, // plaintext body
	//	    html: '<b>Hello world</b>' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.send({"status":200});    
		});
		
		var myquery = "Update Selection set sl_notified = 'true' where p_id = "+pid+" and ad_emailid = '"+admld1+"'";
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
		
};

exports.sh_signup = function(req, res){
	var sh_email = req.param("sh_email");
	var sh_password = req.param("sh_password");
	var sh_name = req.param("sh_name");
	var sh_contact = req.param("sh_contact");
	var sh_address = req.param("sh_address");
//	if (ad_email == null)
//		{
//			res.render('')
//		}
		var myquery = "insert into Shelter values ('"+sh_email+"','"+sh_password+"','"+sh_name+"','"+sh_contact+"','"+sh_address+"','SH')";
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
	};
	
	exports.showshelter = function(req, res){
		res.render('showshelter');
	};
	


	exports.newreq = function(req, res){
		var shptemail1 = req.param("sh_email");
		var myquery1 = "select p.p_id,sl.p_id,sl.ad_emailid,p.p_name,p.p_image_name,a.ad_fname,a.ad_lname,sl.sl_notified from Pet p,Selection sl,Adoptor a where sh_emailid = '"+shptemail1+"' and p.p_id = sl.p_id and p.p_status = 'true' and sl.ad_emailid = a.ad_emailid"
		mysql.fetchData(function(err,results1){
			if(err)
				{
					throw err;
				}
			else
				{
				if (results1.length>0)
					{
					req.session.result=results1;
					var JSONstr1=JSON.stringify(results1);
					l1=results1.length;
					res.send({"status1":200,"result1":JSONstr1,"l1":results1.length});
					}
				else
					{
					res.send({"status1":205});
					}
				}
		},myquery1);
	
	};
	
	exports.shelterpet = function(req, res){
		var shptemail = req.param("sh_email");
		var myquery = "select * from Pet where sh_emailid = '"+shptemail+"'";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				if (results.length>0)
					{
					req.session.result=results;
					var JSONstr=JSON.stringify(results);	
					l=results.length;
									res.send({"status":200,"result":JSONstr,"l":results.length});
					}					
				}
		},myquery);
	};
	
exports.sh_signin = function(req, res){
	var email = req.param("email");
	var password = req.param("password");
		var myquery = "select * from Shelter where sh_emailid = '"+email+"' and sh_password = '"+password+"'";
		mysql.fetchData(function(err,results){
			if(err)
				{
					throw err;
				}
			else
				{
				if (results.length>0)
				{
				req.session.name=results[0].sh_name;
				req.session.type=results[0].sh_type;
				req.session.mail=results[0].sh_emailid;
				res.send({"status":200,"name":results[0].sh_name,"email":results[0].sh_emailid});
				}
			else
				{
				console.log("Invalid details");
				res.send({"value1":"Invalid Email Id or Password"});
				}
			}
			
		},myquery);
	};
	
	
	exports.logout = function(req,res){
		console.log("in logout");
		req.session.destroy(function(err)
				{
					if(err){
							console.log(err);
							}
					else
						{
						res.render('index');
						}
				});

	};