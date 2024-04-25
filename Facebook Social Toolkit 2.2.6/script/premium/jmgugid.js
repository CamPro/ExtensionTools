/*
//
//  Created by Dinesh Bhosale on 10/7/15.
//  Copyright (c) 2015 Dinesh Bhosale of getmyscript.com All rights reserved.
//
*/
var jmgugid_title="Join Multiple Groups Using Group IDs";
function validate_input_div_string(input_div_val)
{
	console.log('Is valid called');
	var is_valid=true;
	input_div_val=input_div_val.toString();
	if(input_div_val&&input_div_val!="")
	{
		input_div_array=input_div_val.split("\n");
		console.log(input_div_array);
		for(var tempvar=0;input_div_array[tempvar];tempvar++)
		{
			if(isNaN(parseInt(input_div_array[tempvar])))
			{
				is_valid=false;
			}
		}
	}else{
		is_valid=false;
	}
	return is_valid;
}
function join_group_id_array(group_id_array,delay_time)
{
	var starting_group_number=0;
	function send_group_join_request()
	{
		if(group_id_array[starting_group_number])
		{
			join_group(group_id_array[starting_group_number]);
			starting_group_number++;
			setTimeout(function(){
				send_group_join_request();
			},(delay_time*1000));
		}else{
			toastr.success("Requests to join groups are sent successfully.",jmgugid_title);
		}
	}
	send_group_join_request();
}
function group_join_with_group_ids()
{
	console.log('group_join_with_groups_ids called');
	var input_div=document.getElementById("fst789_jmgugi_gid");
	var delay_time=document.getElementById("fst789_jgugids_delay_num").value;
	if(validate_input_div_string(input_div.value))
	{
		if(!isNaN(delay_time))
		{
			toastr.info('Processing input Data',jmgugid_title);
			join_group_id_array(input_div.value.split('\n'),delay_time);
		}else{
			toastr.error('Delay time is invalid',jmgugid_title);
		}
	}else{
	   	toastr.error('Entered Group IDs are incorect, please enter them correctly. Make sure they are valid numbers',jmgugid_title);
	}
}
