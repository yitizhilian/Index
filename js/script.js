$(document).ready(function () {
    const navBtns = $('.numbers li');
    const sections = $('.sections > div');
    let currentIndex = 0;
    let inAnimation = false;
    const animationDuration = 750;

    function init(sections, index, translate) {
        sections.each(function (i, o) {
            const currentPosition = i - index;
            if (translate === true) $(o).css('transition', `all ${animationDuration / 1000}s`);
            else $(o).css('transition', 'unset');
            $(o).css({
                'transform': `translate(0, calc(100% * ${currentPosition} + 22px * 2 * ${currentPosition}))`,
            });
        });
        setTimeout(function () {
            inAnimation = false;
            currentIndex = index;
        }, animationDuration);
    }

    function setBtnStyle(index) {
        navBtns.removeClass('active');
        $(navBtns[index]).addClass('active');
    }

    init(sections, currentIndex);
    navBtns.click(function (e) {
        const index = $(this).index();
        setBtnStyle(index);
        init(sections, index, true);
    });
    const scrollEvent = $.debounce(33, true, function (e) {
        if (inAnimation) return this;
        else inAnimation = true;
        const isScrollDown = e.originalEvent.deltaY > 0;
        let nextIndex = currentIndex;
        if(isScrollDown) {
            if(currentIndex + 1 > sections.length - 1) return false;
        } else {
            if(currentIndex - 1 < 0) return false;
        }
        currentIndex = isScrollDown ? currentIndex + 1 : currentIndex - 1;
        setBtnStyle(currentIndex);
        init(sections, currentIndex, true);
    });
    sections.on('mousewheel', scrollEvent);
});