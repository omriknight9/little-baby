function changeToHeb() {

    lang = 2;
    $('#langBtnHe').css('pointer-events', 'none');
    $('#langBtnEn').css('pointer-events', 'all');

    $("head").append("<link rel='stylesheet' type='text/css' href='css/main_he.css' id='hebCss'/>");
    $('title').html('תינוקת קטנה');

    $('h1').hide().html('תינוקת קטנה').fadeIn('slow');

    $('header p').hide().html('זו' + "<span id='girlSpan'> בת!</span>").fadeIn('slow');

    $('.popupBtn').hide().html('סגור').fadeIn('slow');

    showBaby();
}

function changeToEng() {
    lang = 1;
    $('#langBtnEn').css('pointer-events', 'none');
    $('#langBtnHe').css('pointer-events', 'all');

    $('#hebCss').remove();
    $('title').html('Little Baby');

    $('h1').hide().html('Little Baby').fadeIn('slow');

    $('header p').hide().html("It's A"  + "<span id='girlSpan'> Girl!</span>").fadeIn('slow');
    
    $('.popupBtn').hide().html('Close').fadeIn('slow');

    showBaby();
}
