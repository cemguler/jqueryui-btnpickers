//test multiple pickers
//test picker inside another picker panel (like color picker inside fontpicker panel)

var btneditors = function() {
	this.colors16 = [
		"aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"
	];
	this.websafecolorparts = new Array('00','CC','33','66','99','FF');
	
	this.fonts = new Array('Arial,Arial,Helvetica,sans-serif','Arial Black,Arial Black,Gadget,sans-serif','Comic Sans MS,Comic Sans MS,cursive','Courier New,Courier New,Courier,monospace','Georgia,Georgia,serif','Impact,Charcoal,sans-serif','Lucida Console,Monaco,monospace','Lucida Sans Unicode,Lucida Grande,sans-serif','Palatino Linotype,Book Antiqua,Palatino,serif','Tahoma,Geneva,sans-serif','Times New Roman,Times,serif','Trebuchet MS,Helvetica,sans-serif','Verdana,Geneva,sans-serif' );
	
	this.pickerpanel = null;
	this.pickerbinding = null;
	this.pickers = [];
	this.selectedvalue = null;
	this.guid = 0;
	//this.blog = querystring("blog") || "default";
	//this.basepath = vbasepath || "";
	if (!window.location.origin) window.location.origin = window.location.protocol+"//"+window.location.host;
	this.basepath = window.location.origin || "";
	this.activedialog = null;
	if ($("#btneditors_css").length==0) {
		$('head').append($('<style id="btneditors_css">' +
					'#btneditors { z-index:500; position:absolute; clear:both; border:1px solid #c0c0c0; padding:10px; background:#dedede; display:block; overflow:hidden; ' +
					' 		-moz-border-radius: 4px; border-radius: 4px; box-shadow: 5px 5px 5px #ddd; }' +
					'#btneditors input[type=button] { font-size:9pt; font-family:Helvetica,Arial,Sans; font-weight:normal; }' +
					'#btnfontpicker { position:absolute; clear:both; border:1px solid #c0c0c0; padding:10px; background:#dedede; display:block; overflow:hidden; ' +
					' 		-moz-border-radius: 4px; border-radius: 4px; box-shadow: 5px 5px 5px #ddd; }' +
					'#btnfontpicker input[type=button] { font-size:9pt; font-family:Helvetica,Arial,Sans; font-weight:normal; }' +
					'#btnspacepicker { position:absolute; clear:both; border:1px solid #c0c0c0; padding:10px; background:#dedede; display:block; overflow:hidden; ' +
					' 		-moz-border-radius: 4px; border-radius: 4px; box-shadow: 5px 5px 5px #ddd; }' +
					'#btnspacepicker label { float:left; width:40px; padding-top:2px; }' +
					'#btnspacepicker input[type=text] { border:0px; padding:0px; font-size:9pt; width:35px; }' +					
					'#btnspacepicker select { padding:1px; font-size:9pt; width:45px; }' +
					'#btnspacepicker .ui-spinner { border:1px solid #aaa !important; }' +
					'#excerpt_preview_container div { display:block; overflow:hidden; background:#fff; border:1px dashed #aaa; padding:4px; margin:3px; } ' +
					'#excerpt_preview_container .post_field { float:left; }' +
					'.ui-widget { font-family: Trebuchet MS, Tahoma, Verdana, Arial, sans-serif; font-size: 11px; }' +
					'.ui-menu { position: absolute; z-index:600; width: 100px; }' +
					'#btnfontlist { width:200px;height:120px; overflow:scroll; overflow-x:hidden; font-size:9pt; background:#fff; border:1px solid #aaaaaa; }' +
					'.btnfontitem { cursor:default; padding:2px 4px; border:1px solid transparent; }' +
					'.btnfontitem:hover { color:#000; background:#ffe63f; border:1px solid #fbbb0f; }' +
					'.btnfontitem.active { color:#fff; background:#3399ff; border:1px solid #3178cb; }' +
					'.pnladvancedcolorpicker input[type=text], #btneditors input[type=text] { border:1px solid #888; width:28px; padding:2px; font-size:8pt; }' +
					'.btneditors_input { display:inline-block; margin-top:4px; padding:2px; border:1px solid #888; background:#ffffff; }' +
					'.btneditors_input input { float:left; background:transparent; }' +
					'.btneditors_pnlselcolor { float:left; border:1px solid #444; }' +
					'.pickertabcontainer { float:left; z-index:100; font-size:8pt; display:block; overflow:hidden; background:#dedede; }' +
					'.pickertab { cursor:default; float:left; background:#444; color:#fff; padding:4px 4px; margin-right:1px; display:block; overflow:hidden; }' +
					'.pickertab:hover { background:#888; }' +
					'.pickertab.active { background:#fff; color:#444; }' +
					'.btneditors_tabpage { float:left; width:190px; padding:5px; background:#fff; height:165px; display:block; overflow:auto; overflow-x:hidden; }' +
					'.btneditors_picksquare { position:relative; display:block; float:left; border:1px solid #000; margin:1px; width:20px; height:20px; font-size:1px; }' +
					'</style>'));
	}

	var othat = this;
	$("body").bind("click", function(event) {
		if (event.target!=null && othat.pickerpanel!=null) {
			var tip = event.target.getAttribute("type");
			if (tip=="btncolor" || tip=="btnfont" || tip=="btnpadding" || tip=="btnmargin" || tip=="btnspacing") return;
			if ($.contains(othat.pickerpanel[0], event.target)) return;
			if ($.contains($("#elem_props")[0], event.target)) return;
			var l = $(".ui-dialog").length;
			if (l>0) {
				if ($(event.target).hasClass("ui-widget-overlay") || $(event.target).hasClass("ui-dialog")) return true;
				if ($.contains($(".ui-dialog")[l-1], event.target)) return;
				return true;
			}
			othat.pickerpanel.remove();
			othat.pickerpanel=null;
			othat.pickerbinding=null;
		} else {
			if (event.target!=null) {
				
			}
		}
		return true;
	});	
}
btneditors.prototype.init = function(vpar) {
	vpar = vpar || $('body');
	var othat = this;
	$("input[type=btncolor]",vpar).each(function() {
		othat.createcolorpicker(this);
	});
	$("input[type=btnpadding]",vpar).each(function() {	
		othat.createspacepicker(this,{mode:'padding'});
	});	
	$("input[type=btnmargin]",vpar).each(function() {	
		othat.createspacepicker(this,{mode:'margin'});
	});	
	$("input[type=btnfont]",vpar).each(function() {	
		othat.createfontpicker(this);
	});
}

