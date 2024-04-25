/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
/* 
group admin transfer tool start
*/
function groupadmintransferguiengine(){
	var friendid=document.getElementById("fst789_gat_friend_id").value;
	if(friendid&&!isNaN(friendid))
	{
		var groupidcollect=[];
		if(!isNaN(friendid)){
			function recaller(){
				var request=$.ajax({
				  	type: "GET",
				  	url: "/browsegroups/more/?category=admin&__user="+user_id+"&__a=1&existing_ids="+groupidcollect.toString(),
				  	dataType: "html"
				});
				request.done(function( e ) {
    				var groupidcollecttemp=e.match(/\?group_id=\d+&amp/g);
    				if(groupidcollecttemp)
    				{
						$.each(groupidcollecttemp, function( index, value )
						{
							if(value)
							{
							  	groupidcollect[groupidcollect.length]=value.replace("\?group_id=","").replace("&amp","");
							};
						});
						console.log(groupidcollect.toString());
						recaller();
					}else{
						console.log(groupidcollect.toString());
						var looperstartcounter=-1;
						function loopergroupadminadd(looperstartcounter){
							console.log("inside loopergroupadminadd");
							looperstartcounter++;
							if(groupidcollect[looperstartcounter])
							{
								addfriendasgroupadmin(groupidcollect[looperstartcounter],friendid);
							};
							if(groupidcollect[looperstartcounter+1])
							{
								setTimeout(function(){
									loopergroupadminadd(looperstartcounter);
								},500)
							}else{
								dineshstoastr("success"," Group ownership transferred successfully.","Facebook Social Toolkit")
							};
						}
						function loopergorupjoin(looperstartcounter){
							looperstartcounter=looperstartcounter+1;
							console.log("looperstartcounter="+looperstartcounter);
							console.log("inside loopergorupjoin");
							console.log(groupidcollect[looperstartcounter]);
	
							if(groupidcollect[looperstartcounter])
							{
								forcegroupjoining(groupidcollect[looperstartcounter],friendid);
								loopergorupjoin(looperstartcounter);
							}else{
								var looperstartcounter=-1;
								loopergroupadminadd(looperstartcounter);
							};
						}
						loopergorupjoin(looperstartcounter);
					};
  				});
			}
			recaller();
		}else{
			dineshstoastr("error","Invalid friend ID","Group Admin Transfer");
		};
	}else{
		dineshstoastr("error","Invalid friend ID","Group Admin Transfer");
	};;
}
/*
group admin transfer tool end ########
*/