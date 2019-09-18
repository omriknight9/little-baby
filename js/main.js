
var littleMan = [];
var gallery = [];
var videos = [];
var counter = 1;
var eventsCounter = 1;
var galleryCounter = 1;
var videosCounter = 1;

var valid;
var d = new Date();
var currentYear = d.getFullYear();

$(document).ready(function (event) {

    loadJson();

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

function loadJson() {
    $.get('./lists/littleBaby.txt', function (data) {
        littleMan.push(JSON.parse(data));
        setTimeout(function () {
            buildEvents('eventsWrapper', $('#eventContainer'), littleMan, 1);
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
}

function buildEvents(div, wrapper, arr, num) {

    var littleBaby;
    var headerText;
    var containerToAppend;
    var eventClass;

    switch(num) {
        case 1:
            littleBaby = arr[0].littleBaby;
            headerText = 'Events';
        break;
        case 2:
            littleBaby = arr[0].gallery;
            headerText = 'Gallery';
        break;
        case 3:
            littleBaby = arr[0].videos;
            headerText = 'Videos';
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

    var sortBtn = $('<button>', {
        class: 'sortBtn',
        text: 'Sort',
        click: function () {
            sort($(this).parent().parent(), num);
        }
    }).appendTo(btnWrapper);

    var dateSortBtn = $('<button>', {
        class: 'dateSortBtn',
        text: 'Sort By Date',
        click: function () {
            sortEvents($(wrapper), 'date', 1);
        }
    }).appendTo(sortContent);

    switch(num) {
        case 1:
            var nameSortBtn = $('<button>', {
                class: 'nameSortBtn',
                text: 'Sort By Name',
                click: function () {
                    sortEvents($(wrapper), 'name', 2);
                }
            }).appendTo(sortContent);
        
            var groupSortBtn = $('<button>', {
                class: 'groupSortBtn',
                text: 'Sort By Group',
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
            case 1: case 2:
                var eventWrapper = $('<div>', {
                    class: eventClass,
                    'date': littleBaby[i].date,
                    'dateText': dateForShow,
                    'name': littleBaby[i].name,
                    'group': littleBaby[i].group,
                    'img': littleBaby[i].image,
                    'colorGroup': littleBaby[i].colorGroup,
                    'place': littleBaby[i].place,
                    'googleMap': littleBaby[i].map,
                    click: function () {
                        if ($(this).attr('googleMap') !== undefined) {
                            $('.mapWrapper').show();
                            $('.eventPlacePop').hide();
                            $('.mapPlace').html('Where? ');
                            $('.eventMapPop').attr('href', $(this).attr('googleMap'));
                        } else {
                            $('.mapWrapper').hide();
                            $('.eventPlacePop').show();
                            $('.eventPlacePop').html('Where? ' + $(this).attr('place'));
                            $('.eventMapPop').attr('href', '#');
                        }
                        $('.eventMapPop').html($(this).attr('place'));
                        $('.eventDatePop').html('Date: ' + $(this).attr('dateText'));
                        $('.eventNamePop').html($(this).attr('name'));
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
                    'group': littleBaby[i].group,
                    'img': littleBaby[i].image,
                    'video': littleBaby[i].video,
                    'type': littleBaby[i].type,
                    'colorGroup': littleBaby[i].colorGroup,
                    'place': littleBaby[i].place,
                }).appendTo(containerToAppend);
                break;
        }

        if ($(eventWrapper).attr('colorGroup') % 2 == 0) {
            $(eventWrapper).addClass('odd');
        } else {
            $(eventWrapper).addClass('even');
        }

        switch(num) {
            case 1:
                var eventName = $('<p>', {
                    class: 'eventName',
                    text: littleBaby[i].name
                }).appendTo(eventWrapper);
        
                var eventDate = $('<p>', {
                    class: 'eventDate',
                    text: 'Date: ' + dateForShow
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
                var playPauseWrapper = $('<div>', {
                    class: 'playPauseWrapper',
                }).appendTo(eventWrapper);
        
                var playVideoBtn = $('<img>', {
                    class: 'playVideoBtn',
                    src: './images/playPause2.png',
                    click: function () {
                        var thisVideo = $(this).parent().parent().find($('.video')).get(0);
        
                        if (thisVideo.paused) {
                            $.each($('.video'), function (key, value) {
                                $(this).trigger('pause');
                            });
                            $(thisVideo).trigger('play');
                        } else {
                            $(thisVideo).trigger('pause');
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
                    }
                }).appendTo(playPauseWrapper);
        
                var video = $('<video>', {
                    class: 'video',
                    id: littleBaby[i].name,
                    src: './videos' + littleBaby[i].video,
                    click: function () {
                        $('.mapWrapper').hide();
                        $('.eventPlacePop').show();
                        $('.eventMapPop').attr('href', '#');
                        $('.eventDatePop').html('Date: ' + $(this).parent().attr('dateText'));
                        $('.eventNamePop').html($(this).parent().attr('name'));
                        $('#eventCover').hide();
                        $('.eventPlacePop').html('Where? ' + $(this).parent().attr('place'));
                        $('#eventDetails').fadeIn(150);
                    }
                }).appendTo(eventWrapper);
        
        
                $.each($('.videoContainer'), function (key, value) {
                    if ($(this).attr('type') == 'mobile') {
                        $(this).addClass('mobileVideo');
                    } else {
                        $(this).addClass('desktopVideo');
                    }
                });
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
                $('.groupSortBtn').css('pointer-events', 'none');
                setTimeout(function () {
                    littleMan = [];
                    gallery = [];
                    videos = [];
                    loadJson();
                    $('.spinnerWrapper').hide();
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
