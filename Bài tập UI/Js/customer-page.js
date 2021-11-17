$(document).ready(function () {
    //Gán các sự kiện cho menu items
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
    let customerPage = new CustomerPage();
})
class CustomerPage extends BasePage {
    TableData = "#tbListData";
    ApiUrl = "http://cukcuk.manhnv.net/api/v1/Employees";
    //
    TittlePage = null;
    FormMode = Enum.FormMode.View;
    EmployeeIdForEdit = null;
    constructor() {
        super();
        this.loadData();
        this.loadPosition();
        this.loadDepartment();
    }
    /**Tạo sự kiện cho các elements
     * Author:NTAnh(14/10)
     */
    initEvents() {
        let me = this;
        //Tạo sự kiện cho button thêm mới.
        //1.JS thuần:
        /*  document.getElementById('btnAdd').addEventListener('click', function(){
            document.getElementById('dlgCustomerDetail').style.display = 'block';
        })*/
        me.moneyInput();
        //2.Jquery:
        $('#btnAdd').click(function () {
            me.FormMode = Enum.FormMode.Add;
            let thisDialog = $('#dlgCustomerDetail');
            thisDialog.find('input').val('');
            thisDialog.find('m-combobox').attr('value',0);
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
        $('#btnSave').click(this.btnSaveOnClick.bind(this));
        // Sự kiện khi nhấn đúp chuột vào 1 dòng dữ liệu trên table:
        $('table#tbListData').on('dblclick', 'tbody tr', this.rowOnDbClick.bind(this));
        // Sự kiện cho button btnDeleted(xóa nhân viên):
        $('#btnDeleted').click(function(){
            me.deleteEmployee();
        });
    }
    /**
     * Load dữ liệu khách hàng
     * Author:NTAnh(14/10)
     */
/*     loadData() {
        try {
            console.log('load dữ liệu!');
            $('table#tbListData tbody').empty();
            // Gọi API lấy dữ liệu:
            let data = null;

            $.ajax({
                url: "http://cukcuk.manhnv.net/api/v1/Employees",
                method: "GET", // GET , POST, PUT, DELETE
                data: null, // Tham số đâu vào cho API,
                dataType: 'json',
                async: false,
                contentType: 'application/json'
            }).done(function (res) {
                console.log(res);
                data = res;
            }).fail(function (res) {
                console.log(res);
            })
            var employees = data;

            // Build HTML:
            // Duyệt từng đối tượng trong mảng để lấy các thông tin tương ứng cho TRHTML:
            for (const customer of employees) {
                // Xử lý dữ liệu:
                // 1. Ngày tháng (phải thể hiện là ngày/ tháng/ năm) - theo convention:
                let dateOfBirth = customer.DateOfBirth ? new Date(customer.DateOfBirth) : '';
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
                    dateOfBirth = new Date(dateOfBirth);
                    let date = dateOfBirth.getDate();
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
            <td><div class='checkbox'></div></td>
            <td>${customer.EmployeeCode}</td>
            <td>${customer.FullName}</td>
            <td>${CommonFn.FormatGender(customer.Gender)||""}</td>
            <td>${CommonFn.FormatDateDMY(customer.DateOfBirth||"")}</td>
            <td>${customer.PhoneNumber}</td>
            <td>${customer.Email}</td>
            <td>${customer.PositionName||""}</td>
            <td>${customer.DepartmentName||""}</td>
            <td>${CommonFn.FormatMoney(customer.Salary)}</td>
            <td>${CommonFn.FormatWorkStatus(customer.WorkStatus)||""}</td>
            </tr>
             `);
                trHTML.data('keyId', customer.EmployeeId);
                // Xác định Element sẽ append chuỗi HTML vào:
                $('table#tbListData tbody').append(trHTML);
            }
        } catch (error) {
            console.log(error);
        }
    } */
    /**
     * Sự kiện khách hàng bấm doubleclick 1 row
     * Author:NTAnh(14/10)
    */
    rowOnDbClick(sender) {
        var me = this;
        const customerId = $(sender.currentTarget).data('keyId');
        me.EmployeeIdForEdit = customerId;
        $.ajax({
            url: `http://cukcuk.manhnv.net/api/v1/Employees/${customerId}`,
            method: "GET",
            async: false
        }).done(function (res) {
            // Hiển thị form chi tiết:
            $('#dlgCustomerDetail').show();
            me.FormMode = Enum.FormMode.Edit;
            // Bindding các dữ liệu tương ứng vào từng ô nhập liệu trên form chi tiết:
            $('#txtCustomerCode').val(res["EmployeeCode"]);
            $('#txtFullNameCode').val(res["FullName"]);
            $('#dtDateOfBirth').val(CommonFn.FormatDateDMY(res.DateOfBirth));
            $('#txtPhoneNumberCode').val(res.PhoneNumber);
            $('#txtEmailCode').val(res.Email);
            $('#dtDateOfBirth').val(CommonFn.FormatDateYMD(res.DateOfBirth));
            let salaryText = res.Salary;
            let salary = CommonFn.FormatNumber(salaryText);
            salary = new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(salary);
            $('#txtSalary').val(salary);
            $('#textCCCD').val(res.IdentityNumber);
            //Binđing dữ liệu các combobox:
            //1.bind dữ liệu vị trí lên form
            $('#txtposition').val($(`#cbx-position .m-combobox-select .m-combobox-item[value = ${res.PositionId}]`).text().trim()||"");
            $('#cbx-position .m-combobox-select .m-combobox-item').siblings().removeClass('m-item-selected');
            $(`#cbx-position .m-combobox-select .m-combobox-item[value = ${res.PositionId}]`).addClass('m-item-selected');
            //2.bind dữ liệu phòng ban lên form
            $('#txtdepartment').val($(`#cbx-department .m-combobox-select .m-combobox-item[value = ${res.DepartmentId}]`).text().trim());
            $('#cbx-department .m-combobox-select .m-combobox-item').siblings().removeClass('m-item-selected');
            $(`#cbx-department .m-combobox-select .m-combobox-item[value = ${res.DepartmentId}]`).addClass('m-item-selected');
            //3.bind dữ liệu tình trạng công việc lên form
            $('#txtjobstatus').val($(`#cbxJobStatus .m-combobox-select .m-combobox-item[value = ${res.WorkStatus}]`).text().trim());
            $('#cbxJobStatus .m-combobox-select .m-combobox-item').siblings().removeClass('m-item-selected');
            $(`#cbxJobStatus .m-combobox-select .m-combobox-item[value = ${res.WorkStatus}]`).addClass('m-item-selected');

        }).fail(function (res) {
            // Đưa ra thông báo lỗi:
        })
    }
    /**Sự kiện bấm button Save.
     * Author:NTAnh(14/10)
    */
    btnSaveOnClick() {
        var me = this;
        //1.Thực hiện validate dữ liệu:
        let isValid = Validate.validateRequired();
        //2.Dữ liệu hợp lệ thì thu thập thông tin:
        if (isValid) {
            let customerCode = $('#txtCustomerCode').val();
            let fullName = $('#txtFullNameCode').val();
            let gender = $('#cbxGender').val();
            let CCCD = $('#textCCCD').val();
            let dob = $('#dtDateOfBirth').val();
            let phoneNumber = $('#txtPhoneNumberCode').val();
            let email = $('#txtEmailCode').val();
            let positionId = $('#cbx-position').attr('value');
            let positionName = $('#cbx-position .m-combobox-input').val();
            let departmentID = $('#cbx-department').attr('value');
            let departmentName = $('#cbx-department .m-combobox-input').val();
            let salary = $('#txtSalary').val();
            let jobStatus = $('#cbxJobStatus').attr('value');

            //3.Build js object:
            let customer = {
                EmployeeCode: customerCode,
                FullName: fullName,
                DateOfBirth: dob,
                IdentityNumber:CCCD,
                Gender: gender,
                PhoneNumber: phoneNumber,
                Email: email,
                PositionId: positionId,
                PositionName:positionName,
                DepartmentId: departmentID,
                DepartmentName: departmentName,
                Salary: CommonFn.FormatNumber(salary),
                WorkStatus: jobStatus
            }
            if (this.FormMode == Enum.FormMode.Add) {
                // 4. Gọi đến Api thực hiện lưu dữ liệu vào database:
                $.ajax({
                    url: `http://cukcuk.manhnv.net/api/v1/Employees`,
                    method: "POST",
                    data: JSON.stringify(customer),
                    dataType: "json",
                    async: false,
                    contentType: 'application/json'
                }).done(function (res) {
                    CommonFn.showToastMsg("Thêm mới thành công thành công!")
                    // Load lại dữ liệu:
                    me.loadData();
                    // ẩn Form:
                    $('#dlgCustomerDetail').hide();
                }).fail(function (res) {
                    if (res.status == 400) {
                        alert(res.responseJSON.userMsg);
                    }
                    console.log(res);
                })
            } else  if(me.FormMode == Enum.FormMode.Edit){
                $.ajax({
                    url: `http://cukcuk.manhnv.net/api/v1/Employees/${me.EmployeeIdForEdit}`,
                    method: "PUT",
                    data: JSON.stringify(customer),
                    dataType: "json",
                    async: false,
                    contentType: 'application/json'
                }).done(function (res) {
                    CommonFn.showToastMsg("Sửa dữ liệu thành công!")
                    // Load lại dữ liệu:
                    me.loadData();
                    // ẩn Form:
                    $('#dlgCustomerDetail').hide();
                }).fail(function (res) {
                    if (res.status == 400) {
                        alert(res.responseJSON.userMsg);
                    }
                    console.log(res);
                })
            }

        }

    }
    /**
     * Sự kiện xóa nhân viên
     * Author:NTAnh(14/10)
     */
    deleteEmployee(){
       /*  listEmployeeDeleted = [], */
        let thisCheckBoxs = $('.checkbox.icon-checked');
        let listTRs = thisCheckBoxs.parent().parent();
        var listEmployeeIds = [];
        $.each(listTRs,function(index,a){
            listEmployeeIds.push($(a).data("keyId"));
        });
        // Call API xóa nhân viên
        $.each(listEmployeeIds, (index, id)=>{
            $.ajax({
                url: `http://cukcuk.manhnv.net/api/v1/Employees/${id}`,
                method: 'DELETE',
                dataType: 'json',
                contentType: 'application/json',
            }).done(res=>{
                this.loadData(); 
                //Show thông báo xóa thành công
                CommonFn.showToastMsg("Xóa thành công!")
                console.log('Xóa thành công');
            }).fail(res=>{
                console.log("Xóa thất bại");
            })
        });
    }
    //Format khi nhập ô tiền:
    moneyInput() {
        let me = this,
            thismoney = $('#txtSalary');
        console.log(thismoney);
        try {
            thismoney.on("input", function () {
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

}
/*  Data Fix
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
} */

// // Object JS:
// let o = {
//     Name: "Nguyễn Văn Mạnh",
//     Age: 18,
//     DateOfBirth: new Date(),
//     getName: function(){
//         return this.Name;
//     },
//     Address: undefined,
// }

// // Object JSON:
// let jsonObject = {
//     "Name": "Nguyễn Văn Mạnh",
//     "Age": 18,
//     "DataOfBirth": "20215-11-11",
//     "Address": null,
// }