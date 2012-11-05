<?php

//Part 2 -----> part a). Access & return resultset of tweets 

class Twitter{
	static function getTweets($user){
		$twitterURL = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=$user";
		$jsonString = file_get_contents($twitterURL);
		$arrayOfTweets = json_decode($jsonString);
		return $arrayOfTweets;
	}

}
?>