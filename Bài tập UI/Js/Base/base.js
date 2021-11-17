class BasePage {
    TableData = null;
    ApiUrl = null;
    constructor() {
        debugger
        this.initEvents();
    }

    initEvents() {

    }

    loadData() {
        // table sẽ hiển thị dữ liệu:
        try {
            if (this.TableData) {
                let table = $(this.TableData);
                let url = this.ApiUrl;
                // Gọi API lấy dữ liệu:
                $.ajax({
                    type: "GET",
                    url: url,
                    success: function (response) {
                        // Build lên table:
                        BuildBase.buildTable(table, response);
                    },
                    error: function (response) {

                    }
                });
            }
        } catch (error) {

        }

    }
    loadPosition(){
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/api/v1/Positions',
                method: 'GET',
                data: null,
                dataType: 'json',
                contentType: 'application/json'
            }).done(res=>{
                console.log("Load position completed")
                $.each(res, (index, p)=>{
                    var txt = p.PositionName;
                    var id = p.PositionId;
                    var itemHTML =  `<div class="m-combobox-item" value="${id}">${txt}</div>`;
                    $('#cbx-position .m-combobox-select').append(itemHTML);
                })
            }).fail(res=>{
                console.log("Eror load position")
            })
        }catch(error){
            console.log(error)
        }
    }
    loadDepartment(){
        try {
            $.ajax({
                url: 'http://cukcuk.manhnv.net/api/v1/Departments',
                method: 'GET',
                data: null,
                dataType: 'json',
                contentType: 'application/json'
            }).done(res=>{
                console.log("Load department completed")
                $.each(res, (index, p)=>{
                    var txt = p.DepartmentName;
                    var id = p.DepartmentId;
                    var itemHTML =  `<div class="m-combobox-item" value="${id}">${txt}</div>`;
                    $('#cbx-department .m-combobox-select').append(itemHTML);
                })
            }).fail(res=>{
                console.log("Error load department")
            })
        }catch(error){
            console.log(error)
        }
    }
}