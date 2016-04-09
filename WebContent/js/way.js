/**
 * Created by tan on 16/3/25.
 */
$(function(){
    $(document).on('click','.choose',function(){
        $(this).find(".show").slideToggle();
        $(this).blur(function(){
            $(this).find(".show").slideUp();
        })
    });
    $(document).on('click','.show div',function(){
        var $a = $(this).text();
        var $add = $(this).parents(".select").find(".add");
        $add.append($a);
        $add.val($a);
    });
    $(document).on('mouseover','.show div',function(){
        var $add = $(this).parent().siblings();
        $add.empty();
        $(this).css({
            "color": "#fff",
            "background":"#0f5a9a"
        })
    })
    $(document).on('mouseout','.show div',function(){
        $(this).css({
            "color":"#000",
            "background":"#fff"
        })
    })


    var $addheight = $(".boxpac").height();
    $(".boxpac").find(".addmore").text("删除");
    $(".boxpac").find(".addmore").addClass("rem");
    var $boxpac1 = $("#more_info").html();
    $(".boxpac").find(".addmore").text("添加");
    $(".boxpac").find(".addmore").removeClass("rem");
    var zIndex = 99;
    var lie = 1;
    $(".addmore").click(function(){
        zIndex--;
        if(lie<3){
            lie++;
            $("#more_info").css({height:"+="+$addheight});
            $(".container").css({height:"+="+$addheight});
            $("#more_info").append($boxpac1);
            $("#more_info").find(".boxpac").last().find(".choose").css("z-index",zIndex);
        }
        else{
            alert("你添加的太多啦!")
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
                                for (var i = 0, j = 0; i <= (data[index].attributes.length * 2 - 2); i = i + 2, j++) {
                                    if ((data[index].attributes.length - j) > 1) {
                                        $(".inf").append($inf);
                                    }
                                    var $li_first = $(".inf").find("ul").eq(i).find("li");
                                    var $li_second = $(".inf").find("ul").eq(i + 1).find("li");
                                    $li_first.eq(0).find("span").text(data[index].attributes[j].attributeName);
                                    $li_first.eq(1).find("span").text(data[index].attributes[j].attributeLabel);
                                    $li_first.eq(2).find("span").text(data[index].attributes[j].attributeDatabaseType);
                                    $li_first.eq(3).find("span").text(data[index].attributes[j].attributeCharacter);
                                    $li_second.eq(0).find("span").text(data[index].attributes[j].attributeRange);
                                    $li_second.eq(1).find("span").text(data[index].attributes[j].attributeSequence);
                                    $li_second.eq(2).find("span").text(data[index].attributes[j].attributeMissing);
                                    $li_second.eq(3).find("span").text(data[index].attributes[j].attributeType);
                                }
                            }
                        })
                    }
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