/**
 * Created by tan on 16/3/25.
 */
$(function(){
    var $info = 0;
    $("#form").on('click','.choose',function(event){
        $(this).find(".show").slideToggle(50);
        $(this).blur(function(){
            $(this).find(".show").slideUp(50);
        });
        $(this).find(".add").empty();
    });
    $('.show').on('click','div',function(event){
        var $a = $(this).text();
        var $add = $(this).parents(".select").find(".add");
        $add.text($a);
        $add.val($a);
        $(this).parents(".show").slideToggle(50);
        event.stopPropagation();
        $("#nebox").siblings().remove();
        $(".more-info").height($moreheight);
        $(".container").height($conheight);
        $info = $a;
    });
    $('.show').on('mouseover','div',function(){
        var $add = $(this).parent().siblings();
        $add.empty();
        $(this).css({
            "color": "#fff",
            "background":"#0f5a9a"
        })
    });
    $('.show').on('mouseout','div',function(){
        $(this).css({
            "color":"#000",
            "background":"#fff"
        })
    });


    var $addheight = $(".boxpac").height();
    var $conheight = $(".container").height();
    var $moreheight = $(".more-info").height();
    $(".boxpac").find(".addmore").text("删除");
    $(".boxpac").find(".addmore").addClass("rem");
    var $boxpac1 = $("#more_info").html();
    $(".boxpac").find(".addmore").text("添加");
    $(".boxpac").find(".addmore").removeClass("rem");
    var zIndex = 99;
    var lie = 1;
    $(".addmore").click(function(){
        var lielength = null;
        function Jug(){
            if($info=="数值"){
                lielength = 2;
                Add();
            }
            else if($info=="文本"){
                lielength = 999;
                Add();
            }
            else{
                alert("请先选择数据类型!");
                }
        }
        Jug();
        function Add(){
            if(lielength!=null){
                if(lie<lielength){
                    zIndex--;
                    lie++;
                    $("#more_info").css({height:"+="+$addheight});
                    $(".container").css({height:"+="+$addheight});
                    $("#more_info").append($boxpac1);
                    $("#more_info").find(".boxpac").last().find(".choose").css("z-index",zIndex);
                }
                else {
                    if($("#sorry").length==0){
                        $(".boxpac").last().find(".box").last().append("<div id='sorry'>数据length>3的无法显示</div>");
                    }
                }
            }
        }
    });
    $(document).on('click','.rem',function(){
        lie--;
        $("#more_info").css({height:"-="+$addheight});
        $(".container").css({height:"-="+$addheight});
        $(this).parents(".boxpac").remove();
    });

    var i;
    var file;
    var shardSize;
    $(".file").change(function(){
    	$(".file").siblings("div").css({marginLeft:0}).text($(".file").val());
    	i=0;file = $("#file")[0].files[0]; //文件对象;
    	shardSize = 10 * 1024 * 1024; //以2MB为一个分片
    	var size = file.size; //总大小
        shardCount = Math.ceil(size / shardSize); //总片数
        up();
    });
    $("#bar").click(function(){
        if($("#bar").attr("status")==0){
            $("#bar").attr("status","1");
            $("#bar").text("开始");
        }
        else{
            $("#bar").attr("status","0");
            $("#bar").text("暂停");
            up();
        }
    });
    function up(){
        if($("#bar").attr("status")==0){
            var shardSize = 10 * 1024 * 1024; //以2MB为一个分片
            var start = i * shardSize,
                name = file.name, //文件名
                size = file.size; //总大小
            end = Math.min(size, start + shardSize);
            //构造一个表单，FormData是HTML5新增的
            var form = new FormData();
            form.append("data", file.slice(start,end)); //slice方法用于切出文件的一部分
            form.append("name", name);
            form.append("total", shardCount); //总片数
            form.append("index", i + 1); //当前是第几片
            i++;
            $.ajax({
                url: "fileupload",
                type: "POST",
                data: form,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function(){
                    $("#show").text(i+"/"+shardCount);
                    if(i<shardCount)
                        up();
                    else{
                        $.ajax({
                            url:"",
                            type:POST,
                            dataType:json,
                            success:function(data){
                                var data = $.parseJSON(data);
                                for(var n = 0;n < data.length;n++){
                                    $(".boxpac").eq(n).find(".box").eq(1).find(".name").val(data[n].type);
                                    $(".boxpac").eq(n).find(".box").eq(2).find(".name").val(data[n].lossNumber);
                                    $(".boxpac").eq(n).find(".box").eq(3).find(".name").eq(0).val(data[n].min+"~"+data[n].max);
                                    $(".boxpac").eq(n).find(".box").eq(3).find(".name").eq(1).val(data[n].sum);
                                    if(n<=data.length-2){
                                        $(".addmore").triggerHandler("click");
                                    }
                                }
                            }
                        })
                    }
                }
            });
        }

    }
    var option = {
        target:"#form",
        url:"FileUpLoad",
        type:"POST",
        clearForm:true,
        resetForm:true,
        timeout:3000,
        beforeSubmit:function(formData,jqForm,options){
            for(var i=0;i<formData.length;i++){
                if(!formData[i].value){
                    alert("表单内容不可为空");
                    return false;
                }
            }
        },
        success:function(){
            alert("成功提交!")
        }
    };
    $("#form").submit(function () {
        $(this).ajaxSubmit(option);
    });
})