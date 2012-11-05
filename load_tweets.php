<?php require 'twitter.php' ?>
<?php

//Part 2 ----> part c)
	$twitter = new Twitter();
	$tweetsByLP = $twitter->getTweets("linkinpark");
	echo '<h2> Twitter Stream</h2>';
	foreach($tweetsByLP as $tweet){
		echo '<div class="tweets">'.$tweet->text.'</div>';
	}
?>