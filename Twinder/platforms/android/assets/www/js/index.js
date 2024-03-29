/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var locationList = ["SthAfrica", "JoBurg", "Mumbai", "DC", "Liverpool", "London", "Chennai", "CapeTown", "Lagos", "Karachi", "Hyderabad", "UK", "Sydney", "Bangalore", "MPLS", "Boston", "Ireland", "New York", "Miami", "Dublin", "Melbourne", "Detroit", "Philly", "Chicago", "Seattle", "Vancouver", "Montreal",  "Toronto", "PGH", "NewDelhi", "Glasgow", "Nashville", "SanDiego", "Santiago", "NOLA", "Cleveland", "Phoenix", "Nigeria", "Australia"];
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
$( document ).on( "pagecreate", "#pageone", function() {

    //alert("shweg");
    $(document).on("swipeleft","#pageone",function(){
        $(":mobile-pagecontainer").pagecontainer("change", "#pagetwo", {
            transition: "slide",
            reverse: false

        });
    });
    $(document).on("swiperight", "#pageone", function () {
        hn += 1;
        if (hn >= trends.length) {
            hn = 0;
        }
        animatePage();
    });

});
$( document ).on( "pagecreate", "#pagetwo", function() {
    //alert("shweg");
    $(document).on("swiperight","#pagetwo",function(){
        $(":mobile-pagecontainer").pagecontainer("change", "#pageone", {
            transition: "slide",
            reverse: true
        });
    });

    $(".tweetmore").click(function () {
        var temp = $(this).text();
        $("#info").text(temp);
    });
});
$( document ).on( "pageshow", "#pagetwo", function() {
    document.getElementById("tagHere").innerText = trends[hn];
    loadTweets(trends[hn], document.getElementById("tweetdisp"), 5);

});

var localcity="Hyderabad";
document.getElementById("currentlocation").innerText="Hyderabad";
var count=10;
var hn = 0;

function processArray(array){
    var array2=[];
    var j=0;
    for(var i=0; i< array.length; i++){
        if(array[i].indexOf('#')!=-1){
            if(array[i].length>1){
                array2[j]=array[i];
                j++;
            }
        }else if(array[i].indexOf("'")==-1) {
            array2[j]="#" + array[i];
            j++;
        }else{
            var temp = array[i].split("'");
            var k;
            for(k=1;k<temp.length;k+=2) {
                array2[j] = "#"+temp[k];
                console.log(temp[k]);
                j++;
            }
        }
    }
    return array2;
}
function locationchange(location){
    document.getElementById("currentlocation").innerText=location;
    localcity=location;
    loadTrends();
}
function trendsurl(city,count){
    return "http://mukulhase.com/twitterproxy/meh/user.php?user=Trends"+city+"&number="+count;
}
function tweetsurl(hashtag,count){
    var result = hashtag.substring(1, hashtag.length);
    return "http://mukulhase.com/twitterproxy/meh/hashtag.php?tag="+result+"&number="+count;
}

function loadTweets(hashtag,element,count){
    $(element).slideUp();
    $(element).after(' <div class="loadtwit loading">\
        <span class="loadtwit text">Loading</span>\
        <span class="loadtwit blob1 blob"></span>\
        <span class="loadtwit blob2 blob"></span>\
        <span class="loadtwit blob3 blob"></span>\
        </div>');
    $.getJSON(tweetsurl(hashtag,count),function(data) {
        console.log(data);
        var i;
        var prev='';
        for (i = 0; i < data.tweets.length; i++) {
            prev += '<blockquote> <p class="tweetmore">';
            prev += data.tweets[i].text;
            prev += "</p style=\"color:#00CED1;\"><footer><cite title=\"Source Title\">" + data.tweets[i].user + "</cite></footer></blockquote>";
        }
        console.log(data.tweets);
        var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        for (i = 0; i < data.tweets.length; i++) {
            for (var j = 0; j < data.tweets[i].links.length; j++){
                if (data.tweets[i].links[j].match(regex)) {
                    prev += '<p class="tweetmore">';
                    prev += data.tweets[i].links[j];
                    prev += "</p><br>";
                }
            }
        }
        element.innerHTML=prev + `<a href="https://twitter.com/intent/tweet?button_hashtag=`+hashtag.substring(1, hashtag.length)+`" class="twitter-hashtag-button">Tweet `+hashtag+`</a>`;
        $(element).trigger("create");
        $(".loadtwit").slideUp();
        $(".loadtwit").remove();
        $(element).slideDown();
    });
}

function loadTweetOne(hashtag,element){
    $(element).slideUp();
    $(element).after(' <div class="loadtwit loading">\
        <span class="loadtwit text">Loading</span>\
        <span class="loadtwit blob1 blob"></span>\
        <span class="loadtwit blob2 blob"></span>\
        <span class="loadtwit blob3 blob"></span>\
        </div>');
    $.getJSON(tweetsurl(hashtag,1),function(data) {
        console.log(data);
        var prev = "";
        prev += '<blockquote> <p>';
        prev+=data.tweets[0].text;
        prev += "</p style=\"color:#00CED1;\"><footer><cite title=\"Source Title\">" + data.tweets[0].user + "</cite></footer></blockquote>";
        element.innerHTML=prev;
        $(element).trigger("create");
        $(".loadtwit").slideUp();
        $(".loadtwit").remove();
        $(element).slideDown();
    });
}

function loadTrends(){
    $.getJSON(trendsurl(localcity,count),function(data){
        console.log(data);
        $.mobile.loading('hide');
        trends=processArray(data.tweets);

        animatePage();
    });
}

function animatePage(){
    var hash= $("#hash");
    var tweetdisp= document.getElementById("tweets");
    loadTweetOne(trends[hn],tweetdisp);
    hash.css('text-indent', '-60vw');
    hash.text(trends[hn]);
    hash.animate({textIndent: '0vw'});
}

$(document).one("pagecreate", "#pageone", function () {
    populateLocations();
    var interval = setInterval(function(){
        $.mobile.loading( "show", {
            text: "Loading Tweets",
            textVisible: true,
            theme: "a"
        });
        clearInterval(interval);
        console.log("hmm");
    },1);
    loadTrends();
});

!function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); } }(document, 'script', 'twitter-wjs');


function populateLocations() {
    var element = document.getElementById("locations");
    var prev = '<ul id="locationsView" data-role="listview" data-inset="true" data-autodividers="true" data-filter="true">';
    for (i = 0; i < locationList.length; i++) {
        prev += "<li><a href=\"\" onclick=\"locationchange('"+locationList[i]+"')\" >";
        prev += locationList[i];
        prev += "</a></li>";
    }
    prev += "</ul>";
    element.innerHTML = prev;

    $(element).trigger("create");
}

app.initialize();
