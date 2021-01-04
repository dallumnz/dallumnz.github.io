$(function () {
    'use strict';

    const time = document.getElementById('time');
    const greeting = document.getElementById('greeting');
    const name = document.getElementById('name');

    function showTime() {
        let today = new Date(),
            hour = today.getHours(),
            min = today.getMinutes(),
            sec = today.getSeconds();
        const amPm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        time.innerHTML = `${hour}<span>:</span>${addLeadZero(min)}<span>:</span>${addLeadZero(sec)}<span>&nbsp;</span>${amPm}`;
        setTimeout(showTime, 1000);
    }

    showTime();

    function addLeadZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    function setGreeting() {
        let today = new Date(),
            hour = today.getHours();
        if (hour < 12){
            greeting.textContent = 'Good morning, ';
            document.body.style.backgroundImage = "url('../img/morning.jpg')";
            document.body.style.backgroundSize = "cover";
        } else if (hour < 18) {
            greeting.textContent = 'Good afternoon, ';
            document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
            document.body.style.backgroundSize = "cover";
        } else if (hour < 21) {
            greeting.textContent = 'Good evening, ';
            document.body.style.backgroundImage = "url('../img/night.jpg')";
            document.body.style.backgroundSize = "cover";
        } else {
            greeting.textContent = 'Sleep well, ';
        }
    }

    setGreeting();

    function setName(e) {
        if (e.type === 'keypress'){
            if (e.which == 13 || e.keycode == 13) {
                localStorage.setItem('name', e.target.innerText);
                name.blur();
            }
        } else {
            localStorage.setItem('name', e.target.innerText);
        }
    }

    function getName() {
        if (localStorage.getItem('name') === null) {
            name.textContent = 'Name';
        } else {
            name.textContent = localStorage.getItem('name');
        }
    }

    getName();

    name.addEventListener('keypress', setName);
    name.addEventListener('blur', setName);

    var setTilesAreaSize = function () {
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var groups = $(".tiles-group");
        var tileAreaWidth = 80;
        $.each(groups, function () {
            if (width <= Metro.media_sizes.LD) {
                tileAreaWidth = width;
            } else {
                tileAreaWidth += $(this).outerWidth() + 80;
            }
        });

        $(".tiles-area").css({
            width: tileAreaWidth
        });

        if (width > Metro.media_sizes.LD) {
            $(".start-screen").css({
                overflow: "auto"
            })
        }
    };

    setTilesAreaSize();


    $.each($('[class*=tile-]'), function () {
        var tile = $(this);
        setTimeout(function () {
            tile.css({
                opacity: 1,
                "transform": "scale(1)",
                "transition": ".3s"
            }).css("transform", false);

        }, Math.floor(Math.random() * 500));
    });

    $(".tiles-group").animate({
        left: 0
    });

    $(window).on(Metro.events.resize + "-start-screen-resize", function () {
        setTilesAreaSize();
    });

    $(window).on(Metro.events.mousewheel, function (e) {
        var up = e.deltaY < 0 ? -1 : 1;
        var scrollStep = 50;
        $(".start-screen")[0].scrollLeft += scrollStep * up;
    });
})
