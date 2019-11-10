
let littleBaby = [];
let gallery = [];
let videos = [];
let counter = 1;
let eventsCounter = 1;
let galleryCounter = 1;
let videosCounter = 1;

let out;

let lang = 1;

let valid;
let d = new Date();
let currentYear = d.getFullYear();

$(document).ready(function (event) {

    loadJson();

    setInterval(function(){
        calculateInterval();
    }, 1000);

    if (window.location.href.indexOf("lang=he") > -1) {
        setTimeout(function(){
            changeToHeb();
            window.history.pushState('page2', 'Title', 'index.html');
        }, 600)
    }

    $('#langBtnHe').click(function () {
        changeToHeb();
    })

    $('#langBtnEn').click(function () {
        changeToEng();
    })

    if ($(window).width() > 765) {

        $('#girlWrapper').hover(function() {
            $('#girlThoughtWrapper').fadeIn('fast');
            
        }, function(){
            $('#girlThoughtWrapper').fadeOut('fast');
        })

        $('#girlWrapper2').hover(function() {
            $('#girlThoughtWrapper2').fadeIn('fast');
            
        }, function(){
            $('#girlThoughtWrapper2').fadeOut('fast');
        })
    }

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }

    window.onscroll = function () {
        scrollBtn();
    }

    $('.Xbtn').click(function () {
        $(this).parent().parent().hide();
    })

    setTimeout(function () {
        $('.spinnerWrapper').hide();
        $('.searchContainer').show();
        $('#eventContainer').css('display', 'flex');
    }, 1500);
});

function showBaby() {
    $('.container').empty();
    littleBaby = [];
    gallery = [];
    videos = [];
    counter = 1;
    $('.spinnerWrapper').show();
    
    loadJson();

    setInterval(function(){
        calculateInterval();
    }, 1000);

    eventsCounter = 1;
    galleryCounter = 1;
    videosCounter = 1;
}

function loadJson() {

    $('h2').hide();
    $('#timePassed').hide();
    $('#weeksCount').hide();

    if (lang == 1) {
        $('#timePassedHeader').html('Time Passed');
    } else {
        $('#timePassedHeader').html('זמן שעבר');
    }

    $.get('./lists/littleBaby.txt', function (data) {
        littleBaby.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents('eventsWrapper', $('#eventContainer'), littleBaby, 1);
        }, 500);
    });

    $.get('./lists/gallery.txt', function (data) {
        gallery.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents('galleryContainer', $('#galleryContainer'), gallery, 2);
        }, 1500);
    });

    $.get('./lists/videos.txt', function (data) {
        videos.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents('videoWrapper', $('#videoContainer'), videos, 3);
            $('.spinnerWrapper').hide();
        }, 1500);
    });

    setTimeout(function () {
        $('h2').show();
        $('#timePassed').show();
        $('#weeksCount').show();
    }, 1000)
}

Date.testTime = function(date1, date2) {
    let b = moment(date1);
    let a = moment(date2);

    intervals = ['months','weeks','days', 'hours', 'minutes', 'seconds'],
    out = [];

    for(var i = 0; i < intervals.length; i++) {
        var diff = a.diff(b, intervals[i]);
        b.add(diff, intervals[i]);
        out.push(diff + ' ' + intervals[i]);
    }

    if (lang == 1) {
        for (let x = 0; x < out.length; x++) {

            if (out[x].includes("1 ")) {  
                if (out[x].includes("11 ") || out[x].includes("21 ") ||out[x].includes("31 ") ||out[x].includes("41 ") ||out[x].includes("51 ")) {
                    
                } else {
                    out[x] = out[x].substring(0, out[x].length - 1);
                }
            }
        }

    } else {

        for (let u = 0; u < out.length; u++) {
            out[u] = out[u].replace('months', 'חודשים');
            out[u] = out[u].replace('weeks', 'שבועות');
            out[u] = out[u].replace('days', 'ימים');
            out[u] = out[u].replace('hours', 'שעות');
            out[u] = out[u].replace('minutes', 'דקות');
            out[u] = out[u].replace('seconds', 'שניות');

        }
    }

    out = out.join(', ');
    return out;
   
}

