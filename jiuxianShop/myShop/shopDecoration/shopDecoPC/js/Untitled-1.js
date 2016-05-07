// JavaScript Document

 	var j=jQuery;
	var uploadMessage='';
	var uploading=false;
	var notSupportFlash=false;
	/* 上传文件	*/
	function uploadFiles(){
		if(notSupportFlash){
				alert('您的浏览器不支持flash，请安装flash插件');
				return ;
			}
	
		var queueData=jQuery('#file_upload').data('uploadify').queueData;
		if(queueData.queueLength<1){
			message_box('请先选择文件...',2);
			return ;
		}
		if(uploading){
			alert('上传中，请稍候...');
			return ;
		}
		
		var msg='';
		var fileTypeExts=jQuery('#file_upload').uploadify('settings','fileTypeExts');
		for(var fid in queueData.files){
			var file=queueData.files[fid];
			if(!checkFileName(file.name,fileTypeExts)){
				msg+=file.name+"的文件类型不允许上传<br/>";
			}
		}
		if(msg!=''){
			message_box(msg,2); 
			return false;
		}
		
		uploadMessage='';
		uploading=true;
        jQuery('#file_upload').uploadify('disable', true);
        jQuery('#file_upload').uploadify('upload','*');
	}
	
	/** 检查文件名*/
	function checkFileName(name,exts){
		var idx=name.lastIndexOf('.');
		if(idx<0){
			return false;
		}
		var ext=name.substring(idx);
		return (exts.indexOf(ext)>=0);
	}
	
	/*检查上传完成后的文件状态*/
	function checkCompleteFileState(){
		var statusSpans=j("#file_list_body").find("span[status]");
		var result=true;
		statusSpans.each(function(){
			var _this=j(this);
			var status=_this.attr('status');
			if(status=='1'){
				changeStatus(_this.attr("fileId"),3); //改为上传失败
				result=false;
			}
		});
		return result;
	}



     jQuery(document).ready(function() {
    	function adjustTable(){
    		try{
    			gUtils.ftable_ajust();
    		}catch(e){}
    	}

         jQuery("#file_upload").uploadify({
            'swf': '/misc/js/uploadify/uploadify.swf',
            'uploader': '/app/uploadify/upload.html',
    		'fileObjName':'fileData', 
            'queueID': 'fileQueue',
            'auto': false,
            'multi': true,
    		'buttonText': '选择文件',
    		'buttonClass':'btn-green',
    		'queueSizeLimit':20,
    		'uploadLimit':999,
    		'removeCompleted': true,
    		'fileTypeExts' : "*.jpg;*.gif;*.png;*.jpeg;",
    		'fileTypeDesc' : "图片文件",
    		'fileSizeLimit':'300KB',
    		'debug':false,
    		'overrideEvents': ['onUploadProgress','onCancel'],
    		'onUploadSuccess' : function(file, data,response) {
    			var jsonStr=eval("("+data+")");
    			if(!jsonStr.result){
    				uploadMessage+=jsonStr.message;
    				changeStatus(file.id,3);
    			}else{
    				changeStatus(file.id,2);
    				j("#file_operate_"+file.id).html('<a href="'+jsonStr.message+'" target="_blank">查看</a>');
    			}
    			adjustTable();
    		},
    		'onUploadStart': function(file) {
                jQuery('#file_upload').uploadify('settings','formData',{'cateId':jQuery("#cateId").val(),
									'cookieValue':getCookie('_jshop_pop_')});
    			changeStatus(file.id, 1);
    			adjustTable();
    		},
    		'onQueueComplete' : function(uploads) {
    			uploading=false;
                jQuery('#file_upload').uploadify('disable', false);
				adjustTable();
				var result=checkCompleteFileState();
    			if(uploadMessage!=null&&uploadMessage!=''){
    				alert(uploadMessage);
    			}else{
					if(result){
    					message_box('文件全部上传成功!', 3);
					}else{
						alert('文件上传失败，若您再次遇到该问题，建议您使用google Chrome浏览器或者IE7+浏览器进行上传！');
					}
    			}
    		},
    	   'onSelect':function(arg){
    	   		j("#empty_tr").remove();
    			var size=arg.size;
    			size=(size/1024.0).toFixed(2)+"kb";
    			var data={id:arg.id,'name':arg.name,'size':size};
    			var template=j("#add_file_template").html();
    			var content=renderTemplate(template,data);
    			j("#file_list_body").append(content);
    			adjustTable();
    	   },
    	   'onCancel':function(file){
    	   	j("#file_tr_"+file.id).remove();
    	   },
    	   'onFallback':function(){
    	   		notSupportFlash=true;
    	   		alert('您的浏览器不支持flash，请安装flash插件');
    			j("#file_upload").replaceWith('<span style="color:red">无flash插件 </span>');
    	   }
        });
    });  
		
		
 
 /*	控制创建区域显示	*/
 function showCreateZone(flag){
     if(flag){
     	j("#create_zone_btn").hide();
		j("#create_zone").show();
		j("#new_category_name").val('');
     }else{
		j("#create_zone_btn").show();
		j("#create_zone").hide();
		j("#new_category_name").val('');
	 }
 }
 
 /* 移除文件 */
 function removeFile(fileId){
		//上传失败的删除处理
		if(fileId!='*'){
			var status=j("#file_status_"+fileId).attr('status');
			if(status==3){
				j('#file_tr_'+fileId).remove();
				gUtils.ftable_ajust();
				return;
			}
		}
		var queueData=$('#file_upload').data('uploadify').queueData;
		if(queueData.queueLength<1){
			return ;
		}
 		gUtils.fConfirm('您确认要删除文件么？',function(){
						 UI.dialog.close();
						 $("#file_upload").uploadify('cancel',fileId);
		});
 }
 
 /* 改变上传文件的状态*/
 function changeStatus(fileId,status){
 		var content='';
		var ccsClass='';
		if(status==1){ //上传中
			content='上传中...';
			ccsClass='status-red';
		}
		else if(status==2){ //上传成功
			content='上传成功';
			ccsClass='status-green';
		}else if(status==3){ //上传失败
			content='上传失败！';
			ccsClass='status-red';
		}else{
			content=status;
			ccsClass='status-green';
		}
 	j("#file_status_"+fileId).attr('status',status);
	j("#file_status_"+fileId).html(content);
	j("#file_status_"+fileId).removeClass().addClass(ccsClass); 

 }
 
 /* 创建分类	*/
 function createCategory(){
 
 	var parentId=j("#parentId").val();
	var categoryName=j("#new_category_name").val();
	categoryName=j.trim(categoryName);
	if(categoryName==''){
		message_box('请输入分类名称',1);	
		return;
	}
	
	 if(!gUtils.fis_legal_str(categoryName)){
	 	message_box('分类名称请勿输入特殊字符',2);
		return ;
	 }
	
	if(getStrLength(categoryName)>30){
		message_box('分类名称超过30字符（中文2字符），请修改!',2);
		return ;
	}
	
	var url="/app/fileCate/doAdd.html";
	var param={'fileCate.parentId':parentId,
				'fileCate.cateName':categoryName}
	jQuery.ajax({
				url:  url,
				dataType: "json",
				data: param,
				type:'post',
				success: function(data, textStatus) {
					if(data.result){ //新增成功
						var catId=data.message;
						if(parentId=='0'){	//父分类
                            j("#cateId").append('<option value="'+catId+'"  class="parent_cat" selected>'+categoryName+'</option>');
							j("#parentId").append('<option value="'+catId+'">'+categoryName+'</option>');
						}else{
							var _jObj=getLastObjOfParentId(parentId);
							_jObj.after('<option value="'+catId+'" selected> └ '+categoryName+'</option>');
						
						}
						showCreateZone(false);
						message_box(categoryName+'创建成功',3);
					}else{
						alert('系统错误，创建分类失败！');						
					}
				},
				error: function(xhr, status, errMsg) {
				}
			});
 
 }
 
 
  
 /**	清空上传历史消息		*/
 function clearMsg(){
 		var statusSpans=j("#file_list_body").find("span[status]");
		statusSpans.each(function(){
			var _this=j(this);
			var status=_this.attr('status');
			if(status=='2'||status=='3'){
				var fileId=_this.attr("fileId");
				j("#file_tr_"+fileId).remove();
			}
		});
 }
 
 /* 获取父分类的最后一个index*/
 function getLastObjOfParentId(parentId){
 		var _jBefore=j("#cateId option[value='"+parentId+"']");
		var _jNext=_jBefore.next();
		while(true){
     		if(_jNext.length>0){
    			if(_jNext.attr("class")=='parent_cat'){
    				return _jBefore;
    			}else{
					_jBefore=_jNext;
					_jNext=_jNext.next();
				}
    		}else{
    			return _jBefore;
    		} 
		}
 }

 /**
  获取字符串长度
 */
