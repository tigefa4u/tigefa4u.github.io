var owner = 'tigefa4u';
var start_angle = 0;
	
$(document).ready(function($) {
	var u  = new Url;
	if( u.query.user !== undefined ) {
		owner = u.query.user;
	}
	
	get_repos();

	$(window).resize(function() {
		place_divs(  );
		place_details( 'init' );
	});
});

function get_repos(){
    $.getJSON('https://api.github.com/users/'+owner+'/repos', function( repos ){
		$('#num-repos b').text( repos.length );
		
		$.each(repos, function (i, repo) {
			var lang = '';
			if( repo.language != null ){
				repo.language = repo.language.replace( '++', 'plusplus' );
				lang = '<span class="repo_details repo_lang '+repo.language+'">' + repo.language + '</span>';
			}
			var $item = $('<div class="repo" id="repo_'+i+'"/>');
			var $link = $('<a class="box '+repo.language+'" href="' + repo.html_url + '" />');
			$link.append('<h2 class="name '+repo.language+'"><p>' + repo.name + '</p></h2>');
			$link.append('<span class="repo_details repo_stars">' + repo.watchers + '</span>' + lang);
			$link.append('<span class="repo_details repo_desc">' + repo.description + '</span>');
			$link.append('<span class="repo_details repo_forks">' + repo.forks_count + '</span>');
			$link.append('<span class="repo_details repo_updated">' + repo.updated_at + '</span>');
			$link.append('<span class="repo_details repo_url">' + repo.html_url + '</span>');
			$link.appendTo($item);
			$item.appendTo('#clock');
			$item.on( "click", function(){
				place_details( $(this).attr('id') );
				return false;
			});
			
		});
		
		$('#gravatar_img').attr( 'src', 'https://secure.gravatar.com/avatar/'+repos[0].owner.gravatar_id+'?s=512' ).show();
		
		place_divs(  );

	});
}

function place_divs(){
	// Resize clock
	var clock_w = parseInt( Math.min( $(window).height(), $(window).width() ) * 0.7 ) + 'px';
	$('#clock').css( {width: clock_w, height: clock_w } );

	// Place divs
	var elems = $('div.repo');
	var increase = Math.PI * 2 / elems.length;
	var x = 0, y = 0, angle = start_angle;
	
	// Get clock width, top, left, border
	var c_w = $('#clock').width();
	var c_t = $('#clock').offset().top;
	var c_l = $('#clock').offset().left;
	var c_b = parseInt( $('#clock').css('border-left-width') );

	// Get numbers & center div width & height
	var num_w = $('div.repo').width();
	var num_h = $('div.repo').height();
	var center_w = $('#center').width();
	var center_h = $('#center').height();

	// Position divs on #clock
	for (var i = 0; i < elems.length; i++) {
		var elem = elems[i];
		x = parseInt( c_w / 2 ) * Math.cos(angle) + parseInt( c_l + c_w / 2 + c_b - num_w / 2 ) ;
		y = parseInt( c_w / 2 ) * Math.sin(angle) + parseInt( c_t + c_w / 2 + c_b - num_h / 2 ) ;
		$(elem).css( {position:'absolute', left:x+'px', top:y+'px'} );
		angle += increase;
	}
	
	// Place #center
	$('#center').css( {
		top:  parseInt( c_w / 2 + c_t / 2 - 2*c_b - center_w ) + 'px',
		left: parseInt( c_w / 2 + c_l / 2 - c_b / 2 - center_h / 2) + 'px',
		'margin-top':  parseInt( c_w / 2 - center_h / 2 ) + 'px',
		'margin-left': parseInt( c_w / 2 - center_w / 2 ) + 'px'
	} );
	
	// Place #details
	place_details( 'init' )
}