Date.testTime2 = function(date1, date2) {
    let b = moment(date1);
    let a = moment(date2);

    intervals2 = ['weeks','days', 'hours', 'minutes', 'seconds'],
    out2 = [];

    
    for(var j = 0; j < intervals2.length; j++) {
        var diff2 = a.diff(b, intervals2[j]);
        b.add(diff2, intervals2[j]);
        out2.push(diff2 + ' ' + intervals2[j]);
    }

    if (lang == 1) {

        for (let z = 0; z < out2.length; z++) {

            if (out[z].includes("1 ")) {  
                if (out2[z].includes("11 ") || out2[z].includes("21 ") ||out2[z].includes("31 ") ||out2[z].includes("41 ") ||out2[z].includes("51 ")) {
                    
                } else {
                    out2[z] = out2[z].substring(0, out2[z].length - 1);
                }
            }
        }
    } else {

        for (let y = 0; y < out2.length; y++) {
            out2[y] = out2[y].replace('months', 'חודשים');
            out2[y] = out2[y].replace('weeks', 'שבועות');
            out2[y] = out2[y].replace('days', 'ימים');
            out2[y] = out2[y].replace('hours', 'שעות');
            out2[y] = out2[y].replace('minutes', 'דקות');
            out2[y] = out2[y].replace('seconds', 'שניות');

            if (out2[y].includes("1 ")) {  
                if (out2[y] = out2[y].includes("11 ") || out2[y].includes("21 ") || out2[y].includes("31 ") || out2[y].includes("41 ") || out2[y].includes("51 ")) {
                    
                } else {
                    out2[y] = out2[y].replace('חודשים', 'חודש');
                    out2[y] = out2[y].replace('שבועות', 'שבוע');
                    out2[y] = out2[y].replace('ימים', 'יום');
                    out2[y] = out2[y].replace('שעות', 'שעה');
                    out2[y] = out2[y].replace('דקות', 'דקה');
                    out2[y] = out2[y].replace('שניות', 'שניה');
                }
            }
        }
    }

    out2 = out2.join(', ');
    return out2;
}

function calculateInterval() {
    let start = new Date(2019, 06, 09);
    let end = new Date();
   
    let finalDate = Date.testTime(start, end);
    let withoutMonths = finalDate.substr(finalDate.indexOf(',') + 1);
    let withoutWeeks = withoutMonths.substr(withoutMonths.indexOf(',') + 1);
    let withoutDays = withoutWeeks.substr(withoutWeeks.indexOf(',') + 1);
    let withoutHours = withoutDays.substr(withoutDays.indexOf(',') + 1);
    let months = finalDate.substr(0, finalDate.indexOf(','));
    let weeks = withoutMonths.substr(0, withoutMonths.indexOf(','));
    let days = withoutWeeks.substr(0, withoutWeeks.indexOf(','));
    let hours = withoutDays.substr(0, withoutDays.indexOf(','));
    let minutes = withoutHours.substr(0, withoutHours.indexOf(','));
    let seconds = withoutHours.substr(withoutHours.indexOf(',') + 1);

    $('#timePassed').html(finalDate);

    let finalDate2 = Date.testTime2(start, end);
    let weeks2 = finalDate2.substr(0, finalDate2.indexOf(','));
    let weeks3 = weeks2.substr(0, weeks2.indexOf(' '));
    let withoutWeeks2 = finalDate2.substr(finalDate2.indexOf(',') + 1);
    let days2 = withoutWeeks2.substr(0, withoutWeeks2.indexOf(','));
    if (lang == 1) {
        $('#weeksCount').html('Week: ' + weeks3 + ' And' + days2);
    } else {
        $('#weeksCount').html('שבוע: ' + weeks3 + ' ו' + days2);
    }
 }

