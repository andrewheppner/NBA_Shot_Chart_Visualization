$(document).ready(function() {

  var api_key = 'wEHOP60WVmsA3zxqC2yRdlSgacb4j1Zt';

  var url = 'https://probasketballapi.com/shotcharts/?api_key=' + api_key + '&game_id=21400001&get_extra=1' ;

  var url2 = 'https://probasketballapi.com/players/?api_key=' + api_key ;

  var url3 = 'https://probasketballapi.com/teams/?api_key=' + api_key ;

  var teamsObject = {};

  var playersObject = {};
  
  function renderData(data) {
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
      
    }
  


//Get game shot chart information Ajax call
  $.ajax({
    url: url,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      var players = data;
      console.log (players);
      _.each(data, renderData);
        },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });  

//Get players info
  $.ajax({
    url: url2,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      _.each(data, createPlayersObject);
      console.log(playersObject);
        },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });

  //Get team info
  $.ajax({
    url: url3,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      _.each(data, createTeamNameObject);
      console.log(teamsObject);
        },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });    


});
