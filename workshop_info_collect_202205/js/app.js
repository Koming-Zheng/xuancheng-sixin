/*
1、表单很多内容，自动保存填写字符串信息，体验更好。

前端本地化存储 cookie、localstorage

提交成功就删除 clear

localStorage
setItem("key","value")
getItem("key","value")
removeItem("key")
clear()
key()


2、表单没有完成提示，点了提示，会自动滚动到空缺位值
表单空缺位置，会有红框标记。
*/
// 字元素可以获取父元素，添加提示样式
// 元素可以获取offsetTop 属性值 元素距离顶部距离的值
//

//

// 3、表单插件 errorPlacement、showErrors、success、submitHandler
/*
 *
 */

//4、上传图片，最多三张，读取图片，检查对象的图片个数，页面上显示预览，预览上有删除图片的按钮
// 数组 splice() 删除元素 位置添加/删除项目、删除的项目数，0不删除、添加元素

//5、一种图片和表单中其他信息一起提交的情况，第二种图片先上传，回传URL，表单提交图片字段是的上传成功之后的URL

//6、可以在已有的html表单数据上添加新的健值对
/*
formDate 对象可以通过已有的表单做初始化
然后在 实例上添加新的健值对 存放加图片对象

数据要用ajax的方式提交

input 的 files 对象能重新赋值，flies属性是FileList对象，里面的属性只读 ，赋值数组是不行的。数组需要转化 FileList

借住 DataTransfer 对象 方法 转化 得到 FileList 给 input files 属性赋值

*/
//手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写手机号码");

$(document).ready(() => {

    let uploadImgFiles = Array(); //创建一个数组保存待上传的图片
    const max_img_num = 3; //限制三站照片

    // $('#btnUpload').click(() => {
    //     $('input[type=file]').click();
    // })

    $('#btnUpload2').click(() => {
        $('input[type=file]').click();
    })

    $('input[type=file]').change((event) => {
        // if (uploadImgFiles.length == max_img_num) { //判断三张图片就不再上传了  这个部分需要优化 先注释
        //     alert('最多三张');
        //     return true;
        // }
        const img_num = event.currentTarget.files.length;
        const img_files = event.currentTarget.files
        if (img_num > max_img_num) {
            for (let i = 0, len = max_img_num; i < len; i++) {
                uploadImgFiles.push(img_files[i])
            }
            alert('最多三张');
        } else {
            for (let i = 0, len = img_num; i < len; i++) {
                uploadImgFiles.push(img_files[i])
            }
        }

        //添加预览图
        uploadImgFiles.forEach(function(currentValue, index, arr) {
            const urlCreator = window.URL || window.webkitURL;
            const imageUrl = urlCreator.createObjectURL(currentValue);

            if ($('#uploadImgPreviewEl' + index).is('img')) { return }

            $('#f').after('<div class="upload_img_preview">\
            <img id="uploadImgPreviewEl' + index + '" class="upload_img_preview_el" src="' + imageUrl + '" alt="' + currentValue.name + '">\
            <span class="upload_img_preview_del" >删除</span>\
        </div>')
        }, event.currentTarget);
        // event.currentTarget.value = ''
        //新建DataTransfer实例
        let dt = new DataTransfer();
        //DataTransfer实例的items对象上add添加文件
        let dataList = dt.items



        $.each(uploadImgFiles, function(key, value) {
            dataList.add(value);
        })
        //赋值，大功告成
        event.currentTarget.files = dt.files;
        // $("#factory_info_collect").
        if (uploadImgFiles.length == max_img_num) {
            $('#btnUpload').attr('disabled', true)
        }

    })

    //移除预览图
    $(document).on('click', '.upload_img_preview_del', (event) => {

        // 1、预览图移除、2、数组中图片移除
        let pre = $(event.currentTarget);
        let imgName = pre.parent().find('img').attr('alt')
        uploadImgFiles.forEach(function(currentValue, index, arr) {
            if (currentValue.name == imgName) {
                uploadImgFiles.splice(index, 1);
                return
            }

        })

        pre.parent().remove();
        //新建DataTransfer实例
        let dt = new DataTransfer();
        //DataTransfer实例的items对象上add添加文件
        let dataList = dt.items

        $.each(uploadImgFiles, function(key, value) {

            dataList.add(value);
            //
        })
        //赋值，大功告成
        $('input[type=file]')[0].files = dt.files;
        $('#btnUpload').attr('disabled', false)

    })

    $("#factory_info_collect").validate({
        onfocusout: false,
        onclick: false,
        onkeyup: false,
        groups: {
            area: 'plantArea floorHeight long width'
        },
        rules: {
            contactNumber: {
                isMobile: true,
                required: false
            }
        },
        submitHandler: function(form) { // 提交处理函数
            // alert("submitted!");
        },
        errorPlacement: function(err, element) { //在插件自定义错误处理函数，给缺少填写信息元素的添加样式
            if (element.attr('name') == 'contactNumber') {
                alert(err.text())

            } else {

                element.parent().addClass('err_item')

            }

        },
        showErrors: function(errorMap, errorList) {
            this.defaultShowErrors(); // 需要执行这个内置函数，不然errorPlacement、success就不起作用了
            if (errorList.length > 0) { //判断有错误，提示 条件是0条错误信息
                alert("您的厂房信息还不完整，请再补充一下，谢谢！")

            }
        },
        success: function(label, element) { // 验证成功的元素移除样式
            var _element = $(element);

            //厂房的字段，是一组数据。全部需要满足验证通过。
            if (_element.attr("name") == "plantArea" ||
                _element.attr("name") == "floorHeight" ||
                _element.attr("name") == "long" ||
                _element.attr("name") == "width") {
                var val = $('input[name=plantArea]').val() &&
                    $('input[name=floorHeight]').val() &&
                    $('input[name=long]').val() &&
                    $('input[name=width]').val()
                if (Boolean(val)) {
                    _element.parent().removeClass('err_item')
                }
            } else {
                _element.parent().removeClass('err_item')
            }

            //保存填写的的数据

        },
    });

})