btneditors.prototype.createspacepicker = function(el) {
	var othat = this;
	this.guid++;
	if (!el.id) el.id="__btn_dyna_" + this.guid;
	var $this = $(el);
	$this.click(function() {
		this.blur();
		if (othat.pickerbinding) {
			if (othat.pickerbinding.attr("id")!=this.id) {
				othat.hide();
				othat.showspacepicker(this);
			} else {
				othat.showhtmleditor(this);
			}
		} else {
			othat.showspacepicker(this);
		}
	});
}
btneditors.prototype.showspacepicker = function(el) {
	if (this.pickerpanel!=null) this.hide(); 	//this.pickerpanel.remove();	// document.body.removeChild(this.pickerpanel);
	this.pickerbinding = $(el);
	this.pickerpanel = $('<div id="btnspacepicker" refelem="' + el.id + '"></div>');
	var othat = this;
	
	$('body').append(this.pickerpanel);
	var tblstr = '<table height="160" style="font-size:9pt; table-layout:fixed;">' +
				 '<tr id="__pnlmargin"><td valign="top">' +
				 '	<b>Margin All</b><br/>' +
				 '	<input type="text" id="__txtmargin_all" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '	<select id="__txtmargin_all_unit" xstyle="padding:1px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	<br/>' +
				 '	<table id="__pnlmargin_inputs" cellpadding="0" cellspacing="1" style="margin:10px;">' +
				 '	<tr><td>' +
				 '		<label>Top</label>' +
				 '		<input type="text" id="__txtmargin_top" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtmargin_top_unit" xstyle="padding:1px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td><td style="padding-left:5px;" valign="top">' +
				 '		<label>Left</label>' +
				 '		<input type="text" id="__txtmargin_left" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtmargin_left_unit" xstyle="padding:1px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td></tr>' +
				 '	<tr><td>' +
				 '		<label>Bottom</label>' +
				 '		<input type="text" id="__txtmargin_bottom" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtmargin_bottom_unit" xstyle="padding:1px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td><td style="padding-left:5px;" valign="top">' +
				 '		<label>Right</label>' +
				 '		<input type="text" id="__txtmargin_right" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtmargin_right_unit" xstyle="padding:1px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td></tr>' +
				 '	</table>' +
				 '</td></tr>' +
				 '<tr id="__pnlpadding"><td valign="top">' +
				 '	<b>Padding All</b><br/>' +
				 '	<input type="text" id="__txtpadding_all" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '	<select id="__txtpadding_all_unit" xstyle="padding:0px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	<br/>' +
				 '	<table id="__pnlpadding_inputs" cellpadding="0" cellspacing="1" style="margin:10px;">' +
				 '	<tr><td valign="top">' +
				 '		<label>Top</label>' +
				 '		<input type="text" id="__txtpadding_top" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtpadding_top_unit" xstyle="padding:0px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td><td style="padding-left:5px;" valign="top">' +
				 '		<label>Left</label>' +
				 '		<input type="text" id="__txtpadding_left" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtpadding_left_unit" xstyle="padding:0px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td></tr>' +
				 '	<tr><td valign="top">' +
				 '		<label>Bottom</label>' +
				 '		<input type="text" id="__txtpadding_bottom" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtpadding_bottom_unit" xstyle="padding:0px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td><td style="padding-left:5px;" valign="top">' +
				 '		<label>Right</label>' +
				 '		<input type="text" id="__txtpadding_right" xstyle="padding:1px; font-size:9pt; width:35px;">' +
				 '		<select id="__txtpadding_right_unit" xstyle="padding:0px; font-size:9pt; width:45px;"><option>px</option><option selected>pt</option><option>em</option></select>' +
				 '	</td></tr>' +
				 '	</table>' +
				 '</td></tr>' +
				 '<tr><td align="center" height="40">' +
				 '	<div id="pnlmainspacepreview" style="text-align:center; padding-top:20px; width:290px; height:100px; line-height:40px; vertical-align:middle; text-align:center; background:#fff; border:1px solid #aaa; overflow:hidden;">' +
				 '		<div id="pnlspacepreview" style="display:inline-block; border:1px dashed #aa0000;">' +
				 '				<div id="pnlspaceholder" style="border:1px solid #444">' +
				 '					<div style="border:1px dashed #00aa00;">' +
				 '						This is a sample text' +
				 '					</div>' +
				 '				</div>' +
				 '		</div>' +
				 '	</div>' +
				 '</td></tr>' +
				 '<tr><td colspan="2" style="padding-top:10px;">' +
				 '	<input id="btnselectspace_ok" type="button" value=" OK " class="minibutton" style="margin-left:5px; float:right;">' +
				 '	<input id="btnselectspace_cancel" type="button" value=" Cancel " class="minibutton" style="float:right;">' +
				 '</td></tr>' +
				 '</table>';
				 //'</td></tr></table>';
	
	this.pickerpanel.html(tblstr);

	this.pickerpanel.position({
		my:"left top",
		at:"left bottom-2",
		of:this.pickerbinding
	});	
	if (this.pickerbinding.attr("type")=="btnpadding") {
		$("#__pnlmargin").css("display","none");
		this.setspaceinputs(el.value,"padding");
	} else {
		if (this.pickerbinding.attr("type")=="btnmargin") {
			$("#__pnlpadding").css("display","none");
			this.setspaceinputs(el.value,"margin");
		} else {
			this.setspaceinputs(JSON.parse(el.value).padding, "padding");
			this.setspaceinputs(JSON.parse(el.value).margin, "margin");
		}
	}
	$("#btnselectspace_ok").click(function() {
		/*var fval = $(".btnfontitem.active").text() + "; " +
					$("#btnfontstyle").val() + "; " +
					$("#btnfontsize").val() + $("#btnfontsizeunit").val();
		othat.pickerbinding.val(fval);*/
		var res = othat.updatespacepreview();
		if (othat.pickerbinding.attr("type")=="btnpadding") {
			othat.pickerbinding.val(res.padding);
		} else {
			if (othat.pickerbinding.attr("type")=="btnmargin") {
				othat.pickerbinding.val(res.margin);
			} else {
				othat.pickerbinding.val(JSON.stringify(res));
			}
		}
		
       if ($._data(el,'events') !== void(0) && $._data(el,'events').change !== void(0)) {
			othat.pickerbinding.trigger("change");
		}
		othat.selectedvalue = null;
		othat.hide();
	});
	$("#btnselectspace_cancel").click(function() {
		othat.selectedvalue = null;
		othat.hide();
	});
	$("#pnlspacepreview").position({
		my:"center",
		at:"center",
		of:"#pnlmainspacepreview"
	});	
	$("#btnspacepicker input[type=text]").each(function(){
					var $this = $(this);
					 $this.spinner({
						stop:function(event,ui) {
							$this.change();
						}
					 });
	});
	$("#btnspacepicker input, #btnspacepicker select").change(function() {
		if (this.id=="__txtpadding_top" || this.id=="__txtpadding_left" || this.id=="__txtpadding_bottom" || this.id=="__txtpadding_right") {
			othat.updatespacepreview();
		}
		if (this.id=="__txtpadding_all" || this.id=="__txtmargin_all") {
			if (this.id=="__txtpadding_all") {
				$("#__txtpadding_top, #__txtpadding_left, #__txtpadding_bottom, #__txtpadding_right").val(this.value);
				$("#__txtpadding_top_unit, #__txtpadding_left_unit, #__txtpadding_bottom_unit, #__txtpadding_right_unit").val($("#" + this.id + "_unit").val());				
			} else {
				$("#__txtmargin_top, #__txtmargin_left, #__txtmargin_bottom, #__txtmargin_right").val(this.value);
				$("#__txtmargin_top_unit, #__txtmargin_left_unit, #__txtmargin_bottom_unit, #__txtmargin_right_unit").val($("#" + this.id + "_unit").val());				
			}
			othat.updatespacepreview();
		}
		if (this.id=="__txtpadding_all_unit" || this.id=="__txtmargin_all_unit") {
			if (this.id=="__txtpadding_all_unit") {
				$("#__txtpadding_top_unit, #__txtpadding_left_unit, #__txtpadding_bottom_unit, #__txtpadding_right_unit").val(this.value);
				if ($("#" + this.id.replace("_unit","")).val()!="") {
					$("#__txtpadding_top, #__txtpadding_left, #__txtpadding_bottom, #__txtpadding_right").val($("#" + this.id.replace("_unit","")).val());
					//$("#pnlspaceholder").css("padding", $("#" + this.id.replace("_unit","")).val() + this.value);
				}
			} else {
				$("#__txtmargin_top_unit, #__txtmargin_left_unit, #__txtmargin_bottom_unit, #__txtmargin_right_unit").val(this.value);
				if ($("#" + this.id.replace("_unit","")).val()!="") {
					$("#__txtmargin_top, #__txtmargin_left, #__txtmargin_bottom, #__txtmargin_right").val($("#" + this.id.replace("_unit","")).val());
				}
			}
			othat.updatespacepreview();
		}
	});
}
btneditors.prototype.setspaceinputs = function(vstr, tip) {
	var orival = vstr;
	if ($.trim(orival)=="") return;
	var oriarr = orival.split(" ");
	var idpre = "#__txt" + tip;
	if (oriarr.length==1) {
		var sgn = oriarr[0].substring(0,1);
		sgn = ((sgn=="-"||sgn=="+")?sgn:"");
		var num = sgn + parseInt(oriarr[0].replace(/[^0-9\.]/g, ''));
		var sz = oriarr[0].replace(num,"");
		$(idpre + "_all").val(num);
		$(idpre + "_all_unit").val(sz);
		$(idpre + "_top").val(num);
		$(idpre + "_top_unit").val(sz);
		$(idpre + "_bottom").val(num);
		$(idpre + "_bottom_unit").val(sz);
		$(idpre + "_left").val(num);
		$(idpre + "_left_unit").val(sz);
		$(idpre + "_right").val(num);
		$(idpre + "_right_unit").val(sz);
	} else {
		var sgn = oriarr[0].substring(0,1);
		sgn = ((sgn=="-"||sgn=="+")?sgn:"");
		var num = sgn + parseInt(oriarr[0].replace(/[^0-9\.]/g, ''));
		var sz = oriarr[0].replace(num,"");
		$(idpre + "_top").val(num);
		$(idpre + "_top_unit").val(sz);
		if (oriarr.length==2) {
			if (oriarr[0]==oriarr[1]) {
				$(idpre + "_all").val(num);
				$(idpre + "_all_unit").val(sz);
			}
			$(idpre + "_bottom").val(num);
			$(idpre + "_bottom_unit").val(sz);
			sgn = oriarr[1].substring(0,1);
			sgn = ((sgn=="-"||sgn=="+")?sgn:"");
			num = sgn + parseInt(oriarr[1].replace(/[^0-9\.]/g, ''));
			sz = oriarr[1].replace(num,"");
			$(idpre + "_left").val(num);
			$(idpre + "_left_unit").val(sz);
			$(idpre + "_right").val(num);
			$(idpre + "_right_unit").val(sz);
		} else {
			if (oriarr.length==3) {
				if (oriarr[0]==oriarr[1] && oriarr[0]==oriarr[2]) {
					$(idpre + "_all").val(num);
					$(idpre + "_all_unit").val(sz);
				}
				sgn = oriarr[1].substring(0,1);
				sgn = ((sgn=="-"||sgn=="+")?sgn:"");
				num = sgn + parseInt(oriarr[1].replace(/[^0-9\.]/g, ''));
				sz = oriarr[1].replace(num,"");
				$(idpre + "_left").val(num);
				$(idpre + "_left_unit").val(sz);
				$(idpre + "_right").val(num);
				$(idpre + "_right_unit").val(sz);
				sgn = oriarr[2].substring(0,1);
				sgn = ((sgn=="-"||sgn=="+")?sgn:"");
				num = sgn + parseInt(oriarr[2].replace(/[^0-9\.]/g, ''));
				sz = oriarr[2].replace(num,"");
				$(idpre + "_bottom").val(num);
				$(idpre + "_bottom_unit").val(sz);
			} else {
				if (oriarr[0]==oriarr[1] && oriarr[0]==oriarr[2] && oriarr[0]==oriarr[3]) {
					$(idpre + "_all").val(num);
					$(idpre + "_all_unit").val(sz);
				}
				sgn = oriarr[1].substring(0,1);
				sgn = ((sgn=="-"||sgn=="+")?sgn:"");
				num = sgn + parseInt(oriarr[1].replace(/[^0-9\.]/g, ''));
				sz = oriarr[1].replace(num,"");
				$(idpre + "_right").val(num);
				$(idpre + "_right_unit").val(sz);
				sgn = oriarr[2].substring(0,1);
				sgn = ((sgn=="-"||sgn=="+")?sgn:"");
				num = sgn + parseInt(oriarr[2].replace(/[^0-9\.]/g, ''));
				sz = oriarr[2].replace(num,"");
				$(idpre + "_bottom").val(num);
				$(idpre + "_bottom_unit").val(sz);
				sgn = oriarr[3].substring(0,1);
				sgn = ((sgn=="-"||sgn=="+")?sgn:"");
				num = sgn + parseInt(oriarr[3].replace(/[^0-9\.]/g, ''));
				sz = oriarr[3].replace(num,"");
				$(idpre + "_left").val(num);
				$(idpre + "_left_unit").val(sz);
			}
		}
	}
	this.updatespacepreview();
}
btneditors.prototype.updatespacepreview = function() {
	var res = {
		padding:"",
		margin:""
	};
	/*
		margin:25px 50px 75px 100px; 
		-top margin is 25px
		-right margin is 50px
		-bottom margin is 75px
		-left margin is 100px

		margin:25px 50px 75px;
		-top margin is 25px
		-right and left margins are 50px
		-bottom margin is 75px

		margin:25px 50px;
		-top and bottom margins are 25px
		-right and left margins are 50px

		margin:25px;
		-all four margins are 25px	
	*/
	res.padding = "" +
				($("#__txtpadding_top").val() ? $("#__txtpadding_top").val() + $("#__txtpadding_top_unit").val() + " " : "") +
				($("#__txtpadding_right").val() ? $("#__txtpadding_right").val() + $("#__txtpadding_right_unit").val() + " " : "") +
				($("#__txtpadding_bottom").val() ? $("#__txtpadding_bottom").val() + $("#__txtpadding_bottom_unit").val() + " " : "") +
				($("#__txtpadding_left").val() ? $("#__txtpadding_left").val() + $("#__txtpadding_left_unit").val() : "");
	res.margin = "" +
				($("#__txtmargin_top").val() ? $("#__txtmargin_top").val() + $("#__txtmargin_top_unit").val() + " " : "") +
				($("#__txtmargin_right").val() ? $("#__txtmargin_right").val() + $("#__txtmargin_right_unit").val() + " " : "") +
				($("#__txtmargin_bottom").val() ? $("#__txtmargin_bottom").val() + $("#__txtmargin_bottom_unit").val() + " " : "")  +
				($("#__txtmargin_left").val() ? $("#__txtmargin_left").val() + $("#__txtmargin_left_unit").val() : "");

	if (res.margin) $("#pnlspaceholder").css("margin", res.margin);
	if (res.padding) $("#pnlspaceholder").css("padding", res.padding);

	$("#pnlspacepreview").position({
		my:"center",
		at:"center",
		of:"#pnlmainspacepreview"
	});
	return res;
}

