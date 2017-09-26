

<?php
	//MIDDLE.PHP - Kevin Butryn (kb295)
	//This project was a 3 person Team effort
	// Front end would get login information to pass to middle end
	// middle end would login to njit, and also pass on login to back end
	// back end checks database and middle end forwards both results to front
	

	// get username and password from frontend
	$user = $_GET["user"];
	$pass = $_GET["pass"];

	// initialize curl to back end
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_URL, "https://web.njit.edu/~as2487/back.php?user=" . $user . "&pass=" . $pass);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	
	// initialize curl to njit
	$curl2 = curl_init();
   	$postData = "user=".$user."&pass=".$pass."&uuid=".'0xACA021';
	$url = 'https://cp4.njit.edu/cp/home/login';

	curl_setopt_array($curl2, array(
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS =>  $postData,
		CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_RETURNTRANSFER => true,
         ));
	
	// set default answers to false	
	$ans1 = "false";
	$ans2 = "false";

	// read results from curl from backend
	$result = curl_exec($curl);
	curl_close($curl);
	$obj = json_decode($result);
	$ans1 = $obj->{"answer_db"};


	// read results from curl from njit
	$result2 = curl_exec($curl2);
	curl_close($curl2);
	
	// set output if login successful
	if (strpos($result2, 'Successful') !== false){
	$ans2 = "true"; 
	}
	
	// send results to frontend
	$answers = array();
	$answers[] = array(
	'answer_db' => $ans1,
	'answer_njit' => $ans2
	);
	
	$json = json_encode($answers);

	echo $json;
?>