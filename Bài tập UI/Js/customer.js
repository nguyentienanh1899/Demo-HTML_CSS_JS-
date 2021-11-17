$(document).ready(function () {
    let menuItems = document.getElementsByClassName('item');
    for (const item of menuItems) {
        item.addEventListener('click', menuItemOnClick);
    }
    function menuItemOnClick() {
        let parent = this.parentElement;
        let childrens = parent.children;
        for (const chil of childrens) {
            debugger
            chil.classList.remove('item-selected');
        }
        this.classList.add('item-selected')
    }
    loadData();
    initEvents();
})
/**
 * Load dữ liệu khách hàng.
 */
function loadData() {
    try {
        console.log('load dữ liệu!');
        $('table#tbListData tbody').empty();
        // Lấy dữ liệu:
        var customers = data;
        // Build HTML:
        // Duyệt từng đối tượng trong mảng để lấy các thông tin tương ứng cho TRHTML:
        for (const customer of customers) {
            // Xử lý dữ liệu:
            // 1. Ngày tháng (phải thể hiện là ngày/ tháng/ năm) - theo convention:
            let dateOfBirth = customer.DateOfBirth ? new Date( customer.DateOfBirth) :'';
            let dateString = "";

            let gender = customer.Gender;
            let genderName = "";
            switch (gender) {
                case 1:
                    genderName = "Nam";
                    break;
                case 0:
                    genderName = "Nữ";
                    break;
                default:
                    break;
            }
            if (dateOfBirth) { // dateOfBirth != 0,dateOfBirth != null, dateOfBirth != undefined,dateOfBirth!= "";
                let date = dateOfBirth.getDay();
                let month = dateOfBirth.getMonth() + 1;
                let year = dateOfBirth.getFullYear();
                month = month < 10 ? `0${month}` : month;
                date = date < 10 ? `0${date}` : date;
                dateString = `${date}/${month}/${year}`;
            }

            // 2. Tiền tệ (Đối với tiền VN thì phải có phân cách hàng nghìn):
            let salaryText = customer.Salary;
            let salary = CommonFn.FormatNumber(salaryText);
            salary = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(salary);

            let trHTML = $(` 
        <tr>
        <td>${customer.CustomerCode}</td>
        <td>${customer.FullName}</td>
        <td>${genderName}</td>
        <td>${dateString}</td>
        <td>${customer.PhoneNumber}</td>
        <td>${customer.Email}</td>
        <td>${customer.Position}</td>
        <td>${customer.Department}</td>
        <td>${salary}</td>
        <td>${customer.JobStatus}</td>
        </tr>
         `);

            // Xác định Element sẽ append chuỗi HTML vào:
            $('table#tbListData tbody').append(trHTML);
        }
    } catch (error) {
        console.log(error);
    }
}
/**
 * Tạo sự kiện cho các element
 */
