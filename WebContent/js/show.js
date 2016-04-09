/**
 * Created by tan on 16/3/29.
 */
$(function(){
    $.ajax({
        type:"POST",
        url:"all",
        datatype:"json",
        success:function(data){
            var data = $.parseJSON(data);
            for(var h= 0,pg=0;h<data.length;h++){
                if(pg!=parseInt(h/10)){
                    pg++;
                    $(".bodyer-box").css({width:"+=800"})
                    $(".bodyer-box").append("<div class='bodyer-center'></div>");

                }
                var g = h - parseInt(h/10)*10;
                $(".bodyer-center").eq(pg).append("<div class='file-info'></div><button num='0' class='more'>查看详情</button>");
                $(".bodyer-center").eq(pg).find("button").eq(g).attr("num",h);
                $(".bodyer-center").eq(pg).find(".file-info").eq(g).text(data[h].datasetName);
            }
            $(".bodyer-center button").click(function() {

                $(".container").slideToggle(function(){
                    $(".header").nextAll().css("display","none");

                });
                var index = $(this).attr("num");
                $("h2").text(data[index].datasetName);
                $("#description").text(data[index].description);
                $("#datasetType").text(data[index].datasetType);
                $("#associatedTasks").text(data[index].associatedTasks);
                $("#platform").text(data[index].platform);
                $("#area").text(data[index].area);
                $("#SubmitDatetime").text(data[index].submitDatetime);
                $("#DownloadCount").text(data[index].downloadCount);
                var $inf = $(".inf").html();
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
            });
        },
        error:function(){
            alert("数据读取错误");
        }
    })

    var para = $(".container").html();
    $(document).on("click",".close",function(){
        $(".header").nextAll().css("display","block");
        $(".container").slideToggle(function(){
            $(".container").empty();
            $(".container").append(para);
        });
    })
    $(document).on('mouseover','.more',function(){
        $(this).animate({
            backgroundColor:"#686d70",
            color:"#fff"
        },200)
    });
    $(document).on('mouseout','.more',function(){
        $(this).animate({
            backgroundColor:"#c9d2d6",
            color:"#000"
        },200)
    });

    var $long = -Math.ceil((data.length/10-1)*800);
    var $pg_num = 1;
    $("#next").click(function(){
        if(!$(".bodyer-box").is(":animated")) {
            if ($(".bodyer-box").css("left") != $long +"px") {
                $pg_num++;
                $(".footer-center").find("a").text($pg_num);
                $(".bodyer-box").animate({
                    left: "-=800"
                }, "fast")
            }
        }
    });
    $("#last").click(function(){
        if(!$(".bodyer-box").is(":animated")) {
            if ($(".bodyer-box").css("left") != "0px") {
                $pg_num--
                $(".footer-center").find("a").text($pg_num);
                $(".bodyer-box").animate({
                    left: "+=800"
                }, "fast")
            }
        }

    });
});