function buildEvents(div, wrapper, arr, num) {

    var littleBaby;
    var headerText;
    var containerToAppend;
    var eventClass;

    switch(num) {
        case 1:
            littleBaby = arr[0].littleBaby;
            if (lang == 1) {
                headerText = 'Events';
            } else {
                headerText = 'אירועים';
            }

        break;
        case 2:
            littleBaby = arr[0].gallery;
            if (lang == 1) {
                headerText = 'Gallery';
            } else {
                headerText = 'גלריה';
            }
        break;
        case 3:
            littleBaby = arr[0].videos;
            if (lang == 1) {
                headerText = 'Videos';
            } else {
                headerText = 'סרטונים';
            }
        break;
    }

    var newDate = new Date();
    var year = newDate.getFullYear();

    var header = $('<h2>', {
        text: headerText
    }).appendTo(wrapper);

    var btnWrapper = $('<div>', {
        class: 'btnWrapper'
    }).appendTo(wrapper);

    var sortContainer = $('<div>', {
        class: 'sortContainer',
    }).appendTo(btnWrapper);

    var sortContent = $('<div>', {
        class: 'sortContent',
    }).appendTo(sortContainer);

    let sortBtnText;
    let dateSortBtnText;
    let nameSortText;
    let groupSortBtnText;

    if (lang == 1) {
        sortBtnText = 'Sort';
        dateSortBtnText = 'By Date';
        nameSortText = 'By Name';
        groupSortBtnText = 'By Group';
    } else {
        sortBtnText = 'סדר';
        dateSortBtnText = 'לפי תאריך';
        nameSortText = 'לפי שם';
        groupSortBtnText = 'לפי קבוצה';
    }

    var sortBtn = $('<button>', {
        class: 'sortBtn',
        text: sortBtnText,
        click: function () {
            sort($(this).parent().parent(), num);
        }
    }).appendTo(btnWrapper);

    var dateSortBtn = $('<button>', {
        class: 'dateSortBtn',
        text: dateSortBtnText,
        click: function () {
            sortEvents($(wrapper), 'date', 1);
        }
    }).appendTo(sortContent);

    switch(num) {
        case 1:
            var nameSortBtn = $('<button>', {
                class: 'nameSortBtn',
                text: nameSortText,
                click: function () {
                    sortEvents($(wrapper), 'name', 2);
                }
            }).appendTo(sortContent);
        
            var groupSortBtn = $('<button>', {
                class: 'groupSortBtn',
                text: groupSortBtnText,
                click: function () {
                    sortEvents($(wrapper), 'group', 3);
                }
            }).appendTo(sortContent);
            break;

        case 2:
            var galleryWrapper = $('<div>', {
                class: 'galleryWrapper',
            }).appendTo(wrapper);
            break;
        case 3:
            var videoWrapper = $('<div>', {
                class: 'videoWrapper',
            }).appendTo(wrapper);
            break;
    }

    for (var i = 0; i < littleBaby.length; i++) {

        switch(num) {
            case 1:
                var groupStr = JSON.stringify(littleBaby[i].group);
                var group = groupStr.substring(0, groupStr.indexOf('.'));
        
                var groupWrapper;
                eventClass = 'eventWrapper';
                if ($(groupWrapper).hasClass("group" + group)) {
        
                } else {
                    groupWrapper = $('<div>', {
                        class: "group" + group + ' groupWrapper'
                    }).appendTo(wrapper);
                    containerToAppend = groupWrapper;
                }
                break;
    
            case 2:
                containerToAppend = galleryWrapper;
                eventClass = 'galleryImgWrapper';
                break;
            case 3:
                containerToAppend = videoWrapper;
                eventClass = 'videoContainer';
                break;
        }

        var date = new Date(littleBaby[i].date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var yearToShow = date.getFullYear();

        if (day < 10) {
            day = '0' + day
        } else {
            day = day;
        }

        if (month < 10) {
            month = '0' + month
        } else {
            month = month;
        }

        var dateForShow = day + '/' + month + '/' + yearToShow;

        switch (num) {
            case 1:
                var eventWrapper = $('<div>', {
                    class: eventClass,
                    'date': littleBaby[i].date,
                    'dateText': dateForShow,
                    'name': littleBaby[i].name,
                    'nameHeb': littleBaby[i].nameHeb,
                    'group': littleBaby[i].group,
                    'img': littleBaby[i].image,
                    'colorGroup': littleBaby[i].colorGroup,
                    'place': littleBaby[i].place,
                    'googleMap': littleBaby[i].map,
                    click: function () {
                        if ($(this).attr('googleMap') !== undefined) {
                            $('.mapWrapper').show();
                            $('.eventPlacePop').hide();
                            if (lang == 1) {
                                $('.mapPlace').html('Where? ');
                            } else {
                                $('.mapPlace').html('איפה? ');
                            }

                            $('.eventMapPop').attr('href', $(this).attr('googleMap'));
                        } else {
                            $('.mapWrapper').hide();
                            $('.eventPlacePop').show();
                            if (lang == 1) {
                                $('.eventPlacePop').html('Where? ' + $(this).attr('place'));
                            } else {
                                $('.eventPlacePop').html('איפה? ' + $(this).attr('place'));
                            }

                            $('.eventMapPop').attr('href', '#');
                        }
                        $('.eventMapPop').html($(this).attr('place'));
                        if (lang == 1) {
                            $('.eventNamePop').html($(this).attr('name'));
                            $('.eventDatePop').html('Date: ' + $(this).attr('dateText'));
                        } else {
                            $('.eventNamePop').html($(this).attr('nameHeb'));
                            $('.eventDatePop').html('תאריך: ' + $(this).attr('dateText'));
                        }
   
                        $('#eventCover').attr('src', ('./images' + $(this).attr('img'))).show();
                        $('#eventDetails').fadeIn(150);
                    }
                }).appendTo(containerToAppend);

                if ($(eventWrapper).attr('colorGroup') % 2 == 0) {
                    $(eventWrapper).addClass('odd');
                } else {
                    $(eventWrapper).addClass('even');
                }
                break;
            case 2:
                    var eventWrapper = $('<div>', {
                        class: eventClass,
                        'date': littleBaby[i].date,
                        'dateText': dateForShow,
                        'name': littleBaby[i].name,
                        'nameHeb': littleBaby[i].nameHeb,
                        'group': littleBaby[i].group,
                        'img': littleBaby[i].image,
                        'colorGroup': littleBaby[i].colorGroup,
                        'place': littleBaby[i].place,
                        'googleMap': littleBaby[i].map,
                        click: function () {
                            if ($(this).attr('googleMap') !== undefined) {
                                $('.mapWrapper').show();
                                $('.eventPlacePop').hide();
                                if (lang == 1) {
                                    $('.mapPlace').html('Where? ');
                                } else {
                                    $('.mapPlace').html('איפה? ');
                                }
     
                                $('.eventMapPop').attr('href', $(this).attr('googleMap'));
                            } else {
                                $('.mapWrapper').hide();
                                $('.eventPlacePop').show();
                                if (lang == 1) {
                                    $('.eventPlacePop').html('Where? ' + $(this).attr('place'));
                                } else {
                                    $('.eventPlacePop').html('איפה? ' + $(this).attr('place'));
                                }

                                $('.eventMapPop').attr('href', '#');
                            }
                            $('.eventMapPop').html($(this).attr('place'));
                            if (lang == 1) {
                                $('.eventDatePop').html('Date: ' + $(this).attr('dateText'));
                                $('.eventNamePop').html($(this).attr('name'));
                            } else {
                                $('.eventDatePop').html('תאריך: ' + $(this).attr('dateText'));
                                $('.eventNamePop').html($(this).attr('nameHeb'));
                            }
                            $('#eventCover').attr('src', ('./images' + $(this).attr('img'))).show();
                            $('#eventDetails').fadeIn(150);
                        }
                    }).appendTo(containerToAppend);
                break;
            case 3:
                var eventWrapper = $('<div>', {
                    class: eventClass,
                    'date': littleBaby[i].date,
                    'dateText': dateForShow,
                    'name': littleBaby[i].name,
                    'nameHeb': littleBaby[i].nameHeb,
                    'group': littleBaby[i].group,
                    'img': littleBaby[i].image,
                    'video': littleBaby[i].video,
                    'type': littleBaby[i].type,
                    'colorGroup': littleBaby[i].colorGroup,
                    'place': littleBaby[i].place,
                }).appendTo(containerToAppend);
                break;
        }

        switch(num) {
            case 1:
                var finalName;
                if (lang == 1) {
                    finalName = littleBaby[i].name;
                } else {
                    finalName = littleBaby[i].nameHeb;
                }

                var finalDate;
                if (lang == 1) {
                    finalDate = 'Date: ' + dateForShow
                } else {
                    finalDate = 'תאריך: ' + dateForShow
                }

                var eventName = $('<p>', {
                    class: 'eventName',
                    text: finalName
                }).appendTo(eventWrapper);
        
                var eventDate = $('<p>', {
                    class: 'eventDate',
                    text: finalDate
                }).appendTo(eventWrapper);
        
                var eventImgWrapper = $('<div>', {
                    class: 'eventImgWrapper',
                }).appendTo(eventWrapper);
        
                var eventImg = $('<img>', {
                    class: 'eventImg',
                    alt: 'eventImg',
                    src: './images' + littleBaby[i].image
                }).appendTo(eventImgWrapper);
                break;
    
            case 2:
                var galleryImg = $('<img>', {
                    class: 'galleryImg',
                    src: './images' + littleBaby[i].image
                }).appendTo(eventWrapper);
                break;
            case 3:

                var refreshClass;

                $.each($('.videoContainer'), function (key, value) {
                    if ($(this).attr('type') == 'mobile') {
                        $(this).addClass('mobileVideo');
                        refreshClass = 'mobileRefresh';
                    } else {
                        $(this).addClass('desktopVideo');
                        refreshClass = 'desktopRefresh';
                    }
                });

                let finalVideoName;

                if (lang == 1) {
                    finalVideoName = littleBaby[i].name;
                } else {
                    finalVideoName = littleBaby[i].nameHeb;
                }
                
                var videoHeader = $('<h3>', {
                    class: 'videoHeader',
                    text: finalVideoName
                }).appendTo(eventWrapper);

                var playPauseWrapper = $('<div>', {
                    class: 'playPauseWrapper',
                }).appendTo(eventWrapper);
        
                var playVideoBtn = $('<img>', {
                    class: 'playVideoBtn',
                    src: './images/playPause2.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);

                        $(thisVideo).on('ended', function() {
                            $(thisVideo)[0].currentTime = 0;
                            $(thisVideo).parent().find($('.refreshWrapper')).css('display', 'flex');
                        })

                        if (thisVideo.paused) {
                            $.each($('.video'), function (key, value) {
                                $(this).trigger('pause');
                            });
                            $(thisVideo).trigger('play');
                            $(thisVideo).parent().find($('.refreshWrapper')).css('display', 'none');
                        } else {
                            $(thisVideo).trigger('pause');
                            $(thisVideo).parent().find($('.refreshWrapper')).css('display', 'flex');
                        }
                    }
                }).appendTo(playPauseWrapper);
        
                var rewindBtn = $('<img>', {
                    class: 'rewindBtn',
                    src: './images/stop.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);
                        $(thisVideo).trigger('pause');
                        $(thisVideo)[0].currentTime = 0;
                        $(thisVideo).parent().find($('.refreshWrapper')).css('display', 'none');
                    }
                }).appendTo(playPauseWrapper);

                var refreshWrapper = $('<div>', {
                    class: 'refreshWrapper ' + refreshClass,
                }).appendTo(eventWrapper);

                var refreshBtn = $('<img>', {
                    class: 'refreshBtn',
                    src: './images/refresh.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);
                        $.each($('.video'), function (key, value) {
                            $(this).trigger('pause');
                        });
                        $(thisVideo)[0].currentTime = 0;
                        $(thisVideo).trigger('play');
                        $(thisVideo).parent().find($('.refreshWrapper')).css('display', 'none');
                    }
                }).appendTo(refreshWrapper);
        
                var video = $('<video>', {
                    class: 'video',
                    id: littleBaby[i].name,
                    src: './videos' + littleBaby[i].video,
                    click: function () {
                        $('.mapWrapper').hide();
                        $('.eventPlacePop').show();
                        $('.eventMapPop').attr('href', '#');
                        if (lang == 1) {
                            $('.eventDatePop').html('Date: ' + $(this).parent().attr('dateText'));
                            $('.eventPlacePop').html('Where? ' + $(this).parent().attr('place'));
                            $('.eventNamePop').html($(this).parent().attr('name'));
                        } else {
                            $('.eventDatePop').html('תאריך: ' + $(this).parent().attr('dateText'));
                            $('.eventPlacePop').html('איפה? ' + $(this).parent().attr('place'));
                            $('.eventNamePop').html($(this).parent().attr('nameHeb'));
                        }

                        $('#eventCover').hide();
                        $('#eventDetails').fadeIn(150);
                    }
                }).appendTo(eventWrapper);
        
                break;
        }
    }
}

