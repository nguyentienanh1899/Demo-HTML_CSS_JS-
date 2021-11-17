class BuildBase{
    /**
     * Buil Table
     * Author: NTAnh 16/10/2021
     * @param {*} tableElement : id table truyền vào
     * @param {*} data : data truyền vào
     */
    static buildTable(tableElement, data) {
        $(tableElement).find('tbody').empty();
        // Build HTML:
        // Lấy ra các cột của bảng:
        let keyId = $(tableElement).attr("keyId");
        let cols = $(tableElement).find('thead th');
        // Duyệt từng đối tượng trong mảng để lấy các thông tin tương ứng cho TRHTML:
        for (const item of data) {
            console.log(item);
            // Xử lý dữ liệu:
            let trHTML = $(`<tr></tr>`);
            // Duyệt từng cột và kiểm tra thông tin các cột:
            $.each(cols, function (index, col) {
                // property sẽ map dữ liệu:
                // Lấy ra tên property sẽ map dữ liệu:
                let fieldName = col.getAttribute('fieldName');
                if(fieldName == "checkbox"){
                    let checkbox = $(`<td><div class='checkbox'></div></td>`);
                    trHTML.append(checkbox);
                }
                else{
                    // Lấy ra giá trị tương ứng với property của đối tượng:
                    let value = item[fieldName];
                    // Kiểm tra xem dữ liệu có cần định đạng không:
                    let format = col.getAttribute('format');
                    value = BuildBase.formatData(value, format);
                    let td = $(`<td>${value}</td>`);
                    trHTML.append(td);
                }
            })
            trHTML.data('keyId', item[keyId]);
            // Xác định Element sẽ append chuỗi HTML vào:
            $(tableElement).find('tbody').append(trHTML);
        }
    }
    static formatData(value, format){
        switch (format) {
            case 'ddmmyy': // ngày/ tháng/ năm
                value = CommonFn.FormatDateDMY(value);
                break;
            case "money": // Tiền tệ:
                value = CommonFn.FormatMoney(value);
                break;
            case "gender":
                value = CommonFn.FormatGender(value);
                break;
            case "status":
                value = CommonFn.FormatWorkStatus(value);
                break;
            default:
                break;
        }
        if (value == null) {
            value = "";
        }
        return value;
    }
}