function getStrLength(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
}

function getCookie(objName){//获取指定名称的cookie的值
	var arrStr = document.cookie.split("; ");
    for(var i = 0;i < arrStr.length;i ++){
    	var temp = arrStr[i].split("=");
    	if(temp[0] == objName) {
			return unescape(temp[1]);
		}
    } 
}

		
/* 渲染简单模板*/
 function renderTemplate(template,data){
 	var content='';
	if(data instanceof Array){
		for(var i=0;i<data.length;i++){
			content+=renderTemplate(template,data[i]);
		}
	}else{
		var t=template;
    	for(var attr in data){
    		var value=data[attr];
			t=t.replace(new RegExp("@{"+attr+"}","gm"),value);
    	}
		content+=t;
	}
 	return content;
 }

 
 void function(j){
 //设置已上传大小的显示值
 	var uploadedFize=j('#uploadedFize').html();
	if(uploadedFize!=''){
		uploadedFize=parseInt(uploadedFize);
		if(uploadedFize<1024){
			j('#uploadedFize').html(uploadedFize+"KB");
		}else{
		  j('#uploadedFize').html((uploadedFize/1024).toFixed(2)+"MB");
		}
	}
 
	j("#btn_createCategory").lazyClick(function(){
		createCategory();
	},3000);

 }(jQuery);
 
