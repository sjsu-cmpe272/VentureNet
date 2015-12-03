var mysql = require('./mysql');
var fs = require('fs');

exports.petdetails = function(req, res){
	var myquery = "select * from Pet where p_status = 'true'";
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
				res.send({"status":200,"result":JSONstr,"l":results.length});
				}
				
			}
		
	},myquery);
//  res.render('pet', { title: 'Express' });
};

exports.petinsert = function(req,res){
	if(req.files.pt_file.size != 0)
		{
	    var tmp_path = req.files.pt_file.path;
	    var target_path = '/Users/manjeetsingh/git/PetAdopt/public/images/' + Date.now() + req.files.pt_file.name;
	    var profile_pic = Date.now() + req.files.pt_file.name;
	    fs.rename(tmp_path, target_path, function(err) {
	        if (err) throw err;
	        fs.unlink(tmp_path, function() {
	            if (err) {
	                throw err;
	            }else{
	                    profile_pic = req.files.pt_file.name;
	            };
	            });
	        });
		}
	else
		{
			profile_pic = "empty.jpeg";
		}
    var name = req.param("pt_name");
    var type = req.param("pt_type");
	var color = req.param("pt_color");
	var height = req.param("pt_height");
	var weight = req.param("pt_weight");
	var breed = req.param("pt_breed");
    var gender= req.param("pt_gender");
    var shmail = req.param("sh_pt_email");
    var desc = req.param("pt_desc");
    
    var myquery = "insert into Pet (p_name,p_type,p_color,p_height,p_weight,p_breed,p_status,ad_emailid,sh_emailid,p_image_name,p_gender,p_description) values " +
    		"  ('"+name+"','"+type+"','"+color+"','"+height+"','"+weight+"','"+breed+"','true',NULL,'"+shmail+"','"+profile_pic+"','"+gender+"','"+desc+"')";
	mysql.fetchData(function(err,results){
		if(err)
			{
				throw err;
			}
		else
			{
			res.render('showshelter');
			}
		
	},myquery);
};

exports.petsearch = function(req, res){
	var type = req.param("sr_type");
	var color = req.param("sr_color");
	var breed = req.param("sr_breed");
    var gender= req.param("sr_gender");
    var myquery = "select * from Pet where p_status = 'true' ";
    if (type != undefined)
    	{
    	myquery = myquery + "and p_type = '"+type+"'";
    	}

	if(color != undefined)
		{
		myquery = myquery + "and p_color = '"+color+"'";
		}

	if(breed != undefined)
		{
		myquery = myquery + "and p_breed = '"+breed+"'";
		}

	if(gender != undefined)
		{
		myquery = myquery + "and p_gender = '"+gender+"'";
		}

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
				res.send({"status":200,"result":JSONstr,"l":results.length});
				}
				
			}
		
	},myquery);
};

exports.morepetdet = function(req, res){
	var id2s = req.param("id2");
    var myquery = "select * from Pet where p_id = '"+id2s+"'";
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
				res.send({"status":200,"result":JSONstr,"l":results.length});
				}
				
			}
		
	},myquery);
};

exports.putinterest = function(req, res){
	var idput = req.param("id2");
	var ademail2intrt = req.param("ademail2intrt");
    var myquery = "insert into Selection values("+idput+",'"+ademail2intrt+"','N')";
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

exports.shmorepetdet = function(req, res){
	var id3s = req.param("id3");
    var myquery = "select p.p_id,sl.p_id,sl.ad_emailid,p.p_name,p.p_image_name,p.p_gender,p.p_breed,p.p_height,p.p_weight,p.p_description,p.sh_emailid,a.ad_fname,a.ad_lname,a.ad_emailid,a.ad_contact,a.ad_address,sl.sl_notified from PetAdopt.Pet p,PetAdopt.Selection sl,PetAdopt.Adoptor a where p.p_id = "+id3s+" and p.p_id = sl.p_id and p.p_status = 'true' and sl.ad_emailid = a.ad_emailid";
	mysql.fetchData(function(err,results){
		if(err)
			{
				throw err;
			}
		else
			{
			if (results.length>0)
				{
			//	console.log(results);
				req.session.result=results;
				var JSONstr=JSON.stringify(results);
				console.log(JSONstr);
				res.send({"status":200,"result":JSONstr,"l":results.length});
				}
				
			}
		
	},myquery);
};

exports.decide = function(req, res){
	console.log("decision");
	var dec = req.param("dec");
	var pid = req.param("pid");
	var adml = req.param("adml");
	var myquery = "Update Pet set p_status = 'false',ad_emailid = '"+adml+"' where p_id = "+pid+"";
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