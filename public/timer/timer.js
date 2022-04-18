$.fn.timer = function () {
    const limit = this.data('limit');
    if (!limit) {
        $(this).hide();
        return;
    }

    $.getScript('/timer/jquery.countdown-2.2.0/jquery.countdown.min.js').done(() => {
        const finalDate = new Date().getTime() + limit * 1000 - 500;
        $(this).countdown(finalDate)
            .on('update.countdown', (event) => {
                $(this).html(event.strftime("Осталось %H:%M:%S"));
            })
            .on('finish.countdown', (event) => {
                $(this).html('Время истекло');
            })
    });
}