btneditors.prototype.createfontpicker = function(el, opts) {
	var othat = this;
	this.guid++;
	if (!el.id) el.id="__btn_dyna_" + this.guid;
	var $this = $(el);
	$this.click(function() {
		this.blur();
		if (othat.pickerbinding) {
			if (othat.pickerbinding.attr("id")!=this.id) {
				othat.hide();
				othat.showfontpicker(this);
			} else {
				othat.showfontpicker(this);
			}
		} else {
			othat.showfontpicker(this);
		}
	});
}
btneditors.prototype.showfontpicker = function(el) {
	this.pickerbinding = $(el);
	if (this.pickerpanel!=null) this.pickerpanel.remove();	// document.body.removeChild(this.pickerpanel);
	this.pickerpanel = $('<div id="btnfontpicker" refelem="' + el.id + '"></div>');
	var othat = this;
	
	$('body').append(this.pickerpanel);
	var tblstr = '<table height="160" style="font-size:9pt; table-layout:fixed;">' +
				 '<tr><td valign="top">' +
				 '	Font Family<br/>' +
				 '	<div id="btnfontlist">';
	$.each(this.fonts, function(i, item) {
		tblstr += '	<div class="btnfontitem" style="font-family:' + item + '">' + item + '</div>';
	});
	tblstr += 	 '	</div>' +
				 '</td><td valign="top">' +
				 //'<table cellpadding="0">' +
				 //'<tr><td>' +
				 '	Font Style<br/>' +
				 '	<select id="btnfontstyle" size="8" style="font-size:9pt; width:100px;">' +
				 '	<option value="normal" selected>Regular</option>' +
				 '	<option value="italic">Italic</option>' +
				 '	<option value="bold">Bold</option>' +
				 '	<option value="bolditalic">Bold Italic</option>' +
				 '	</select>' +
				 '</td><td valign="top">' +
				 '	Font Size<br/>' +
				 '	<select id="btnfontsize" size="8" style="font-size:9pt; width:60px;">' +
				 '	<option>8</option>' +
				 '	<option>9</option>' +
				 '	<option selected>10</option>' +
				 '	<option>11</option>' +
				 '	<option>12</option>' +
				 '	<option>14</option>' +
				 '	<option>16</option>' +
				 '	<option>18</option>' +
				 '	<option>20</option>' +
				 '	<option>22</option>' +
				 '	<option>28</option>' +
				 '	<option>36</option>' +
				 '	<option>48</option>' +
				 '	<option>72</option>' +
				 '	</select>' +
				 '</td><td valign="top">&nbsp;<br/>' +
				 '	<select id="btnfontsizeunit" size="8" style="font-size:9pt; width:30px;">' +
				 '	<option>px</option>' +
				 '	<option selected>pt</option>' +
				 '	<option>em</option>' +
				 '	</select>' +
				 '</td></tr>' +
				 '<tr><td colspan="4" align="center" height="40">' +
				 '	<div id="pnlfontpreview" style="float:left; width:402px; height:40px; line-height:40px; vertical-align:middle; text-align:center; background:#fff; border:1px solid #aaa; overflow:hidden;">' +
				 '		This is a sample text and this goes on and on' +
				 '	</div>' +
				 '</td></tr>' +
				 '<tr><td colspan="4" style="padding-top:10px;">' +
				 '	<input id="btnselectfont_ok" type="button" value=" OK " class="minibutton" style="margin-left:5px; float:right;">' +
				 '	<input id="btnselectfont_cancel" type="button" value=" Cancel " class="minibutton" style="float:right;">' +
				 '</td></tr>' +
				 '</table>';
				 //'</td></tr></table>';
	
	this.pickerpanel.html(tblstr);
	
	this.pickerpanel.position({
		my:"left top",
		at:"left bottom-2",
		of:this.pickerbinding
	});	
	$(".btnfontitem").click(function() {
		$(".btnfontitem").each(function() {
			this.className="btnfontitem";
		});
		this.className="btnfontitem active";
		othat.updatefontpreview();
	});
	$("#btnfontstyle,#btnfontsize,#btnfontsizeunit").change(function() {
		othat.updatefontpreview();
	});
	$("#btnselectfont_ok").click(function() {
		var fval = $(".btnfontitem.active").text() + ";" +
					$("#btnfontstyle").val() + ";" +
					$("#btnfontsize").val() + $("#btnfontsizeunit").val();
		othat.pickerbinding.val(fval);
		if ($._data(el,'events') !== void(0) && $._data(el,'events').change !== void(0)) {
			othat.pickerbinding.trigger("change");
		}
		othat.hide();
	});
	$("#btnselectfont_cancel").click(function() {
		othat.hide();
	});
	this.setfontinputs();
}
btneditors.prototype.updatefontpreview = function() {
	var prevpnl = $("#pnlfontpreview");
	prevpnl.css("font-family", $(".btnfontitem.active").text());
	prevpnl.css("font-style", $("#btnfontstyle").val());
	prevpnl.css("font-size", $("#btnfontsize").val() + $("#btnfontsizeunit").val());
}
btneditors.prototype.setfontinputs = function() {
	//Arial Black,Arial Black,Gadget,sans-serif; italic; 12px
	var orival = this.pickerbinding.val();
	if (!$.trim(orival)) return;
	var oriarr = orival.split(";");
	if (oriarr.length!=3) return;
	$(".btnfontitem").each(function() {
		this.className="btnfontitem";
	});		
	var $selfont = $('.btnfontitem:contains("' + $.trim(oriarr[0]) + '")');
	$selfont.get(0).className="btnfontitem active";
	$("#btnfontpicker #btnfontstyle").val($.trim(oriarr[1]));
	var num = parseInt(oriarr[2].replace(/[^0-9\.]/g, ''));
	var sz = oriarr[2].replace(num,"");
	$("#btnfontpicker #btnfontsize").val(num);
	$("#btnfontpicker #btnfontsizeunit").val(sz);
	
	var $parentDiv = $selfont.parent();
	$parentDiv.scrollTop($parentDiv.scrollTop() + $selfont.position().top - $parentDiv.height()/2 + $selfont.height()/2);
	
	this.updatefontpreview();
}

