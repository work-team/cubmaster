/**
 * Created by tan on 16/3/29.
 */
$(function(){
    ///测试数据
    //var data = [
    //    {
    //    "area": "无",
    //    "SubmitDatetime": "2016-03-18 19:27:58",
    //    "filePath": "3\\dataset\\word.txt",
    //    "datasetName": "文本数据",
    //    "description": "文本",
    //    "attribute": [{
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}, {
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}, {
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}],
    //    "datasetType": 0,
    //    "associatedTasks": "分类算法",
    //    "platform": "java",
    //    "DownloadCount": 100
    //},
    //    {
    //    "area": "无5",
    //    "SubmitDatetime": "2016-03-18 19:27:58",
    //    "filePath": "3\\dataset\\word.txt",
    //    "datasetName": "文本数据5",
    //    "description": "文本",
    //    "attribute": [{
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}, {
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}, {
    //    "attributeCharacter": 0,
    //    "attributeRange": "无",
    //    "attributeLabel": 0,
    //    "attributeName": "ll",
    //    "attributeType": "数值",
    //    "attributeSequence": 1,
    //    "attributeDatabaseType": "int",
    //    "attributeMissing": "无"
    //}],
    //    "datasetType": 0,
    //    "associatedTasks": "分类算法",
    //    "platform": "java",
    //    "DownloadCount": 100
    //},
    //    {
    //        "area": "无6",
    //        "SubmitDatetime": "2016-03-18 19:27:58",
    //        "filePath": "3\\dataset\\word.txt",
    //        "datasetName": "文本数据6",
    //        "description": "文本",
    //        "attribute": [{
    //            "attributeCharacter": 0,
    //            "attributeRange": "无",
    //            "attributeLabel": 0,
    //            "attributeName": "ll",
    //            "attributeType": "数值",
    //            "attributeSequence": 1,
    //            "attributeDatabaseType": "int",
    //            "attributeMissing": "无"
    //        }, {
    //            "attributeCharacter": 0,
    //            "attributeRange": "无",
    //            "attributeLabel": 0,
    //            "attributeName": "ll",
    //            "attributeType": "数值",
    //            "attributeSequence": 1,
    //            "attributeDatabaseType": "int",
    //            "attributeMissing": "无"
    //        }, {
    //            "attributeCharacter": 0,
    //            "attributeRange": "无",
    //            "attributeLabel": 0,
    //            "attributeName": "ll",
    //            "attributeType": "数值",
    //            "attributeSequence": 1,
    //            "attributeDatabaseType": "int",
    //            "attributeMissing": "无"
    //        }],
    //        "datasetType": 0,
    //        "associatedTasks": "分类算法",
    //        "platform": "java",
    //        "DownloadCount": 100
    //    }
    //]




	 var para = $(".container").html();
    $.ajax({
        type:"POST",
        url:"GetPrivateDataset",
        datatype:"json",
        data: {
			page:0,	
			name:1,
		},
        success:function(data){
            var data = $.parseJSON(data);
            for(var h=0;h<data.length;h++){
            	$(".bodyer-center").append("<div class='file-info'><a href='DownLoad?path="+data[h].filePath+"'></a></div><button num='"+h+"'>查看详情</button>");
                $(".bodyer-center div a").eq(h).text(data[h].datasetName);
            }
           
            $(".bodyer-center button").click(function(){
                $(".container").slideToggle();
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
                for(var i= 0,j=0;i<=(data[index].attributes.length*2-2);i=i+2,j++){
                    if((data[index].attributes.length-j)>1){
                        $(".inf").append($inf);
                    }
                    var $li_first = $(".inf").find("ul").eq(i).find("li");
                    var $li_second = $(".inf").find("ul").eq(i+1).find("li");
                    $li_first.eq(0).find("span").text(data[index].attributes[j].attributeName);
                    $li_first.eq(1).find("span").text(data[index].attributes[j].attributeLabel);
                    $li_first.eq(2).find("span").text(data[index].attributes[j].attributeDatabaseType);
                    $li_first.eq(3).find("span").text(data[index].attributes[j].attributeCharacter);
                    $li_second.eq(0).find("span").text(data[index].attributes[j].attributeRange);
                    $li_second.eq(1).find("span").text(data[index].attributes[j].attributeSequence);
                    $li_second.eq(2).find("span").text(data[index].attributes[j].attributeMissing);
                    $li_second.eq(3).find("span").text(data[index].attributes[j].attributeType);
                }
            })
        },
        erro:function(){
            alert(数据读取错误);
        }
    })

    $(document).on("click",".close",function(){
        $(".container").slideToggle(function(){
            $(".container").empty();
            $(".container").append(para);
        });
    })
})
