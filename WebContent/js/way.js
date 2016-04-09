/**
 * Created by tan on 16/3/25.
 */
$(function(){

    $(".choose").click(function(){
        $(this).find(".show").slideToggle();
        $(this).blur(function(){
            $(this).find(".show").slideUp();
        })
    })
    $(".show div").click(function(){
        var $a = $(this).text();
        var $add = $(this).parents(".select").find(".add");
        console.log($add.length);
        //$add.empty();
        $add.append($a);
        $add.val($a);
    })
    $(".show div").hover(function(){
        var $add = $(this).parent().siblings();
        $add.empty();
        $(this).css({
            "color": "#fff",
            "background":"#0f5a9a"
        })
    },function(){
        $(this).css({
            "color":"#000",
            "background":"#fff"
        })
    });

    var $addheight = $(".boxpac").height();
    $(".boxpac").find(".addmore").text("删除");
    $(".boxpac").find(".addmore").addClass("rem");
    var $boxpac1 = $("#more_info").html();
    $(".boxpac").find(".addmore").text("添加");
    $(".boxpac").find(".addmore").removeClass("rem");
    $(".addmore").click(function(){
        $("#more_info").css({height:"+="+$addheight});
        $(".container").css({height:"+="+$addheight});
        $("#more_info").append($boxpac1);
    });
    $(document).on('click','.rem',function(){
        $("#more_info").css({height:"-="+$addheight});
        $(".container").css({height:"-="+$addheight});
        $(this).parents(".boxpac").remove();
    });


    $(".file").change(function(){
    	$(".file").siblings("div").css({marginLeft:0}).text($(".file").val());
        var file = $("#file")[0].files[0]; //文件对象
        size = file.size; //总大小
        var shardSize = 10 * 1024 * 1024; //以2MB为一个分片
        shardCount = Math.ceil(size / shardSize); //总片数
        var i=0;

        up(shardCount,i,file);
    });

    function up(shardCount,i,file){
        if($("#bar").attr("status")==0){
            name = file.name; //文件名
            size = file.size; //总大小
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
            $.ajax({
                url: "fileupload",
                type: "POST",
                data: form,
                async: true, //异步
                processData: false, //很重要，告诉jquery不要对form进行处理
                contentType: false, //很重要，指定为false才能形成正确的Content-Type
                success: function(){
                    $("#bar").click(function(){
                        if($("#bar").attr("status")==0){
                            $("#bar").attr("status","1");
                            $("#bar").text("开始");
                        }
                        else{
                            $("#bar").attr("status","0");
                            $("#bar").text("暂停");
                            up(shardCount,i,file);
                        }
                    });
                    i++;
                    $("#show").text(i+"/"+shardCount);
                    if(i<shardCount&&($("#bar").attr("status")==0))
                        up(shardCount,i,file)
                }
            });
        }

    }
    var option = {
        target:"form",
        beforeSubmit:function(formData,jqForm,options){
            for(var i=0;i<formData.length;i++){
                if(!formData[i].value){
                    alert(1);
                    return false;
                }
            }
        }
    };
    $("#form").submit(function () {
        $(this).ajaxSubmit(option);
    });
})