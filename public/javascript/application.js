$(document).ready(function() {

  var api_key = 'wEHOP60WVmsA3zxqC2yRdlSgacb4j1Zt';

  var url = 'https://probasketballapi.com/shotcharts/?api_key=' + api_key ;

  var urlshot = 'https://probasketballapi.com/shotcharts/?api_key=' + api_key ;

  var url2 = 'https://probasketballapi.com/players/?api_key=' + api_key ;

  var url3 = 'https://probasketballapi.com/teams/?api_key=' + api_key ;

  var url4 = 'https://probasketballapi.com/games/?api_key=' + api_key ;

  var teamsObject = {};

  var playersObject = {};

  //Listens for search queries, and will filter the contacts displaying on the page.
  $('#searchbox').keyup(function(){
    var valThis = $(this).val();
    $('.game').each(function(){
      var text = $(this).text();
      (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();         
    });
  });
  
  function renderShotData(data) {   
    var raw_x = data.loc_x;
    var raw_y = data.loc_y;
    var x = raw_x + 250;
    var y = raw_y + 10
    var type_of_shot = data.action_type;
    var shot = '<div title="' + type_of_shot + '"></div>';
    if (data.shot_made === 1){
    $('#shots').append($(shot).css({top: y, left: x}).addClass('madeshot'));
    } else {
    $('#shots').append($(shot).css({top: y, left: x}).addClass('missedshot'));
    }  
  };

  function createPlayersObject(data){
    playersObject[data.player_id] = { 'name': data.player_name, 'number': data.team_id };
  };

  function createTeamNameObject(data){
    teamsObject[data.team_id] = data.team_name; 
    };

  function renderGamesList(data) {
      var home = data.home_id;
      var away = data.away_id;
      var date = data.date;
      var season = data.season;
      var gameId = data.game_id;
      var gameDiv = ('<div class="game">' + season + ' ' +  
        teamsObject[home] + ' vs. ' + teamsObject[away] + 
         '</div>');
      $(gameDiv).data('gameId', gameId).appendTo('#games');
  };

  
  //ON click of .game div, make ajax request to get shot Data
    $('#games').on('click', '.game', function(){
      $('#shots').empty();
      getShotChart($(this).data('gameId'));
    });
  



//  ---------------- AJAX CALLS -----------  

  function getShotChart(gameId){
    $.ajax({
      url: url + '&game_id=' + gameId + '&get_extra=1',
      method: 'post',
      dataType: 'JSON',
      // data: {
      //   game_id: gameId,
      //   get_extra: 1
      // },
      success: function(data){
        console.log(data);
        _.each(data, renderShotData);
          },
      
      error: function(xhr, status, response){
        console.log('error', xhr, status, response);
        }
    });
  };


//Get players info
  $.ajax({
    url: url2,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      _.each(data, createPlayersObject);
        },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });

  //Get team info
  var teamsCall = $.ajax({
    url: url3,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      _.each(data, createTeamNameObject);
    },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });

   //Get all Games info
  var gamesCall = $.ajax({
    url: url4,
    method: 'post',
    dataType: 'JSON',
    success: function (data){
      $.when(teamsCall).done(
        function(){
          _.each(data, renderGamesList);
        }
      );
    },
      
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  });        


});
