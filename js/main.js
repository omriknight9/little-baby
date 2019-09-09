
var littleMan = [];
var gallery = [];
var videos = [];
var counter = 1;
var sortBtnCounter = 1;

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
            buildEvents('littleManWrapper', $('#eventContainer'), littleMan);
        }, 500);
    });

    $.get('./lists/gallery.txt', function (data) {
        gallery.push(JSON.parse(data));
        setTimeout(function () {
            buildGallery('galleryWrapper', $('#galleryContainer'), gallery);
        }, 1500);
    });

    $.get('./lists/videos.txt', function (data) {
        videos.push(JSON.parse(data));
        setTimeout(function () {
            buildVideos('videoWrapper', $('#videoContainer'), videos);
            $('.spinnerWrapper').hide();
        }, 1500);
    });
}

function buildGallery(div, wrapper, arr) {
    var gallery = arr[0].gallery;
    var newDate = new Date();
    var year = newDate.getFullYear();

    var galleryHeader = $('<h2>', {
        text: 'Gallery'
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
            sort();
        }
    }).appendTo(btnWrapper);

    var dateSortBtn = $('<button>', {
        class: 'dateSortBtn',
        text: 'Sort By Date',
        click: function () {
            sortEvents($('#galleryContainer'), 'date', 1);
        }
    }).appendTo(sortContent);

    var galleryWrapper = $('<div>', {
        class: 'galleryWrapper',
    }).appendTo(wrapper);

    for (var i = 0; i < gallery.length; i++) {


        var galleryImgWrapper = $('<div>', {
            class: 'galleryImgWrapper',
            'date': gallery[i].date,
            'dateText': gallery[i].dateText,
            'name': gallery[i].name,
            'group': gallery[i].group,
            'img': gallery[i].image,
            'place': gallery[i].place,
            'googleMap': gallery[i].map,
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
        }).appendTo(galleryWrapper);

        var galleryImg = $('<img>', {
            class: 'galleryImg',
            src: './images' + gallery[i].image
        }).appendTo(galleryImgWrapper);
    }
}

function buildEvents(div, wrapper, arr) {

    var littleBaby = arr[0].littleBaby;
    var newDate = new Date();
    var year = newDate.getFullYear();

    var eventHeader = $('<h2>', {
        text: 'Events'
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
            sort();
        }
    }).appendTo(btnWrapper);

    var dateSortBtn = $('<button>', {
        class: 'dateSortBtn',
        text: 'Sort By Date',
        click: function () {
            sortEvents($('#eventContainer'), 'date', 1);
            $('.sortContainer').fadeOut('fast');
        }
    }).appendTo(sortContent);

    var nameSortBtn = $('<button>', {
        class: 'nameSortBtn',
        text: 'Sort By Name',
        click: function () {
            sortEvents($('#eventContainer'), 'name', 2);
            $('.sortContainer').fadeOut('fast');
        }
    }).appendTo(sortContent);

    var groupSortBtn = $('<button>', {
        class: 'groupSortBtn',
        text: 'Sort By Group',
        click: function () {
            sortEvents($('#eventContainer'), 'group', 3);
            $('.sortContainer').fadeOut('fast');
        }
    }).appendTo(sortContent);

    for (var i = 0; i < littleBaby.length; i++) {

        var groupStr = JSON.stringify(littleBaby[i].group);
        var group = groupStr.substring(0, groupStr.indexOf('.'));

        var groupWrapper;

        if ($(groupWrapper).hasClass("group" + group)) {

        } else {
            groupWrapper = $('<div>', {
                class: "group" + group + ' groupWrapper'
            }).appendTo(wrapper)
        }

        var eventWrapper = $('<div>', {
            class: 'eventWrapper',
            'date': littleBaby[i].date,
            'dateText': littleBaby[i].dateText,
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
        }).appendTo(groupWrapper);

        if ($(eventWrapper).attr('colorGroup') % 2 == 0) {
            $(eventWrapper).addClass('odd');
        } else {
            $(eventWrapper).addClass('even');
        }

        var eventName = $('<p>', {
            class: 'eventName',
            text: littleBaby[i].name
        }).appendTo(eventWrapper);

        var eventDate = $('<p>', {
            class: 'eventDate',
            text: 'Date: ' + littleBaby[i].dateText
        }).appendTo(eventWrapper);

        var eventImgWrapper = $('<div>', {
            class: 'eventImgWrapper',
        }).appendTo(eventWrapper);

        var eventImg = $('<img>', {
            class: 'eventImg',
            alt: 'eventImg',
            src: './images' + littleBaby[i].image
        }).appendTo(eventImgWrapper);
    }
}

function buildVideos(div, wrapper, arr) {
    var videos = arr[0].videos;
    var newDate = new Date();
    var year = newDate.getFullYear();
    var counter = 1;

    var videoHeader = $('<h2>', {
        text: 'Videos'
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
            sort();
        }
    }).appendTo(btnWrapper);

    var dateSortBtn = $('<button>', {
        class: 'dateSortBtn',
        text: 'Sort By Date',
        click: function () {
            sortEvents($('#videoContainer'), 'date', 1);
        }
    }).appendTo(sortContent);

    var videoWrapper = $('<div>', {
        class: 'videoWrapper',
    }).appendTo(wrapper);

    for (var i = 0; i < videos.length; i++) {

        var videoContainer = $('<div>', {
            class: 'videoContainer',
            'date': videos[i].date,
            'dateText': videos[i].dateText,
            'name': videos[i].name,
            'group': videos[i].group,
            'video': videos[i].video,
            'place': videos[i].place,
            'type': videos[i].type,
        }).appendTo(videoWrapper);

        var playPauseWrapper = $('<div>', {
            class: 'playPauseWrapper',
        }).appendTo(videoContainer);

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
            id: videos[i].name,
            src: './videos' + videos[i].video,
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
        }).appendTo(videoContainer);


        $.each($('.videoContainer'), function (key, value) {
            if ($(this).attr('type') == 'mobile') {
                $(this).addClass('mobileVideo');
            } else {
                $(this).addClass('desktopVideo');
            }
        });
    }
}

function sort() {
    if (sortBtnCounter == 1) {
        $('.sortContainer').fadeIn('fast');
        sortBtnCounter = 2;
    } else {
        $('.sortContainer').fadeOut('fast');
        sortBtnCounter = 1;
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
    sortBtnCounter = 1;
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
