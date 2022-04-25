$.fn.timer = function () {
    const limit = this.data('limit');
    if (!limit) {
        $(this).hide();
        return;
    }
    const $this = $(this);
    const timer = $('<div>');

    $.getScript('/timer/jquery.countdown-2.2.0/jquery.countdown.min.js').done(() => {
        const finalDate = new Date().getTime() + limit * 1000 - 500;
        timer.countdown(finalDate)
            .on('update.countdown', (event) => {
                timer.html(event.strftime("Осталось %H:%M:%S"));
            })
            .on('finish.countdown', (event) => {
                timer.html('Время истекло');
            })
    });
    const close = $('<button class="close-button" aria-label="Скрыть таймер" type="button" data-close>\n' +
        '<span aria-hidden="true">&times;</span>\n' +
        '</button>'),
        parent = $('<div></div>'),
        open = $('<a href="#" class="timer-open">Показать таймер</a>'),
        storageKey = 'timer-state',
        showTimer = (time) => {
            open.hide(time);
            parent.show(time);
            localStorage.setItem(storageKey, 'show');
        },
        hideTimer = (time) => {
            parent.hide(time);
            open.show(time);
            localStorage.setItem(storageKey, 'hide');
        },
        animationTime = 100;
    parent.append(timer);
    parent.append(close);
    $this.append(parent);
    $this.append(open);
    close.click(() => hideTimer(animationTime));
    open.click(() => showTimer(animationTime));
    if(localStorage.getItem(storageKey) === 'hide') {
        hideTimer(0);
    } else {
        showTimer(0);
    }
}