//get nth parent
$.fn.nParent = function(n) {
    let p = this;
    for (var i = 0; i < n; i++) p = p.parent();
    return p;
};
/**
 * Sự kiện click vào checkbox trên TR
 */
$('.container-table-employee').on('click', 'table tbody tr td .checkbox', function() {
    let me = this,
        thischeckbox = $(this),
        thistr = thischeckbox.parent().parent();
    thischeckbox.toggleClass('icon-checked')
    thistr.toggleClass('checked')
})
/**
 * Sự kiện click vào checkbox trên TH
 */
 $('.container-table-employee').on('click', 'table thead tr th .checkbox', function() {
    let me = this,
        thischeckbox = $(this),
        alltr = thischeckbox.nParent(4).find('tbody tr'),
        allcheckbox = $('table .checkbox');

    if (thischeckbox.hasClass('icon-checked')) {
        allcheckbox.removeClass('icon-checked')
        alltr.removeClass('checked')
    } else {
        allcheckbox.addClass('icon-checked')
        alltr.addClass('checked')
    }
})
