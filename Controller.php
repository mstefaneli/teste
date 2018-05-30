<?php

function __autoload($className){
	if( file_exists("app/models/$className.php")){		
		include_once("app/models/$className.php");
	}
}


$con = new \Atividade;

if(!isset($_POST['action'])) {
	print json_encode(0);
	return;
}

switch($_POST['action']) {
	case 'get_atvs':
		print $con->getAtvs();		
	break;
	
	case 'add_atv':
		$atv = new stdClass;
		$atv = json_decode($_POST['atv']);
		print $con->add($atv);		
	break;
	
	case 'delete_atv':
		$atv = new stdClass;
		$atv = json_decode($_POST['atv']);
		print $con->delete($atv);		
	break;
	
	case 'update_field_data':
		$atv = new stdClass;
		$atv = json_decode($_POST['atv']);
		print $con->updateValue($atv);				
	break;

	case 'get_status':
		print $con->getStatus();				
	break;

	case 'get_atvs_filter':
		$atv = new stdClass;
		$atv = json_decode($_POST['atv']);
		print $con->getAtvsFilter($atv);				
	break;
}

exit();