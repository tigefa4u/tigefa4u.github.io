/*
 *
 *    NAME: XBLOG
 * VERSION: 0.1.0
 *  AUTHOR: Stefano Viola (estebanSannin)
 * 
 *
 *
 */

$(document).ready(function(){

if($.browser.msie==true){
	alert("IE Browser in not supported!");
	$('#content').html("This site is not supported by Internet Explorer.<br>Install a browser actual: Firefox, Opera or Chrome.");
	return false;
}
	
	// System
	
	$.ajax({ type: "GET", url: "resources/system.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('xblog').each(function() {
		var siteName = $(this).find('siteName').text();
		var theme = $(this).find('theme').text();
		var subTitle = $(this).find('subTitle').text();
		$("#theme").attr("href", "themes/" + theme + ".css");
		$(siteName).appendTo('#sitename');
		$(subTitle).appendTo('#subtitle');
	});
	},
	error: function() { alert("XBlog: Error generating system attributes!"); }
	});



	// Post Blog

	$("<h1 class='content-subhead'>Recent Posts</h1>").appendTo('#postBlog');
	var i = 0;
	$.ajax({ type: "GET", url: "resources/post.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('post').each(function() {
		var linkID = 'link'+i;
		var postID = 'post'+i;
		var data = $(this).find('date').text();
		var title = $(this).find('title').text();
		var author = $(this).find('author').text();
		var avatar = $(this).find('avatar').text();
		var category = $(this).find('category').text();
		var content = $(this).find('content').text();
		var link_markup = 
		'<header class="post-header"><img class="post-avatar" alt="avatar" src="'+avatar+'" height="48" width="48"><a href="#" id="'+linkID+'"><h2 class="post-title">'+title+'</h2></a> <p class="post-meta"> '+data+' by <a>'+author+'</a> under <a class="post-category post-category-design">'+category+'</a></p></header><div class="post-description" id="'+postID+'"><p>'+content+'</p> <a class="post-category post-category-yui" href="#" id="close'+i+'">X CLOSE</a></div>';

	$(link_markup).appendTo('#postBlog');
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
	error: function() { alert("XBlog: Error generating post blog!"); }
	});

// Menu management

	$.ajax({ type: "GET", url: "resources/menu.xml", dataType: "xml",

	success: function(xml) {

	$(xml).find('menu').each(function() {
		var menuID = $(this).find('id').text();
		var titolo = $(this).find('title').text();
		var url = $(this).find('url').text();
		var link_markup = '<td class="headitem"><a href="'+url+'" class="menu" id="'+menuID+'">'+titolo+'</a></td>';

		$(link_markup).appendTo('#menuBar');
	});    
	},
	error: function() { alert("XBlox: Error generating menu"); }
	});

});

