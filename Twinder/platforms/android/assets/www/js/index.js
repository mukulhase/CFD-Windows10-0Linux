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

});
$( document ).on( "pagecreate", "#pagetwo", function() {
    //alert("shweg");
    $(document).on("swiperight","#pagetwo",function(){
        $(":mobile-pagecontainer").pagecontainer("change", "#pageone", {
            transition: "slide",
            reverse: true

        });
    });

});

trends = ['#Nigga', '#Noob', '#Alahomora', '#WhatWasThat', '#R1GoBack']

var hn = 0;
function processArray(array){
    var array2=[];
    var j=0;
    for(var i=0; i< array.length; i++){
        if(array[i].indexOf('#')!=-1){
            array2[j]=array[i];
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
$(document).on("pagecreate", "#pageone", function () {
    var x=setInterval(function(){
        $.mobile.loading( "show", {
            text: "Loading Tweets",
            textVisible: true,
            theme: "a",
        });},500);
    var testurl="http://mukulhase.com/twitterproxy/meh/user.php?user=TrendsHyderabad&number=10"
    $.getJSON(testurl,function(data){
        console.log(data);
        $.mobile.loading("hide");
        trends=processArray(data.tweets);
        $("#hash").css('text-indent', '-60vw');
        $("#hash").text(trends[hn]);
        $("#hash").animate({textIndent: '0vw'});
        clearInterval(x);
    });
    $(document).on("swiperight", "#pageone", function () {
        hn += 1;
        if (hn > trends.length) {
            hn = 0;
        }
        //$("#hash").animate({ textIndent: '100vw' }, "fast");
        $("#hash").css('text-indent', '-60vw');
        $("#hash").text(trends[hn]);
        $("#hash").animate({textIndent: '0vw'});
    });

});

app.initialize();
