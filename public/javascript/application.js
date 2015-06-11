$(document).ready(function() {

  var api_key = 'wEHOP60WVmsA3zxqC2yRdlSgacb4j1Zt';

  var url = 'https://probasketballapi.com/shotcharts/?api_key=' + api_key + '&game_id=21400001&get_extra=1' ;

  
  function renderData(data) {
      var raw_x = data.loc_x;
      var raw_y = data.loc_y;
      var x = raw_x + 250;
      var y = raw_y + 10
      var type_of_shot = data.action_type;
      var shot = '<div title=' + type_of_shot + '></div>';
      if (data.shot_made === 1){
      $('#shots').append($(shot).css({top: y, left: x}).addClass('madeshot'));
      } else {
      $('#shots').append($(shot).css({top: y, left: x}).addClass('missedshot'));
      }  
  };


  //Get game shot chart information Ajax call
  $.ajax({
    url: url,
    method: 'post',
    dataType: 'JSON',
    success: function(data){
      console.log(data);
      _.each(data, renderData);
        },
    
    error: function(xhr, status, response){
      console.log('error', xhr, status, response);
      }
  
  });  


});
