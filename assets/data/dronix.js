$(document).ready(function(){

  var i = 0;
 
  $('<h3>DroniX Download List:</h3>').appendTo('#content'); 
  $('<ul id="listLink"></ul>').appendTo('#content');


  $.ajax({ type: "GET", url: "data/dronix.xml", dataType: "xml",
     
    success: function(xml) {
       
      $(xml).find('post').each(function() {
        var linkID = 'link'+i;//$(this).find('linkID').text();
	var postID = 'post'+i;//$(this).find('postID').text();
        var titolo = $(this).find('title').text();
        var content = $(this).find('content').text();
	var link_markup = '<li><a href="#" id="'+linkID+'">'+titolo+'</a><br><div class="comment" id="'+postID+'">'+content+'</div></li>';

	$(link_markup).appendTo('#listLink');
	$('#'+postID).hide();
	
	$('a#'+linkID).click(function(){
	  $('#'+postID).slideToggle('fast');
	});
	$('a#close'+i).click(function(){
	  $('#'+postID).slideUp('fast');
	});
	i++;
      });    
    },
    error: function(request, error, tipo_errore) { alert(error+': '+ tipo_errore); }
  });
});