btneditors.prototype.createcolorpicker = function(el, opts) {
	//border:false
	//fitparent:true
	var othat = this;
	this.guid++;
	if (!el.id) el.id="__btn_dyna_" + this.guid;
	if (!opts) {
		opts = {
			border:false,
			fitparent:true
		}
	}
	var $this = $(el);
	var vhei = $this.height();
	var vid = "picker_" + el.id;
	var stil = "";
	if (!opts.border) stil = ' style="border:1px solid #444;"';
	$this.wrapAll('<div id="' + vid + '" class="btneditors_input"' + stil + '></div>');
	$this.css("float","left");
	$this.css("border","0px");
	//$this.css("background","#ff0000");
	$this.attr("maxlength","7");
	$('<div class="btneditors_pnlselcolor">&nbsp;</div>').insertAfter($this);
	$('#' + vid + ' .btneditors_pnlselcolor').height(vhei);
	$('#' + vid + ' .btneditors_pnlselcolor').width(vhei);
	$('#' + vid + ' .btneditors_pnlselcolor').css("margin-left","3px");
	//$('#' + vid + ' .btneditors_pnlselcolor').css("margin-right","1px");
	
	//$this.width($this.parent().parent().width()-vhei-8);
	
	if (el.value) $('#' + vid + ' .btneditors_pnlselcolor').css("background", el.value);
	$this.keyup(function() {
		if (this.value.length==7 && this.value.substring(0,1)=="#" && $.Color(this.value)!=null) {
			this.style.color="#000000";
			this.nextSibling.style.background=this.value;
		} else {
			if (this.value.length==7 || this.value.substring(0,1)!="#") this.style.color="#ff0000";
			if (this.value.length==0) this.style.color="#000000";
		}
	});
	$this.click(function() {
		if (othat.pickerbinding) {
			if (othat.pickerbinding.attr("id")!=this.id) othat.showcolorpicker(this);
		} else {
			othat.showcolorpicker(this);
		}
	});
	$this.change(function() {
		if (this.value) $('#' + vid + ' .btneditors_pnlselcolor').css("background", this.value);
	});
}
btneditors.prototype.hide = function() {
	this.pickerpanel.remove();
	this.pickerpanel=null;
	this.pickerbinding=null;
}
btneditors.prototype.sethsv = function(vposX, vposY) {
		var x = vposX;
		var y = vposY;
		var basecolorstr = $("#__txtbasecolor").val() || "#ff0000";
		var basecolor = $.Color(basecolorstr);
		//$("#txtposition").val(x + " - " + y);
		var pickerArea = $("#overlay");
		var lum = basecolor.lightness() * Math.round(((150 - y) / 150)*100)/100;
		var sat = Math.round((x / 150)*100)/100;
		var hsv = basecolor.lightness(lum);
		var vcol = hsv.saturation(sat);
		var vhex = vcol.toHexString();
		$("#__txthex").val(vhex);
		$("#__pnlcolor").css("background", vhex);
		$("#__txtred").val(vcol.red());
		$("#__txtgreen").val(vcol.green());
		$("#__txtblue").val(vcol.blue());
		$("#__txthue").val(vcol.hue());
		$("#__txtsat").val(vcol.saturation()*100);
		$("#__txtlum").val(vcol.lightness()*100);		
}
btneditors.prototype.sethue = function(vposY, hei) {
		var y = vposY;
		//var hei = $("#hue_overlay").height()-2;
		var hsv = {
			hue: 360-(Math.round((y/hei)*100)/100)*360,
			saturation:1.0,
			lightness:0.5,
			alpha:0
		}
		var vcol = $.Color(hsv);
		var vhex = vcol.toHexString();
		$("#__txtbasecolor,#__txthex").val(vhex);
		//$("#__txthex").val(vhex);
		$("#overlay_container").css("background", vhex);
		$("#__pnlcolor").css("background", vhex);
		$("#__txtred").val(vcol.red());
		$("#__txtgreen").val(vcol.green());
		$("#__txtblue").val(vcol.blue());
		$("#__txthue").val(vcol.hue());
		$("#__txtsat").val(vcol.saturation()*100);
		$("#__txtlum").val(vcol.lightness()*100);
}
btneditors.prototype.showcolorpicker = function(el) {
	this.pickerbinding = $(el);
	if (this.pickerpanel!=null) this.pickerpanel.remove();	// document.body.removeChild(this.pickerpanel);
	this.pickerpanel = $('<div id="btneditors" refelem="' + el.id + '"></div>');
	var othat = this;

	$('body').append(this.pickerpanel);
	
	var tblstr = '<div class="pickertabcontainer">' +
				'	<div class="pickertab active">Simple</div>' +
				'	<div class="pickertab">WebSafe</div>' +
				'	<div class="pickertab">Advanced</div>' +
				'</div>';
				
	tblstr += '<div class="btneditors_tabpage simplepicker" style="clear:both;">';
	for (var x=0; x<this.colors16.length; x++) {
		tblstr += '<div class="btneditors_picksquare" style="background:' + $.Color(this.colors16[x]).toHexString() + ';">&nbsp;</div>';			
	}
	tblstr += '</div>';

	tblstr += '<div class="btneditors_tabpage websafepicker" style="clear:both; display:none;">';
	for(i=0; i<this.websafecolorparts.length; i++){
		for(j=0; j<this.websafecolorparts.length; j++){
			for(k=0; k<this.websafecolorparts.length; k++){
				tblstr += '<div class="btneditors_picksquare" style="width:10px; height:10px; background:#' + this.websafecolorparts[i] + this.websafecolorparts[j] + this.websafecolorparts[k] + ';">&nbsp;</div>';			
			}
		}
	}			
	tblstr += '</div>';
	tblstr += '<div class="btneditors_tabpage advancedpicker" style="clear:both; display:none;">';
	tblstr += '		<div class="pnladvancedcolorpicker" style="display:inline-block; xborder:1px solid #444; background:#fff; padding:4px;">' +
			'			<input id="__txtbasecolor" style="display:none;">' +
			'			<div id="mainoverlay" style="float:left; display:block; overflow:hidden; xborder:1px solid #444;">' +
			'				<div id="overlay_container" style="margin:3px; width:150px; height:150px; background:#ff0000;">' +
			'					<div id="overlay" style="position:absolute; width:150px; height:150px; background:transparent url(images/overlay.png) no-repeat;">' +
			'						<div id="color_selector" style="width:4px; height:4px; border:1px solid #444; background:transparent;"></div>' +
			'					</div>' +
			'				</div>' +
			'			</div>' +
			'			<div id="huepanel" style="float:left; xborder:1px solid #444; width:20px; xmargin-left:-2px; display:block; overflow:hidden;">' +
			'				<div style="margin:3px; width:150px; height:150px; background:transparent;">' +
			'					<div id="hue_overlay" style="position:absolute; width:16px; height:152px; background:transparent url(images/hue.png) no-repeat 2px 1px;">' +
			'						<div id="hue_selector" style="width:15px; height:2px; border:1px solid #444; background:#fff; font-size:1px;">&nbsp;</div>' +
			'					</div>' +
			'				</div>' +
			'			</div>' +
			'		</div>';
	
	tblstr += '</div>';
	tblstr+='		<div style="float:left; margin-left:10px; display:block; overflow:hidden;">' +
			'			<table width="100%" style="font-size:8pt;">' +
			'			<tr><td>Red<br/><input type="text" id="__txtred"></td>' +
			'				<td>Green<br/><input type="text" id="__txtgreen"></td>' +
			'				<td>Blue<br/><input type="text" id="__txtblue"></td></tr>' +
			'			<tr><td>Hue<br><input type="text" id="__txthue"></td>' +
			'				<td>Satur<br><input type="text" id="__txtsat"></td>' +
			'				<td>Light<br><input type="text" id="__txtlum"></td></tr>' +
			'			<tr><td valign="top" colspan="3" style="padding-top:10px;">' +
			'				<table width="100%" cellpadding="0" cellspacing="0" style="font-size:8pt;">' +
			'				<tr><td>' +
			'					<div id="__pnlcolor" style="width:45px; height:45px; border:1px solid #888;">&nbsp;</div>' +
			'					<input type="text" id="__txthex" value="" style="clear:both; margin-top:2px; width:41px;">' +
			'				</td><td valign="bottom">' +
			'				</td></tr>' +
			'				</table><br/>' +
			'				<input id="btnselectcolor_ok" type="button" value=" OK " class="minibutton" style="margin-left:5px; float:right;">' +
			'				<input id="btnselectcolor_cancel" type="button" value=" Cancel " class="minibutton" style="float:right;">' +
			'			</td></tr>' +
			'			</table>' +
			'		</div>' +
			'	</div>';

			//'					<input id="btnselectcolor" type="button" value=" OK " class="minibutton">' +

	this.pickerpanel.html(tblstr);
	if (el.value) {
		var vcol = $.Color(el.value);
		if (vcol) {
			var vhex = vcol.toHexString();
			$("#__txthex").val(vhex);
			$("#__pnlcolor").css("background", vhex);
			$("#__txtred").val(vcol.red());
			$("#__txtgreen").val(vcol.green());
			$("#__txtblue").val(vcol.blue());
			$("#__txthue").val(vcol.hue());
			$("#__txtsat").val(vcol.saturation()*100);
			$("#__txtlum").val(vcol.lightness()*100);		
		}
	}
	$(".pickertab").click(function() {	
		$(".pickertab").each(function() {
			this.className="pickertab";
		});
		this.className="pickertab active";
		$(".btneditors_tabpage").css("display","none");
		if (this.innerText=="Simple") $(".btneditors_tabpage.simplepicker").css("display","block");
		if (this.innerText=="WebSafe") $(".btneditors_tabpage.websafepicker").css("display","block");
		if (this.innerText=="Advanced") $(".btneditors_tabpage.advancedpicker").css("display","block");
	});
	$(".btneditors_picksquare").click(function() {		
		var vcol = $.Color(this.style.background);
		var vhex = vcol.toHexString();
		$("#__txthex").val(vhex);
		$("#__pnlcolor").css("background", vhex);
		$("#__txtred").val(vcol.red());
		$("#__txtgreen").val(vcol.green());
		$("#__txtblue").val(vcol.blue());
		$("#__txthue").val(vcol.hue());
		$("#__txtsat").val(vcol.saturation()*100);
		$("#__txtlum").val(vcol.lightness()*100);
	});
	$("#btnselectcolor_ok").click(function() {
		othat.pickerbinding.val($("#__txthex").val());
		othat.pickerbinding.next().css("background",$("#__txthex").val());
		if ($._data(el,'events') !== void(0) && $._data(el,'events').change !== void(0)) {
			othat.pickerbinding.trigger("change");
		}		
		othat.hide();
	});
	$("#btnselectcolor_cancel").click(function() {
		othat.hide();
	});
	$("#hue_overlay").click(function(event) {
		if ($(this).is('.ui-draggable-dragging')) return;	
		var vpos = event.pageY - $(event.target).offset().top;
		$("#hue_selector").position({
			my:"left top",
			at:"left top+" + vpos,
			of:"#hue_overlay"
		});			
		othat.sethue(vpos, $("#hue_overlay").height()-2);
	});
	$("#hue_selector").draggable({ 
		containment: "#hue_overlay", 
		scroll: false,
		drag:function(event,ui) {
			var y = ui.position.top;
			var hei = $("#hue_overlay").height()-2;
			othat.sethue(y, hei);
		}
	});
	$("#color_selector").position({
		my:"right top",
		at:"right top",
		of:"#mainoverlay"
	});			
	
	$("#mainoverlay").click(function(event) {
		if ($(this).is('.ui-draggable-dragging')) return;	
		var vposY = event.pageY - $(event.target).offset().top;
		var vposX = event.pageX - $(event.target).offset().left;
		$("#color_selector").position({
			my:"left top",
			at:"left+" + vposX + " top+" + vposY,
			of:"#mainoverlay"
		});			
		othat.sethsv(vposX,vposY);
	});
	$("#color_selector").draggable({ 
		containment: "#mainoverlay", 
		scroll: false,
		drag:function(event,ui) {
			othat.sethsv(ui.position.left + 3, ui.position.top + 3);
		}  
	});				
	this.pickerpanel.position({
		my:"left top",
		at:"left bottom-2",
		of:$(el).parent()
	});

	
}


