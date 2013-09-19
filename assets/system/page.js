/*
 * 
 *    NAME: XBLOG
 * VERSION: 0.1.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 * 
 * 
 */

$(document).ready(function(){
	$.ajax({ type: "GET", url: "resources/page.xml", dataType: "xml",
	
	success: function(xml) {
		$(xml).find('page').each(function() {
		var tag = $(this).find('tag').text();
		var content = $(this).find('content').text();

		$('a#'+tag).live("click", function(){
		 $('#content').hide();
		 $('#content').html(content);
		 $('#content').fadeIn(1500);
		});

		});
	},
	 error: function() { alert("PAGE Generetor: ERROR!"); }
	});
});

