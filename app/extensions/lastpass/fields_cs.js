function LP_field_set_backgroundPosition(b,a){b||(b=LP_derive_doc());if(!b||!a)return!1;var d=!1;if(!0===LP_get_text_dir(a)){var c="98% 50%";if(null!=typeof a.style.backgroundPosition)"98% 50%"!=a.style.backgroundPosition&&(d=!0);else if(g_isie&&null!=typeof a.currentStyle&&null!=typeof a.currentStyle.backgroundPositionX&&null!=typeof a.currentStyle.backgroundPositionY){var g=a.currentStyle.backgroundPositionX,e=a.currentStyle.backgroundPositionY;if("98%"!=g||!lp_in_array(e,["center","50%"]))d=!0}}else if(c=
"center left",null!=typeof a.style.backgroundPosition)lp_in_array(a.style.backgroundPosition,["center left","left center","0% 50%","left"])||(d=!0);else if(g_isie&&(null!=typeof a.currentStyle&&null!=typeof a.currentStyle.backgroundPositionX&&null!=typeof a.currentStyle.backgroundPositionY)&&(g=a.currentStyle.backgroundPositionX,e=a.currentStyle.backgroundPositionY,!lp_in_array(g,["left","0%"])||!lp_in_array(e,["center","50%"])))d=!0;d&&(a.style.backgroundPosition=c);return!0}
function LP_get_text_dir(b){var a=!0;if(b){var d=LP_get_live_style(b);d&&"rtl"==d.direction?a=!1:"rtl"==b.getAttribute("dir")&&(a=!1)}return a}
function LP_input_has_bg_style_override(b){if(!b||!g_stylesheet_grubbing)return!1;var a=!1;try{var d=formcacheget(b,"fakedoc","input-bg-style");if(null!=d)return d;var c=d=0,g=/(background|background-color):[^:].*!important/,e=b.styleSheets;if(e&&g)for(d=0;d<e.length&&32>d;d++){var f=null;"undefined"!=typeof e[d].rules?f=e[d].rules:"undefined"!=typeof e[d].cssRules&&(f=e[d].cssRules);if(f){for(c=0;c<f.length;c++)if(f[c]&&f[c].selectorText&&f[c].cssText&&-1!=f[c].selectorText.indexOf("input:focus")){var h=
f[c].cssText;if(h&&g.exec(h)){verbose_log("focus hack:"+h);a=!0;break}}if(a)break}}}catch(j){}formcacheset(b,"fakedoc","input-bg-style",a);return a}
function ForceFillOrphanFieldClicked(b,a,d){if(!b&&(b=elt.ownerDocument,!b))return!1;var c=!0;if(c=ForceFillFieldClicked(b,a,!1,d))for(var g=b.getElementsByTagName("INPUT"),e=0,e=0;e<g.length&&e<MAX_INPUTS_HARD;e++)if(g[e]==a&&g[e+1]&&e+1<g.length&&e+1<MAX_INPUTS_HARD){isInputFieldPassword(b,g[e+1])&&!lpIsFieldCurrentPWField(g[e+1])&&(c=ForceFillFieldClicked(b,g[e+1],!1,d));break}return c}
function revert_clickable_icon(b,a){verbose_log("entered revert_clickable_icon");if(null!=b){var d=LP_getElementByIdOrName(b,a),c=getIconState(b,a),g=!1,e="sites";c&&"undefined"!=typeof c.dofloater&&(g=c.dofloater);c&&"undefined"!=typeof c.fillhint&&(e=c.fillhint);verbose_log("entered BG image revert");d?g?reset_floating_icon(b,d,e):set_input_icon_image(b,d,e):verbose_log("could not find field named "+field_id)}}function conditional_create_popup(){return!1}
function closeclickableicons(b){if(do_experimental_popupfill&&(b||(b=document),null!=b)){verbose_log("closeclickableicons called on "+b.location.href);var a=getAllIconStates(),d,c;for(d=0;d<a.length;d++){var g=a[d];(c=g.IHTMLElement)||(c=LP_getElementByIdOrName(b,g.idorname));if(!g.dofloat&&g.inframe&&!c)if(g_isfirefox)try{var e,f,h=b.getElementsByTagName("IFRAME");for(e=0;e<h.length;e++)f=h[e].contentDocument,(c=LP_getElementByIdOrName(f,g.idorname))&&"INPUT"==c.tagName&&removeLPBackground(c)}catch(j){verbose_log("Error frame traverse "+
j.message),f=null}else!g_isie&&g_create_iframe_in_top&&pass;else!g.dofloater&&c&&inputHasLPBackground(c)?removeLPBackground(c):pass;resetAllIconStates()}a=LP_get_icon_divs(b);for(e in a)a.hasOwnProperty(e)&&null!=b.getElementById(a[e])&&(g_do_icon_number_hint&&LP_delete_floating_icon_hint(b,a[e]),LP_delete_floating_icon(b,a[e]));LP_reset_icon_divs(b)}}
function setup_input_icon(b,a,d,c,g){var e=!1;if(null==a)return verbose_log("setup_input_icon: ERROR passed null field"),e;if(a.form&&"sites"==d&&is_shopping_form(b,a.form)&&g_aspx_hack&&(isASPpage()&&2<b.getElementsByTagName("form").length||!isASPpage()))return e;g_isfirefox&&(LP&&"undefined"!=typeof g_icon_number_in_toolbar&&g_icon_number_in_toolbar)&&LP.lp_handle_buttons_all("refresh");var f=null,f="undefined"!=typeof LP&&"function"==typeof LP.lpGetCurrentWindow?"undefined"!=typeof LP.lpGetCurrentWindow().getBrowser?
LP.lpGetCurrentWindow().getBrowser().contentDocument:LP.getBrowser().contentDocument:g_isfirefox?top.document:document;if(!do_experimental_popupfill)return e;b||(b=f);var h=LP_pickFieldName(b,a);if(null==a||(!f||!b)||LP_explicit_ignored(b,a))return e;if((e=getIconState(b,h))&&e.IHTMLElement==a&&(inputHasLPBackground(a)||LP_floating_icon_exists(b,h)))return!1;e=null;if("generate"==d||!g&&shouldOfferGenerate(b,a))d="generate";var j=gettldcached(b.location.href),e=shouldCreateFloatingIcon(b,a,j),k=LP_get_text_dir(a);
!1===k&&pass;if(LP_fieldIsReadOnly(a)||LP_fieldIsDisabled(a))return!1;f=b!=f;g_create_iframe_in_top&&(!g_isie&&!g_isfirefox&&LP_inIframe(window))&&(f=!0);g={fillhint:d,fillhintnumber:c[d],inframe:f,idorname:h,doctld:j,dofloater:e?1:0,no_check_generate:g?1:0,IHTMLElement:a,text_direction:k};if(e)if(g_isfirefox&&verbose_log("setup_input_icon step3b"),lpIsVisible(a)&&(null==a.form||a.form&&lpIsVisible(a.form)))saveIconState(h,g,a),e=LP_create_floating_icon(b,a,d,c);else return!1;else saveIconState(h,
g,a),e=set_input_icon_image(b,a,d,!1);set_bg_highlight_effect_handlers(b,a,d);LP_didDocumentEscapeEvent(b)||(LP_setDocumentEscapeEvent(b),LP_addEventHandler(b,"keydown",function(a){LP_keypress_handler(a)},!1));LP_didFieldKeyEvent(b,a)?verbose_log("skip KEYDOWN HANDLER ON "+LP_pickFieldName(b,a)):(verbose_log("SETTING KEYDOWN HANDLER ON "+LP_pickFieldName(b,a)),LP_setFieldKeyEvent(b,a),LP_addEventHandler(a,"keydown",function(c){LP_field_keypress_handler(c,a,d,b)},!1),g_isfirefox&&LP_addEventHandler(a,
"keyup",function(c){handle_form_text_change(b,a,a.form,c)},!1));return e}function refresh_input_icon_bg(b,a,d){if(!b&&(b=LP_derive_doc(),!b))return null;a&&set_input_icon_image(b,a,d,!1)}
function refresh_input_all_icon_bg(b){null==b&&(b=document);if(null!=b){try{if(0<b.location.href.indexOf(".xul"))return;verbose_log("refreshing input icons on "+b.location.href)}catch(a){return}var d=getAllIconStates(),c;for(c=0;c<d.length;c++){var g=d[c].idorname,e=d[c].fillhint,f=d[c].dofloater,h=d[c].IHTMLElement;element_is_detached(b,h,0)&&(h=null);h||(h=LP_getElementByIdOrName(b,g));h&&!f&&refresh_input_icon_bg(b,h,e)}}}
function set_input_icon_image(b,a,d,c){b||(b=LP_derive_doc());if(!b)return!1;var g=b.defaultView;g||(g=window);var e,f=[];f[0]=g_sites_light_ico;f[1]=g_pw_light_ico;f[3]=g_close_light_ico;f[-1]="";f[2]=g_ff_light_ico;f[16]=g_sites_ico;f[17]=g_pw_ico;f[19]=g_close_ico;f[-17]="";f[18]=g_ff_ico;LP_has_highdef_display(g)&&(f[0]=g_40_icons["16x16_lite@2x"],f[16]=g_40_icons["16x16_dark@2x"],f[3]=g_40_icons["IF_Close@2x"],f[19]=g_40_icons["IF_Close@2x"],f[2]=g_40_icons["FormFill@2x"],f[18]=g_40_icons["FormFill_dark@2x"],
f[1]=g_40_icons["Generate@2x"],f[17]=g_40_icons["Generate_dark@2x"]);if(null==a||a.tagName&&"undefined"!=typeof a.tagName.toUpperCase&&"INPUT"!=a.tagName.toUpperCase())return!1;"undefined"==typeof d||null==d?e=0:"formfills"==d?e=2:"sites"==d?e=0:"generate"==d?e=1:"cancel"==d&&(e=3);c&&(e|=16);var h=LP_fieldGetWidth(a),j=!1;if("sites"==d||g_is_specialsite)j=!0;if(!LP_iconFieldWidthOK(a,h,j))return!0;d=a.style.border;h=a.style.backgroundImage;if(""==h&&(g=LP_getComputedStyle(g,a)))h=g.backgroundImage,
d=g.border;"none"==h&&(h="");0<=e&&("undefined"==typeof f[e]&&verbose_log("no icon defined for iconval="+e),c=LP_getloggedin()?0==e||16==e?getnumbericon(b,a,c):f[e]:f[e],h!="url("+c+")"&&(a.style.backgroundImage="url("+c+")",g_issafari&&""!==d&&0<d.indexOf("inset")&&d.replace("inset",""),"no-repeat"!=a.style.backgroundRepeat&&(a.style.backgroundRepeat="no-repeat"),"scroll"!=a.style.backgroundAttachment&&(a.style.backgroundAttachment="scroll"),(c=LP_getAbsolutePos(b,a))&&18>c.height&&0<c.height?"contain"!=
a.style.backgroundSize&&(a.style.backgroundSize="contain"):"16px 18px"!=a.style.backgroundSize&&(a.style.backgroundSize="16px 18px"),LP_field_set_backgroundPosition(b,a)));return!0}
function set_bg_highlight_effect_handlers(b,a,d){a&&(LP_didFieldMouseEvent(b,a)||(LP_setFieldMouseEvent(b,a),LP_addEventHandler(a,"mouseover",function(c){bg_highlight_effect_mouseover(c,b,a,d)}),LP_addEventHandler(a,"mouseout",function(c){bg_highlight_effect_mouseout(c,b,a,d)}),LP_addEventHandler(a,"mousemove",function(c){bg_highlight_effect_mousemove(c,b,a,d)})),"sites"==d&&LP_getloggedin()&&(!g_isfirefox&&!g_isie)&&a.setAttribute("autocomplete","off"))}
function bg_highlight_effect_mousemove(b,a,d){null==b&&(b=window.event);b=LP_getMousePos(b);if(!(0>=b.x&&0>=b.y)&&(a=LP_getAbsolutePos(a,d),!(0>=a.width&&0>=a.height))){var c=a.left+a.width-20;c<a.left&&(c=a.left);d.style.cursor=c<b.x&&a.left+a.width>b.x&&a.top<b.y&&a.top+a.height>b.y?"pointer":"auto"}}
function bg_highlight_effect_mouseover(b,a,d,c){null==b&&(b=window.event);if(!(is_your_popup_showing(a)&&a.g_popupfill_parent==d)&&LP_getEventTarget(b)==d){b=c;c=!1;var g=getIconState(a,LP_pickFieldName(a,d));!b&&(g&&g.hint)&&(b=g.hint);g&&g.dofloater&&(c=g.dofloater);b&&!c&&set_input_icon_image(a,d,b,!0)}}
function bg_highlight_effect_mouseout(b,a,d,c){if(!(is_your_popup_showing(a)&&a.g_popupfill_parent==d)){b=c;c=!1;var g=getIconState(a,LP_pickFieldName(a,d));!b&&(g&&g.hint)&&(b=g.hint);g&&g.dofloater&&(c=g.dofloater);b&&!c&&set_input_icon_image(a,d,b,!1)}}
function popuptoggle(b,a,d,c,g,e,f,h,j,k){if(k)j=k;else if(a){if(0<a.location.href.indexOf(".xul"))return!0;j=LP_getElementByIdOrName(a,d)}else{if(0<b.location.href.indexOf(".xul"))return!0;j=LP_getElementByIdOrName(b,d)}"undefined"!=typeof reset_forcefill_without_fillbest&&reset_forcefill_without_fillbest();k="sites";c?k="generate":e?k="save":f&&(k="formfills");if(is_your_popup_showing(b))closepopupfills(b),g_isfirefox?a?(a.g_popupfill_parent_last=a.g_popupfill_parent,a.g_popupfill_parent=null):
(b.g_popupfill_parent_last=b.g_popupfill_parent,b.g_popupfill_parent=null):(g_popupfill_parent_last=g_popupfill_parent,g_popupfill_parent=null);else{f=LP_getloggedin();if(!f){if("undefined"!=typeof LP&&"undefined"!=typeof LP.lpOpenLogin){LP.lpOpenLogin();return}if(!g_isie){sendBG({cmd:"dologinaction"});return}}g_isfirefox?a?a.g_popupfill_parent=j:b.g_popupfill_parent=j:g_popupfill_parent=j;e=e?!0:!1;g_isie?"undefined"!=typeof init_LPfn&&init_LPfn()&&LPfn.ie_set_lpifmsg(b,j,c,e,k,h):g_isfirefox||(h=
LP_pickFormName(j.ownerDocument,j.form),c=c?1:0,sendBG({cmd:"setpopupfilllastactive",active:h,activefieldid:LP_pickFieldName(document,j),ask_generate:c,opentosave:e,activefieldtype:j.type,start_type:k}));!g_isfirefox&&!g_isie&&(f=document.location.href,"undefined"!=typeof punycode&&(f=punycode.URLToASCII(document.location.href)),sendBG({cmd:"popupregister",docnum:g_docnum,url:f}));f=("function"==typeof ff_calculate_iframe_pos?ff_calculate_iframe_pos:calculate_iframe_pos)(b,j,"300px",should_ignore_body_relative(b));
h=c=0;f&&(c=f.posx,h=f.posy);if(g_isfirefox)ff_popupfill_create_iframe(b,c,h,d,null,null,j,k);else{e=chk_form_is_nonlogin_form(document,j.form);k=checkDocumentForLoginOrphans(document)||checkDocumentForLoginOrphansFirstStage(document);f=checkDocumentForLoginFirstStageForm(document);f=k||f||chk_form_has_password(document,j.form);k=g_popupfill_rows;e&&!f&&(k=g_popupfill_rows_FF);e=g_popupfill_widest+40;120>e&&(e=120);e<g_popupfill_parent.offsetWidth&&(e=g_popupfill_parent.offsetWidth,e+=2*Math.abs(POPUP_FIELD_OFFSET));
e=Math.min(e,MAX_DIALOG_WIDTH);if(1==k&&!create_onerow_iframe){f=null;g_fillaid&&(f=g_fillaid);isEmptyObject(g_autofillsites)||(f=g_autofillsites[0].aid);if(null!=f){sendBG({cmd:"autofillaid",aid:f});verbose_log("filling only, not creating 1 row iframe");return}verbose_log("tried to fill form with invalid acct")}if(0==k&&g==NO_FORCE_NOHITS)verbose_log("not creating empty iframe");else if(f=LP_getloggedin(),g_dologin_clickable&&!f&&(!g_isie||g_isie&&g==FORCE_SHOW_NOHITS_NOLOGIN)){verbose_log("login state: checking whether to issue Chrome login prompt");
if(g==FORCE_SHOW_NOHITS_NOLOGIN)return;if(!g_isie){sendBG({cmd:"dologinaction"});return}}if(g_create_iframe_in_top&&!g_isie&&!g_isfirefox&&LP_inIframe(window)&&LP_do_toplevel_iframe_hack(window)){(f=calculate_iframe_pos(b,j,"300px",!0))?(c=parseInt(f.posx),h=parseInt(f.posy)):h=c=0;var l=g="";try{g=window.name,l=document.location.href}catch(m){}f=b.location.href;"undefined"!=typeof punycode&&(f=punycode.URLToASCII(b.location.href));sendBG({cmd:"createpopuptoplevelfromframe",posx:c,posy:h,id:d,rows:k,
width:e,minheight:g_minheight_override,framename:g,framesrc:l,url:f})}else popupfill_create_iframe(b,c,h,d,k,e,g_minheight_override);g_popupfill_iframe_width_save=e}g_isfirefox?a?relocate_popupfill_iframes(a):relocate_popupfill_iframes(b):(!g_create_iframe_in_top||!LP_inIframe(window)||g_isie||g_isfirefox)&&relocate_popupfill_iframes(b);b=a?a:b;a=!1;if(g=getIconState(b,d))a=g.dofloater;a?change_clickable_icon_to_cancel(b,LPMAGIC+d,d):set_input_icon_image(b,j,"cancel",!0)}}
function inputHasLPBackground(b){if(null==b)return!1;var a=null;if(g_isie&&"undefined"!=typeof b.currentStyle)"undefined"!=typeof b.currentStyle&&(a=b.currentStyle);else try{a=b.ownerDocument.defaultView.getComputedStyle(b,"")}catch(d){"undefined"!=typeof b.currentStyle&&(a=b.currentStyle)}if(a&&("INPUT"==b.tagName||"input"==b.tagName)&&""!=a.backgroundImage){if(-1!=a.backgroundImage.indexOf(g_sites_light_ico)||-1!=a.backgroundImage.indexOf(g_40_icons["16x16_lite@2x"])||-1!=a.backgroundImage.indexOf(g_pw_light_ico)||
-1!=a.backgroundImage.indexOf(g_close_light_ico)||-1!=a.backgroundImage.indexOf(g_ff_light_ico)||-1!=a.backgroundImage.indexOf(g_sites_ico)||-1!=a.backgroundImage.indexOf(g_pw_ico)||-1!=a.backgroundImage.indexOf(g_close_ico)||-1!=a.backgroundImage.indexOf(g_ff_ico)||-1!=a.backgroundImage.indexOf(g_40_icons.IF_Close)||-1!=a.backgroundImage.indexOf(g_40_icons["IF_Close@2x"])||-1!=a.backgroundImage.indexOf(g_40_icons.FormFill)||-1!=a.backgroundImage.indexOf(g_40_icons["FormFill@2x"])||-1!=a.backgroundImage.indexOf(g_40_icons.FormFill_dark)||
-1!=a.backgroundImage.indexOf(g_40_icons["FormFill_dark@2x"])||-1!=a.backgroundImage.indexOf(g_40_icons.Generate)||-1!=a.backgroundImage.indexOf(g_40_icons["Generate@2x"])||-1!=a.backgroundImage.indexOf(g_40_icons.Generate_dark)||-1!=a.backgroundImage.indexOf(g_40_icons["Generate_dark@2x"]))return verbose_log("icon "+LP_getname(b)+" has icon w/o number"),!0;if(-1!=a.backgroundImage.indexOf(getnumbericon(b.ownerDocument,b,!0))||-1!=a.backgroundImage.indexOf(getnumbericon(b.ownerDocument,b,!1)))return!0;
var c;for(c=0;9>=c;c++)if(-1!=a.backgroundImage.indexOf(getnumbericon(b.ownerDocument,b,!0,c))||-1!=a.backgroundImage.indexOf(getnumbericon(b.ownerDocument,b,!1,c)))return verbose_log("icon "+LP_getname(b)+" has icon with number "+c),!0}return!1}
function removeLPBackground(b){if(!b)return!1;try{b.style.backgroundImage="none",b.style.backgroundRepeat="initial",b.style.backgroundAttachment="initial",b.style.backgroundPosition="initial",b.style.backgroundSize="initial"}catch(a){return verbose_log("removeLPBackground error: "+a.message),!1}return!0};