function initEvents() {
    let me = this;
    //Tạo sự kiện cho button thêm mới.
    //1.JS thuần:
    /*  document.getElementById('btnAdd').addEventListener('click', function(){
        document.getElementById('dlgCustomerDetail').style.display = 'block';
    })*/
    me.moneyInput();
    //2.Jquery:
    $('#btnAdd').click(function () {
        $('#dlgCustomerDetail').show();
        // Focus vào ô nhập liệu đầu tiên (convention):
        $('#txtCustomerCode').focus();
    })

    //Tạo sự kiện cho nạp dữ liệu
    $('.container-content-filter-right').click(function () {
        loadData();
    })
    // Tạo sự kiện cho button Close của Dialog:
    $('.container-dialog-close').click(function () {
        // Đóng Form:
        $('#dlgCustomerDetail').hide();
    })
    //Tạo sự kiện cho button Cancel:
    $('#btnCancel').click(function () {
        $('#dlgCustomerDetail').hide();
    });
    // Tạo sự kiện cho button Save:
    $('#btnSave').click(btnSaveOnClick);


}
function btnSaveOnClick() {
    //1.Thực hiện validate dữ liệu:
    let isValid = validateRequired();
    //2.Dữ liệu hợp lệ thì thu thập thông tin:
    if (isValid) {
        let customerCode = $('#txtCustomerCode').val();
        let fullName = $('#txtFullNameCode').val();
        let gender = $('#cbxGender').val();
        let CCCD = $('#textCCCD').val();
        let dob = $('#dtDateOfBirth').val();
        let phoneNumber = $('#txtPhoneNumberCode').val();
        let email = $('#txtEmailCode').val();
        let position = $('#cbxPosition').val();
        let department = $('#cbxDepartment')
        let address = $('#txtAddress').val();
        let salary = $('#txtSalary').val();
        let jobStatus = $('#cbxJobStatus').val()

         //3.Build js object:
        let customer = {
            CustomerCode: customerCode,
            FullName: fullName,
            DateOfBirth: dob,
            Gender: gender,
            CustomerGroupName: "Khách Hàng MiSa",
            PhoneNumber: phoneNumber,
            Email: email,
            Position: position,
            Department: department,
            Salary: salary,
            JobStatus: jobStatus
        }
        //4.thêm mới:
        data.push(customer);
        // Load lại dữ liệu:
        loadData();
        // ẩn Form:
        $('#dlgCustomerDetail').hide();
    }
    
}
function validateRequired() {
    let isValid = true;
    // Validate cho trường mã khách hàng.
    var customerCodeField = $('#txtCustomerCode');
    const customerCode = customerCodeField.val();
    if (customerCode == "") {
        customerCodeField.addClass('input-notvalid');
        customerCodeField.focus();
        customerCodeField.parent().addClass('error');
        isValid = false;
        //Message cảnh báo lỗi.
        //Title lỗi hiện trên ô input.
    }
    else {
        //Remove Tittle hiện trên ô input.
        //Remove cảnh báo lỗi message.
        customerCodeField.removeClass('input-notvalid');
        customerCodeField.parent().removeClass('error');
    }
    // Validate cho trường họ và tên:
    var fullnameCodeField = $('#txtFullNameCode');
    const fullnameCode = fullnameCodeField.val();
    if (fullnameCode == "") {
        isValid = false;
        fullnameCodeField.addClass('input-notvalid');
        fullnameCodeField.focus();
        fullnameCodeField.parent().addClass('error');
        //Message cảnh báo lỗi.
        //Title lỗi hiện trên ô input.
    }
    else {
        //Remove Tittle hiện trên ô input.
        //Remove cảnh báo lỗi message.
        fullnameCodeField.removeClass('input-notvalid');
        fullnameCodeField.parent().removeClass('error');
    }
    //Validate cho Chứng minh nhân dân:
    var cccdCodeField = $('#textCCCD');
    const cccdCode = cccdCodeField.val();
    if (cccdCode == "") {
        isValid = false;
        cccdCodeField.addClass('input-notvalid');
        cccdCodeField.focus();
        cccdCodeField.parent().addClass('error');
    }
    else {
        cccdCodeField.removeClass('input-notvalid');
        cccdCodeField.parent().removeClass('error');
    }
    //Validate cho Email.
    var emailCodeField = $('#txtEmailCode');
    const emailCode = emailCodeField.val();
    const em = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailCode == "" || em.test(emailCode) == false) {
        isValid = false;
        emailCodeField.addClass('input-notvalid');
        emailCodeField.focus();
        emailCodeField.parent().addClass('error');
    }
    else {
        emailCodeField.removeClass('input-notvalid');
        emailCodeField.parent().removeClass('error');
    }
    //Validate số điện thoại viet nam
    var phonenumberCodeField = $('#txtPhoneNumberCode');
    var phonenumberCode = phonenumberCodeField.val();
    const pn = /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/;
    if (phonenumberCode == "" || pn.test(phonenumberCode) == false) {
        isValid = false;
        phonenumberCodeField.addClass('input-notvalid');
        phonenumberCodeField.focus();
        phonenumberCodeField.parent().addClass('error');
    }
    else {
        phonenumberCodeField.removeClass('input-notvalid');
        phonenumberCodeField.parent().removeClass('error');
    }
    return isValid;
}
//Format khi nhập ô tiền:
function moneyInput() {
    let me = this,
        thismoney = $('#txtSalary');
        console.log(thismoney);
    try {
        thismoney.on("input", function () {
            console.log('123');
            let myinput = thismoney.val();
            // $(this).css('caret-color', 'black');
            // if (!isNaN(parseFloat(myinput))) {
            //     $(this).css('caret-color', 'red');
            // }
            let res = CommonFn.FormatMoney(myinput);
            thismoney.val(res);
        });
    } catch (error) {

    }
}

var data = [
    {
        CustomerCode: "KH0001",
        FullName: "Nguyễn Tiến Anh",
        DateOfBirth: new Date('1999-11-18'),
        Gender: 1,
        CustomerGroupName: "Khách Hàng MiSa",
        PhoneNumber: "0836300169",
        Email: "nguyentienanh1899@gmail.com",
        Position: "Fresher",
        Department: "Đào tạo",
        Salary: 1000000,
        JobStatus: "Đang làm việc"
    },
    {
        CustomerCode: "KH0002",
        FullName: "Đặng Thanh An",
        DateOfBirth: new Date('1999-11-25'),
        Gender: 0,
        CustomerGroupName: "Khách Hàng MiSa",
        PhoneNumber: "0836300169",
        Email: "nguyentienanh1899@gmail.com",
        Position: "Fresher",
        Department: "Đào tạo",
        Salary: 1000000,
        JobStatus: "Đang làm việc"
    },
    {
        CustomerCode: "KH0003",
        FullName: "Nguyễn Tiến Anh",
        DateOfBirth: new Date('1999-11-18'),
        Gender:1 ,
        CustomerGroupName: "Khách Hàng MiSa",
        PhoneNumber: "0836300169",
        Email: "nguyentienanh1899@gmail.com",
        Position: "Fresher",
        Department: "Đào tạo",
        Salary: 1000000,
        JobStatus: "Đang làm việc"
    }
]
for (let index = 0; index < 100; index++) {
    const customer = {
        CustomerCode: `KH000${index}`,
        FullName: "Nguyễn Tiến Anh",
        DateOfBirth: new Date('1999-11-18'),
        Gender: 1,
        CustomerGroupName: "Khách Hàng MiSa",
        PhoneNumber: "0836300169",
        Email: "nguyentienanh1899@gmail.com",
        Position: "Fresher",
        Department: "Đào tạo",
        Salary: 1000000,
        JobStatus: "Đang làm việc"
    };
    data.push(customer);
}