function sort(div, num) {

    $.each($('.sortContainer'), function (key, value) {
        $(this).fadeOut('fast');
    });

    switch (num) {
        case 1:
            if (eventsCounter == 1) {
                $(div).find($('.sortContainer')).fadeIn('fast');
                eventsCounter = 2;
                galleryCounter = 1;
                videosCounter = 1;
            } else {
                $(div).find($('.sortContainer')).fadeOut('fast');
                eventsCounter = 1;
            }
            break;
        case 2:
            if (galleryCounter == 1) {
                $(div).find($('.sortContainer')).fadeIn('fast');
                galleryCounter = 2;
                eventsCounter = 1;
                videosCounter = 1;
            } else {
                $(div).find($('.sortContainer')).fadeOut('fast');
                galleryCounter = 1;
            }
            break;
        case 3:
            if (videosCounter == 1) {
                $(div).find($('.sortContainer')).fadeIn('fast');
                videosCounter = 2;
                eventsCounter = 1;
                galleryCounter = 1;
            } else {
                $(div).find($('.sortContainer')).fadeOut('fast');
                videosCounter = 1;
            }
            break;
    }
}

function goToTop() {
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

function scrollBtn() {

    if ($(this).scrollTop() > 550) {
        $('.goToTopBtn').fadeIn();
    }
    else {
        $('.goToTopBtn').fadeOut();
    }
}

function sortEvents(container, elem1, kind) {

    var btnWrapper = $(container).find($('.btnWrapper'));

    if ($(btnWrapper).attr('kind') == kind) {

    } else {
        $(btnWrapper).attr('kind', kind);
        counter = 1;
    }

    if (kind == 3) {
        $('#eventContainer').empty();
        $('#galleryContainer').empty();
        $('#videoContainer').empty();
    }

    $.each($(container), function (key, value) {
        var ids = [], obj, i, len;
        var children;

        switch ($(container).attr('id')) {
            case 'eventContainer':
                children = $(this).find('.eventWrapper');
                break;
            case 'galleryContainer':
                children = $(this).find('.galleryImgWrapper');
                break;
            case 'videoContainer':
                children = $(this).find('.videoContainer');
                break;
        }

        for (i = 0, len = children.length; i < len; i++) {
            obj = {};
            obj.element = children[i];
            var elem2 = $(children[i]).attr(elem1);
            switch (kind) {
                case 1:
                    obj.idNum = new Date(elem2);
                    break;
                case 2:
                    obj.idNum = elem2;
                    break;
            }
            ids.push(obj);
        }

        switch (kind) {
            case 1:
                switch (counter) {
                    case 1:
                        ids.sort(function (a, b) { return (a.idNum - b.idNum); });
                        counter = 2;
                        break;
                    case 2:
                        ids.sort(function (a, b) { return (b.idNum - a.idNum); });
                        counter = 1;
                        break;
                }
                $(btnWrapper).attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 2:
                switch (counter) {
                    case 1:
                        ids.sort(function (a, b) {
                            if (a.idNum > b.idNum) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });

                        counter = 2;
                        break;

                    case 2:
                        ids.sort(function (a, b) {
                            if (a.idNum < b.idNum) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });
                        counter = 1;
                        break;
                }
                $(btnWrapper).attr('kind', kind);
                $('.groupSortBtn').css('pointer-events', 'all');
                break;
            case 3:
                $('.spinnerWrapper').show();
                $('h2').hide();
                $('#timePassed').hide();
                $('#weeksCount').hide();
                $('.groupSortBtn').css('pointer-events', 'none');
                setTimeout(function () {
                    littleBaby = [];
                    gallery = [];
                    videos = [];
                    loadJson();
                    // $('.spinnerWrapper').hide();
                }, 500);
                break;
        }

        for (i = 0; i < ids.length; i++) {
            $(this).append(ids[i].element);
        }
    });
    $('.sortContainer').fadeOut('fast');
    eventsCounter = 1;
    galleryCounter = 1;
    videosCounter = 1;
}

function removePopup(container) {

    $(document).mouseup(function (e) {
        if (container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            e.stopPropagation();
            $(document).off('mouseup');
        }
    })
}

function closeCurrentPopup(that) {
    $($(that)[0].parentElement.parentElement.parentElement).hide();
}
