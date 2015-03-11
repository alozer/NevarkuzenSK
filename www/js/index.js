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

app.initialize();

/*
 * 
 * Custom Code begin
 * 
 */
var teamInfo = {
    players : null,
    news : null,
    scores:null,
    games:null,
    playerId:null,
    newsId:null,
    scoreId:null,
    gameId:null
};

/*
$(document).on('pagebeforecreate', '#players', function(){     
    setTimeout(function(){
        $.mobile.loading('show');
    },1);    
});


$(document).on('pageshow', '[data-role="page"]', function(){  
    setTimeout(function(){
        $.mobile.loading('hide');
    },300);      
});*/


  
$(document).on( "pageinit", "#home", function() {
    //alert("pageinit entered");
    //$.mobile.loading( "show" );
    //loading('show');
    
    //var url = 'https://alozer.bitrix24.com/docs/pub/8b9199e01004be483e1c5cf7b87777a0/team1.json?LoadFile=1';       
    //var url = 'team1.json';       
    var url = 'https://nevarkuzenskws.herokuapp.com/myresource?team_id=10';   
    
    jQuery.ajax({
        url: url ,
        dataType: "json",
        async: true,
        cache: false,
        
        success: function (result) {
            //alert("before parse jason");
            ajax.parseJSON(result);
            
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        },
        beforeSend: function(){
            //$.mobile.loading( "show" );
        },
        complete: function () {   
            //alert("completed parse jason");
            /*setTimeout( function() {
                    $.mobile.loading( "hide" );

                    // Restore the pagecontainer's ability to handle showing/hiding the loader
                    $( ":mobile-pagecontainer" ).pagecontainer( "option", "handleLoader", true );
            }, 3000 );*/
        }
        
    });   
});

/*
 * player link tiklaninca
 */
$(document).on('vclick', '#players-list li a', function(){  
    //alert("player link clicked started!");
    teamInfo.playerId = $(this).attr('data-id');
    $.mobile.changePage( "#player-details", { transition: "slide", changeHash: false });
    //alert("player link clicked finished!");
});

/*
 * player-details sayfasi acilmadan once
 */
$(document).on('pagebeforeshow', '#player-details', function(){      
    //alert("player detail started!");
    $('#player-data').empty();
    $.each(teamInfo.players, function(i, row) {
        if(row.player_id == teamInfo.playerId) {
            //window.alert("row.birth_date: "+row.birth_date);
            $('#player-data').append('<li><img src="img/default_player.png""></li>');
            $('#player-data').append('<li>Ad Soyad : '+row.name+'</li>');
            $('#player-data').append('<li>Numara : '+row.number+'</li>');    
            $('#player-data').append('<li>Doğum Tarihi : '+row.birth_date+'</li>'); 
            $('#player-data').append('<li>Meslek : '+row.job+'</li>'); 
            $('#player-data').append('<li>Telefon: '+row.phone_number+'</li>'); 
            $('#player-data').append('<li>Twitter : '+row.twitter_user_name+'</li>'); 
            $('#player-data').listview('refresh');            
        }
    });
    //alert("player detail finished!");
});

/*
 * news-details sayfasi acilmadan once
 */
$(document).on('pagebeforeshow', '#news-details', function(){      
    //alert("player detail started!");
    $('#news-data').empty();
    $.each(teamInfo.news, function(i, row) {
        if(row.news_id == teamInfo.newsId) {
            //$('#news-data').append('<li><img src="http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w185/jjHu128XLARc2k4cJrblAvZe0HE.jpg"></li>');
            //$('#news-data').append('<li>Id: '+row.id+'</li>');
            $('#news-data').append('<h1> '+row.subject+'</h1>');
            $('#news-data').append('<p >'+row.body+'<p>');         
            //$('#news-data').listview('refresh');            
        }
    });
    //alert("player detail finished!");
});



/*
 * news link tiklaninca
 */
$(document).on('vclick', '#news-list li a', function(){  
    //alert("player link clicked started!");
    teamInfo.newsId = $(this).attr('data-id');
    $.mobile.changePage( "#news-details", { transition: "slide", changeHash: false });
    //alert("player link clicked finished!");
});

var ajax = {  
    parseJSON:function(result){  
        teamInfo.players = result.players;
        
        //window.alert("player_id: " +result.players[1].player_id+" row.job: "+result.players[1].job);
        $.each(result.players, function(i, row) {
            console.log(JSON.stringify(row));
            $('#players-list').append('<li><a href=""  data-id="' + row.player_id + '"><img src="img/default_player.png"/><b>' + row.name + '</b> (' + row.number+')</a></li>');
        });
        
        teamInfo.news = result.news;
        $.each(result.news, function(i, row) {
            console.log(JSON.stringify(row));
            //$('#news-list').append('<li><a data-role="list-divider" data-theme="a" data-id="' + row.news_id + '"><b>' + row.subject + '</b></a></li>');
            $('#news-list').append('<div data-role="collapsible" data-filtertext="'+row.subject+'"><h3>' + row.subject + '</h3><p class="wrap">'+ row.body +'</p>');
        });
        
        teamInfo.scores = result.scores;
        $.each(result.scores, function(i, row) {
            console.log(JSON.stringify(row));
            //$('#scores-list').append('<li>' + row.home_team_name + ' <b>'+row.score+'</b> '+row.away_team_name+'</li>');
            $('#scores-list').append('<div data-role="collapsible" data-filtertext="'+row.home_team_name+' '+row.score+' '+row.away_team_name+'"><h3>' + row.home_team_name + ' <b>'+row.score+'</b> '+row.away_team_name + '</h3><p class="wrap">Detaylar buraya</p>');
        });
        
        teamInfo.games = result.games;
        $.each(result.games, function(i, row) {
            console.log(JSON.stringify(row));
            $('#games-list').append('<li>'+row.weak+'. Hafta ('+row.date + ') <br> '+row.home_team_name+' '+row.time+' '+row.away_team_name+'</li>');
        });
        //$('#player-list').listview('refresh');
        //$('#news-list-int').listview('refresh');
    }
};