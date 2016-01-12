//Long Shadow Text
var shadow = {
    'distance': 50,
    'opacity': 0.4,
    'blur': 0.15,
    'angle': 60,
    'bgcolor': [60, 120, 150]
}

function refreshLongshadow() {
    var val = '';
        var point = getPoint(1, shadow.angle);
    for(var i = 1; i <= shadow.distance; i++) {
        var per = (100 - 100 / shadow.distance * i) / 100;
        var tempColor = 
            Math.round((shadow.bgcolor[0] * (1 - shadow.opacity * per))) + ', ' +
            Math.round((shadow.bgcolor[1] * (1 - shadow.opacity * per))) + ', ' +
            Math.round((shadow.bgcolor[2] * (1 - shadow.opacity * per)))
        ;
        val += Math.round(point.x * i) + 'px ' + Math.round(point.y * i) + 'px ' + i * shadow.blur + 'px rgb(' + tempColor + ')';
        if(i != shadow.distance) val += ', ';
    }
    // console.log(val);
    $('.longshadow').css('text-shadow', val);

}

function getPoint(dis, deg){
    var point = {};
    var rad = Math.PI / 180 * deg;
    point.x = Math.cos(rad) * dis;
    point.y = Math.sin(rad) * dis;
    return point;
}

refreshLongshadow();

$('body').bind('mousemove',function(event) {
    var centerPoint = [$(this).width()/2, $(this).height()/2];
    var radian = Math.atan2(centerPoint[1] - event.pageY, centerPoint[0] - event.pageX);
    // console.log(event.pageX);
    console.log(radian);
    shadow.angle = radian * 180 / Math.PI;
    refreshLongshadow();
});

// variables
var $header_top = $('.header-top');
var $nav = $('nav');



// toggle menu 
$header_top.find('a').on('click', function() {
  $(this).parent().toggleClass('open-menu');
});



// fullpage customization
$('#fullpage').fullpage({
  //sectionsColor: ['#B8AE9C', '#348899', '#F2AE72',],
  sectionSelector: '.vertical-scrolling',
  slideSelector: '.horizontal-scrolling',
  navigation: true,
  slidesNavigation: true,
  controlArrows: false,
  //verticalCentered: false,
  //anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection'],
  //menu: '#menu',

  afterLoad: function(anchorLink, index) {
    $header_top.css('background', 'rgba(0, 47, 77, .3)');
    $nav.css('background', 'rgba(0, 47, 77, .25)');
    if (index == 5) {
        $('#fp-nav').hide();
      }
  },

  onLeave: function(index, nextIndex, direction) {
    if(index == 5) {
      $('#fp-nav').show();
    }
  },

  afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(false, 'up');
      $header_top.css('background', 'transparent');
      $nav.css('background', 'transparent');
      $(this).css('background', '#374140');
      $(this).find('h2').css('color', 'white');
      $(this).find('h3').css('color', 'white');
      $(this).find('p').css(
        {
          'color': '#DC3522',
          'opacity': 1,
          'transform': 'translateY(0)'
        }
      );
    }
  },

  onSlideLeave: function( anchorLink, index, slideIndex, direction) {
    if(anchorLink == 'fifthSection' && slideIndex == 1) {
      $.fn.fullpage.setAllowScrolling(true, 'up');
      $header_top.css('background', 'rgba(0, 47, 77, .3)');
      $nav.css('background', 'rgba(0, 47, 77, .25)');
    }
  } 
});