// Place #details
function place_details( id ) {
	// Fill in details
	if( id !== 'init' ) {
		$('#details').show();
		$('#center').hide();
		$('#details #name').text( $('#'+id+' .name').text() );
		$('#details #lang').text( $('#'+id+' .repo_lang').text() );
		$('#details a').attr('href', $('#'+id+' .repo_url').text() );
		$('#details #stars strong').text( $('#'+id+' .repo_stars').text() );
		$('#details #forks strong').text( $('#'+id+' .repo_forks').text() );
		$('#details #desc').text( $('#'+id+' .repo_desc').text() );
		$('#details #updated').text( 'Updated ' + prettyDate( $('#'+id+' .repo_updated').text() ) );
	}
	
	// Get clock width, top, left, border
	var c_w = $('#clock').width();
	var c_t = $('#clock').offset().top;
	var c_l = $('#clock').offset().left;

	var det_w = $('#details').width();
	var det_h = $('#details').height();
	$('#details').css( {
		top  : parseInt( c_t + c_w / 2 - det_h / 2 ) + 'px',
		left : parseInt( c_l + c_w / 2 - det_w / 2 ) + 'px',
		'margin-top':  parseInt( c_w / 2 - det_h / 2 ) + 'px',
		width: parseInt( c_w * 0.6 ) + 'px'
	} );
	
}

// Relative times -- stolen from h5bp
function prettyDate(rawdate) {
	var date, seconds, formats, i = 0, f;
	date = new Date(rawdate);
	seconds = (new Date() - date) / 1000;
	formats = [
		[60, 'seconds', 1],
		[120, '1 minute ago'],
		[3600, 'minutes', 60],
		[7200, '1 hour ago'],
		[86400, 'hours', 3600],
		[172800, 'Yesterday'],
		[604800, 'days', 86400],
		[1209600, '1 week ago'],
		[2678400, 'weeks', 604800]
	];

	while (f = formats[i ++]) {
		if (seconds < f[0]) {
			return f[2] ? Math.floor(seconds / f[2]) + ' ' + f[1] + ' ago' :  f[1];
		}
	}
	return 'a while ago';
}

// jsURL - https://github.com/Mikhus/jsurl
;var Url=(function(){"use strict";var j={protocol:'protocol',host:'hostname',port:'port',path:'pathname',query:'search',hash:'hash'},parse=function(a,b){var d=document,link=d.createElement('a'),b=b||d.location.href,auth=b.match(/\/\/(.*?)(?::(.*?))?@/)||[];link.href=b;for(var i in j){a[i]=link[j[i]]||''}a.protocol=a.protocol.replace(/:$/,'');a.query=a.query.replace(/^\?/,'');a.hash=a.hash.replace(/^#/,'');a.user=auth[1]||'';a.pass=auth[2]||'';parseQs(a)},decode=function(s){s=s.replace(/\+/g,' ');s=s.replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/g,function(a,b,c,d){var e=parseInt(b,16)-0xE0,n2=parseInt(c,16)-0x80;if(e==0&&n2<32){return a}var f=parseInt(d,16)-0x80,n=(e<<12)+(n2<<6)+f;if(n>0xFFFF){return a}return String.fromCharCode(n)});s=s.replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/g,function(a,b,c){var d=parseInt(b,16)-0xC0;if(d<2){return a}var e=parseInt(c,16)-0x80;return String.fromCharCode((d<<6)+e)});s=s.replace(/%([0-7][0-9A-F])/g,function(a,b){return String.fromCharCode(parseInt(b,16))});return s},parseQs=function(g){var h=g.query;g.query=new(function(c){var d=/([^=&]+)(=([^&]*))?/g,match;while((match=d.exec(c))){var f=decodeURIComponent(match[1].replace(/\+/g,' ')),value=match[3]?decode(match[3]):'';if(this[f]!=null){if(!(this[f]instanceof Array)){this[f]=[this[f]]}this[f].push(value)}else{this[f]=value}}this.toString=function(){var s='',e=encodeURIComponent;for(var i in this){if(this[i]instanceof Function){continue}if(this[i]instanceof Array){var a=this[i].length;if(a){for(var b=0;b<a;b++){s+=s?'&':'';s+=e(i)+'='+e(this[i][b])}}else{s+=(s?'&':'')+e(i)+'='}}else{s+=s?'&':'';s+=e(i)+'='+e(this[i])}}return s}})(h)};return function(a){this.toString=function(){return((this.protocol&&(this.protocol+'://'))+(this.user&&(this.user+(this.pass&&(':'+this.pass))+'@'))+(this.host&&this.host)+(this.port&&(':'+this.port))+(this.path&&this.path)+(this.query.toString()&&('?'+this.query))+(this.hash&&('#'+this.hash)))};parse(this,a)}}());
