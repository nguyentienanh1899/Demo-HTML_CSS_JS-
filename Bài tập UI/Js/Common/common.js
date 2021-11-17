class CommonFn {
    static FormatMoney(money) {
        money = CommonFn.FormatNumber(money);
        if (money) {
            money.replaceAll(".", "");

            let onlynumber = '';
            for (var i = 0; i < money.length; i++) {
                if (!isNaN(parseInt(money[i]))) {
                    onlynumber += money[i];
                }
            }
            return (Number(onlynumber).toLocaleString('vi'));
        }
        return 0;
    }
    static FormatNumber(number) {
        number += "";
        if (number != null) {
            number.replaceAll(".", "")

            let onlynumber = '';
            for (var i = 0; i < number.length; i++) {
                if (!isNaN(parseInt(number[i]))) {
                    onlynumber += number[i];
                }
            }
            return onlynumber;
        }
        return 0;
    }
    static FormatDateDMY(date) {
        date = new Date(date);
        return ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

    }
    static FormatDateYMD(date) {
        date = new Date(date);
        return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);

    }
    static FormatWorkStatus(status) {
        var workStatus = ""
        switch (status) {
            case 0:
                workStatus = Resource.VN.WorkStatus.Testing
                break
            case 1:
                workStatus = Resource.VN.WorkStatus.Working
                break
            case 2:
                workStatus = Resource.VN.WorkStatus.Quitted
                break
            default:
                workStatus = ""
                break
        }
        return workStatus;
    }
    static showToastMsg(msg) {
        var toastHTMl = $(`<div class="toast-msg">
                        <div class="toast-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="toast-text">
                            ${msg}
                        </div>
                        <i class="fas fa-times"></i>
                    </div>`)
        $('.toast-message-zone').append(toastHTMl)
        setTimeout(() => {
            toastHTMl.remove()
        }, 2000);
    }
    static FormatGender(Gender){
        var gender = "";
        switch (Gender){
            case 0:
                gender = Resource.VN.Gender.Female
                break;
            case 1:
                gender  = Resource.VN.Gender.Male
                break
            default:
                gender  = ""
                break
        }
        return gender;
    }
    
    /*    static showMsg() {
   
       }
   
       static showToastMsg(msg) {
           // Định nghĩ HTML cho toastMsg:
           let tsHTML = $(`<div class="m-toast-msg">
                   <div class="toast-icon"></div>
                   <div class="toast-text">${msg}</div>
               </div>`);
           $('body').append(tsHTML);
           setTimeout(() => {
               tsHTML.remove();
           }, 3000);
           
       }
       static showErroMsg(msg) {
   
       } */
}