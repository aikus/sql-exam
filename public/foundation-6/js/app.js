$(document).foundation()
$('.timer').timer();
$('.tabs-content, .accordion').each((i, elem) => {
    $(elem).foundation();
})