class Validate{
    /**Validate dữ liệu
    * Author:NTAnh(14/10)
    */
   static validateRequired() {
       let isValid = true;
       // Validate cho trường mã khách hàng.
       var customerCodeField = $('#txtCustomerCode');
       const customerCode = customerCodeField.val();
       var toolTipText = customerCodeField.siblings('.tooltiptext');
       if (customerCode == "") {
           customerCodeField.addClass('input-notvalid');
           customerCodeField.focus();
           customerCodeField.parent().addClass('error');
           isValid = false;
           toolTipText.text('Đây là trường không được bỏ trống');
           console.log( `toolTipText:${toolTipText}`);
           //Message cảnh báo lỗi.
           //Title lỗi hiện trên ô input.
       }
       else {
           //Remove Tittle hiện trên ô input.
           //Remove cảnh báo lỗi message.
            toolTipText.text('');
           customerCodeField.removeClass('input-notvalid');
           customerCodeField.parent().removeClass('error');
       }
       // Validate cho trường họ và tên:
       var fullnameCodeField = $('#txtFullNameCode');
       const fullnameCode = fullnameCodeField.val();
       toolTipText = fullnameCodeField.siblings('.tooltiptext');
       if (fullnameCode == "") {
           isValid = false;
           fullnameCodeField.addClass('input-notvalid');
           fullnameCodeField.focus();
           toolTipText.text('Đây là trường không được bỏ trống');
           fullnameCodeField.parent().addClass('error');
           //Message cảnh báo lỗi.
           //Title lỗi hiện trên ô input.
       }
       else {
           //Remove Tittle hiện trên ô input.
           //Remove cảnh báo lỗi message.
           toolTipText.text('');
           fullnameCodeField.removeClass('input-notvalid');
           fullnameCodeField.parent().removeClass('error');
       }
       //Validate cho Chứng minh nhân dân:
       var cccdCodeField = $('#textCCCD');
       const cccdCode = cccdCodeField.val();
       toolTipText = cccdCodeField.siblings('.tooltiptext');
       if (cccdCode == "") {
           isValid = false;
           cccdCodeField.addClass('input-notvalid');
           cccdCodeField.focus();
           toolTipText.text('Đây là trường không được bỏ trống');
           cccdCodeField.parent().addClass('error');
       }
       else {
            toolTipText.text('');
           cccdCodeField.removeClass('input-notvalid');
           cccdCodeField.parent().removeClass('error');
       }
       //Validate cho Email.
       var emailCodeField = $('#txtEmailCode');
       const emailCode = emailCodeField.val();
       toolTipText = emailCodeField.siblings('.tooltiptext');
       const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if (emailCode == "" || em.test(emailCode) == false) {
           isValid = false;
           emailCodeField.addClass('input-notvalid');
           emailCodeField.focus();
           toolTipText.text('Đây là trường không được bỏ trống và viết đúng định dạng');
           emailCodeField.parent().addClass('error');
       }
       else {
            toolTipText.text('');
           emailCodeField.removeClass('input-notvalid');
           emailCodeField.parent().removeClass('error');
       }
       //Validate số điện thoại viet nam
       var phonenumberCodeField = $('#txtPhoneNumberCode');
       var phonenumberCode = phonenumberCodeField.val();
       toolTipText = phonenumberCodeField.siblings('.tooltiptext');
       const pn = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
       if (phonenumberCode == "" || pn.test(phonenumberCode) == false) {
           isValid = false;
           phonenumberCodeField.addClass('input-notvalid');
           phonenumberCodeField.focus();
           toolTipText.text('Đây là trường không được bỏ trống và viết đúng định dạng');
           phonenumberCodeField.parent().addClass('error');
       }
       else {
            toolTipText.text('');
           phonenumberCodeField.removeClass('input-notvalid');
           phonenumberCodeField.parent().removeClass('error');
       }
       return isValid;
   }
}