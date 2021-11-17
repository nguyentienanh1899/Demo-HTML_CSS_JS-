$(document).ready(function(){
    comboboxInitEvent();
})
function comboboxInitEvent(){
    // 1. Tạo phương thức cho element với data:
    // $('div#cbxTest').data("test",1);
    $.fn.getValue = function() {
        var el = this;
        if (el.hasClass('m-combobox')) {
            return el.data('value');
        }
        // this.css( "border-bottom", "1px solid #000" );
     };
    //Tạo sự kiện cho button.
    $('.m-combobox-button').click(comboboxButtonOnClick);
    //Tạo sự kiện lựa chọn các item
    $('.m-combobox').on('click','.m-combobox-item',function(){
        itemComboboxSelect($(this))
    });
}
function comboboxButtonOnClick(){
    let comboboxButton = $(this);
    //Hiển thị data để lựa chọn.
    //1.Lấy boxdata cùng cấp trong Element cha hiện tại.
    var boxData = comboboxButton.siblings('.m-combobox-select');
    thisArrow = comboboxButton.find('.arrow');
    if (thisArrow.hasClass('rot-180')) {
        boxData.slideUp();
        thisArrow.removeClass('rot-180');
        thisArrow.addClass('rot-0');
    } else {
        boxData.slideDown();
        thisArrow.removeClass('rot-0');
        thisArrow.addClass('rot-180');
    }
}
function itemComboboxSelect(itemSelected){
    const text = itemSelected.text();
    //Lấy ra cha:
    let parentElement = itemSelected.parent();
    parentElement.siblings('input').val(text);
    const value = itemSelected.attr('value');
    console.log( itemSelected,itemSelected.parents('.m-combobox'), "")
    //Gán lại value cho element combobox(là ông của item hiện tại)
    itemSelected.parents('.m-combobox').attr('value',value);
    itemSelected.parents('.m-combobox').data("value",value);
    itemSelected.parents('.m-combobox')[0].getValue = function(){
        alert(value);
    };
    //Gán lại Class Selected lại cho các item được chọn
    item = itemSelected.siblings(".m-item-selected");
    item.removeClass('m-item-selected');
    itemSelected.addClass('m-item-selected');
    
    parentElement.slideUp(); 
    thisArrow.removeClass('rot-180');
    thisArrow.addClass('rot-0');
}
