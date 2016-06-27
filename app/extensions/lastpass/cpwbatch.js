var CPWbatch,g_batchpagealive=!0,g_batchpagealiveinterval=-1,g_cpw_batchstates={};CPWbatch||(CPWbatch=new CPWbatch_lib);var g_cpw_batch_aid=null,g_cpwfast=!1,g_cpw_aid_queue=[],g_cpw_status_update_lastmsg="",F_OK=1,F_FAIL=2,F_TIMEOUT=4,F_PENDING=8,F_ALL=F_OK|F_FAIL|F_TIMEOUT|F_PENDING,P_RESET=!0,F_STARTED="started",F_DONE="done",F_NONE=null;function close_cpw_tabs(){g_ischrome&&get_selected_tab(null,function(a){cpwbot_close_cpw_tab_handler(a)})}
function cpwbot_close_cpw_tab_handler(a){var g=gettabid(a);if(null!==g_cpw_server_initiated_tabid&&null!==a&&(g==CPWbot_bg.originating_tabid||g==CPWbot_bg.destination_tabid))if(g_ischrome)chrome.tabs.update(g_cpw_server_initiated_tabid,{active:!0});else if(g_issafari)(a=g_CS_tabs[g_cpw_server_initiated_tabid])&&a.activate();else if(g_isopera)(a=g_CS_tabs[g_cpw_server_initiated_tabid])&&a.update({selected:!0});else if(!g_ismaxthon)if(g_isfirefoxsdk)for(a=0;a<g_tabs.length;a++){if(g_tabs[a].id==g_cpw_server_initiated_tabid){g_tabs[a].activate();
break}}else g_isfirefox&&activate_tabid(g_cpw_server_initiated_tabid);if(CPWbot_bg){if(null!==CPWbot_bg.originating_tabid)if(g_ischrome)"undefined"!=typeof chrome.tabs.remove&&chrome.tabs.remove(CPWbot_bg.originating_tabid,function(){});else if((g_issafari||g_isopera)&&null!==g_CS_tabs)(a=g_CS_tabs[CPWbot_bg.originating_tabid])&&a.close();else if(!g_ismaxthon)if(g_isfirefoxsdk)for(a=0;a<g_tabs.length;a++){if(g_tabs[a].id==CPWbot_bg.originating_tabid){g_tabs[a].close();break}}else g_isfirefox&&close_tabid(CPWbot_bg.originating_tabid);
if(null!==CPWbot_bg.destination_tabid)if(CPWbatch&&CPWbatch.deregister_worker(CPWbot_bg.destination_tabid),g_ischrome)"undefined"!=typeof chrome.tabs.remove&&chrome.tabs.remove(CPWbot_bg.destination_tabid,function(){chrome.runtime.lastError&&debug&&L(chrome.runtime.lastError)});else if((g_issafari||g_isopera)&&null!==g_CS_tabs)(a=g_CS_tabs[CPWbot_bg.destination_tabid])&&a.close();else if(!g_ismaxthon)if(g_isfirefoxsdk)for(a=0;a<g_tabs.length;a++){if(g_tabs[a].id==CPWbot_bg.destination_tabid){g_tabs[a].close();
break}}else g_isfirefox&&close_tabid(CPWbot_bg.destination_tabid)}}function start_pwchange_from_server(a,g){debug&&L("running start_pwchange_from_server for aid="+g+" batchstate="+CPWbatch.cpw_get_batchjob_state());if(!lploggedin)return!1;CPWbatch&&CPWbatch.cpw_get_batchjob_state()&&CPWbatch.update_last_batch_timestamp();cpwbot_preinit();return dopwchange(g,!0,null,!0)}
function end_pwchange_from_server(a,g){var e=cpwbot_getpwchangestate();"FAIL"!=e&&("CAPTCHA"!=e&&"DONE"!=e&&"OK"!=e&&"TIMEOUT"!=e&&0!=e&&null!==e)&&(CPWbatch&&CPWbatch.cpw_get_batchjob_state()?CPWbot_bg&&g==CPWbot_bg.getpwchangeaid()?(L("halting for aid="+g+" current_state="+e),cpwbot_halt()):pass:cpwbot_halt());g_isfirefox?cpwbot_close_cpw_tab_handler(LP.mostRecent().getBrowser().selectedTab):get_selected_tab(null,function(a){cpwbot_close_cpw_tab_handler(a)})}
function CPWbatch_lib(){function a(){}function g(){this.m_workers=[];d.cpw_batchjob_reset_stats();l=null}function e(b){return"undefined"!=typeof g_sites?g_sites[b]:"undefined"!=typeof lpaccts?lpaccts[b]:null}var d=this;this.m_workers={};this.m_max_workers=1;this.m_workermap={};var j=0,k=null,l=null,c={};this.register_worker=function(b,h){if(null===this.m_workers||null==b)return!1;var a=b.toString();if(d.count_workers()>=this.m_max_workers)return L("too many workers, "+d.count_workers()+" >= "+this.m_max_workers),
!1;L("registered: worker "+a+" aid="+h);this.m_workers[a]=h;d.cpw_batchjob_mark_stats(F_PENDING);return!0};this.count_workers=function(){if(null===this.m_workers)return-1;var b=0,h;for(h in this.m_workers)this.m_workers.hasOwnProperty(h)&&b++;return b};this.deregister_worker=function(b){if(null===this.m_workers||null==b)return!1;b=b.toString();this.m_workers[b]&&(L("deregistered: worker "+b+" from aid="+this.m_workers[b]),delete this.m_workers[b]);d.cpw_batchjob_mark_stats(F_PENDING);return!0};this.logout=
function(){g();j=0};this.init=function(){g()};this.cpw_batchjob_mark_stats=function(b,h){if(!c)return!1;var a=null,f=null;h&&h.aid&&(f=h.aid);h&&h.reset&&(a=h.reset);if(0===(b&F_ALL))return!1;(b&F_OK)==F_OK&&("undefined"!=typeof a&&a?c.ok=0:c.ok++);(b&F_FAIL)==F_FAIL&&("undefined"!=typeof a&&a?c.fail=0:c.fail++);(b&F_TIMEOUT)==F_TIMEOUT&&("undefined"!=typeof a&&a?c.timeout=0:c.timeout++);(b&F_PENDING)==F_PENDING&&(c.pending="undefined"!=typeof a&&a?0:d.count_workers());"undefined"==typeof c.byaid&&
(c.byaid={});f&&("undefined"!=typeof a&&a?delete c.byaid[f.toString()]:c.byaid[f.toString()]=b);return!0};this.cpw_batchjob_reset_stats=function(){c=null;c=new a;if(!c)return!1;d.cpw_batchjob_mark_stats(F_ALL,{reset:P_RESET});if("undefined"==typeof Date)return!1;var b=(new Date).getTime();c.start_time=b;return!0};this.cpw_batchjob_endjob_stats=function(){if(!c)return!1;var b=(new Date).getTime(),a=b-c.start_time;c.end_time=b;c.elapsed=a;return!0};this.cpw_batchjob_getstats=function(){return c};this.cpw_get_batchjob_state=
function(){return l};this.cpw_set_batchjob_state=function(b){if("undefined"==typeof b)return debug&&L("batchjob state is missing"),!1;l=b;return!0};this.cpw_get_batchjob_queue_length=function(){return!g_cpw_aid_queue||0>g_cpw_aid_queue.length||"undefined"==typeof g_cpw_aid_queue.length?-1:g_cpw_aid_queue.length};this.cpw_queue_change_donext=function(){var b=d.cpw_queue_change_getnext();g_cpw_batch_aid=b;if(null!=b){if(start_pwchange_from_server(g_cpw_server_initiated_tabid,b))return b;CPWbatch.cpw_batchjob_mark_stats(F_FAIL,
{aid:b});var a="failed to initiate pw change in batch job for aid="+b;d.conditional_website_status_update({aid:b,msg:a});console_error(a);if(lploggedin&&!e(b))return verbose_log("bad aid="+b+" proceed to next"),d.cpw_queue_change_donext();if(lploggedin&&e(b))return verbose_log("other error for aid="+b+" proceed to next"),d.cpw_queue_change_donext()}setTimeout(function(){d.cpw_batch_end()},0);return null};this.cpw_queue_change_getnext=function(){return!g_cpw_aid_queue||0>=g_cpw_aid_queue.length?null:
g_cpw_aid_queue.shift()};this.cpw_batch_end=function(){CPWbatch&&(d.cpw_set_batchjob_state(F_DONE),g_cpwfast=!1,clearInterval(g_batchpagealiveinterval),g_cpw_batch_aid=null,CPWbatch&&(d.cpw_batchjob_endjob_stats(),d.cpw_batchjob_mark_stats(F_PENDING)),d.conditional_website_status_update({msg:"done"}),setTimeout(function(){g_cpw_aid_queue=[];g_cpw_batchstates={}},1E3))};this.cpw_queue_push=function(b){if("undefined"==typeof b||null===b||isNaN(b))return!1;g_cpw_aid_queue.push(b);return!0};this.cpw_batch_wait=
function(b){if(CPWbatch){var a=!1,c=!1,f=g_cpw_batch_aid,e=cpwbot_getpwchangestate();L(sprintf("cpw_batch_wait wake up, state=%s batchstate=%s aid=%d\n",e,CPWbatch.cpw_get_batchjob_state(),f));CPWbatch.cpw_get_batchjob_state()==F_DONE&&(a=!0);switch(e){case "TIMEOUT":case "CAPTCHA":case "FAIL":case "FAIL_PW_SAVED":c=a=!0;break;case "OK":case "DONE":a=!0;break;case "preinit":case null:CPWbot_bg.get_failstate()&&(c=a=!0)}var g=(new Date).getTime();0<j&&(3E5<g-j&&CPWbatch.cpw_get_batchjob_state()!=F_DONE)&&
!a&&(c=a=!0,e="TIMEOUT",L("BATCH JOB TIMED OUT"),CPWbatch.cpw_set_batchjob_state(F_DONE));if(a){c?"TIMEOUT"==e?CPWbatch.cpw_batchjob_mark_stats(F_TIMEOUT,{aid:f}):CPWbatch.cpw_batchjob_mark_stats(F_FAIL,{aid:f}):CPWbatch.cpw_batchjob_mark_stats(F_OK,{aid:f});CPWbatch.cpw_batchjob_mark_stats(F_PENDING);if(CPWbatch.cpw_get_batchjob_state()==F_DONE)return;end_pwchange_from_server(g_cpw_server_initiated_tabid,f);d.conditional_website_status_update({aid:f,msg:"finished change on "+f+" in current batchjob"});
b()}else pass;setTimeout(function(){d.cpw_batch_wait(b)},1001)}};this.cpw_batch_begin=function(b){b=b?b:!1;d.cpw_reset_status_update_ack();g_cpw_status_update_lastmsg="";d.init();var a=!1,c;for(c in g_cpw_aid_queue){var f=g_cpw_aid_queue[c];g_cpw_aid_queue.hasOwnProperty(c)&&e(f)&&e(f).pwprotect&&(a=!0)}!b&&a?security_prompt(function(){CPWbatch.cpw_batch_begin(!0)}):(g_batchpagealive=!0,g_batchpagealiveinterval=setInterval(function(){g_batchpagealive?(console.error("heartbeat received. setting to false"),
g_batchpagealive=!1):(console.error("Killing the batch update. No heartbeat received."),g_cpw_aid_queue=[],cpwbot_halt())},3E4),d.cpw_batchjob_reset_stats(),d.cpw_set_batchjob_state(F_STARTED),g_cpw_batch_aid=d.cpw_queue_change_donext(),setTimeout(function(){d.cpw_batch_wait(d.cpw_queue_change_donext)},1001))};this.conditional_website_status_update=function(b){if(g_cpw_server_initiated_tabid){b||(b={});var a=b.msg;"undefined"==typeof a&&(a="");var c=b.aid;"undefined"==typeof c&&(c=CPWbot_bg.getpwchangeaid());
var f=b.state;"undefined"==typeof f&&(f=cpwbot_getpwchangestate());b=b.batchstate;"undefined"==typeof b&&(b=CPWbatch.cpw_get_batchjob_state());"undefined"==typeof g_cpw_batchstates[c]&&(g_cpw_batchstates[c]=[]);g_cpw_batchstates[c].push(f);var f=b,e;if(null!==f&&CPWbatch){CPWbatch.cpw_batchjob_mark_stats(F_PENDING);try{e=LPJSON.stringify(CPWbatch.cpw_batchjob_getstats())}catch(g){b="JSON error: "+g,CPWbot_bg&&CPWbot_bg.warning_phone_home(b),console_error(b)}}else e=LPJSON.stringify(CPWbot_bg.get_timestamps());
if(CPWbot_bg&&null===CPWbot_bg.originating_tabid&&null===CPWbot_bg.originating_tab&&null!==g_cpw_server_initiated_tabid&&null!==CPWbot_bg.destination_tabid&&null!==CPWbot_bg.destination_tab)if(b="",g_isdebug&&(b=CPWbot_bg.get_user_debug_messages()),CPWbatch.cpw_get_batchjob_state()){if(!k){var j=g_cpw_status_update_lastmsg;a!=j&&(a=j+"\n"+a);g_cpw_status_update_lastmsg=a}g_cpw_status_update_lastmsg=a;d.cpw_clear_status_update_ack();a=JSON.stringify({aid:c,state:JSON.stringify(g_cpw_batchstates),msg:a,
debugmsg:b});sendCS(g_cpw_server_initiated_tabid,{cmd:"cpw_batch_status_update",msgstr:a,batchstate:f,stats:e})}else sendCS(g_cpw_server_initiated_tabid,{cmd:"cpw_status_update",state:JSON.stringify(g_cpw_batchstates),msg:a,debugmsg:b,aid:c,batchstate:f,stats:e})}};this.cpw_set_status_update_ack=function(a){k=a};this.cpw_get_status_update_ack=function(){return k};this.cpw_clear_status_update_ack=function(){d.cpw_set_status_update_ack(!1)};this.cpw_reset_status_update_ack=function(){k=null};this.update_last_batch_timestamp=
function(){return j=(new Date).getTime()};this.get_last_batch_timestamp=function(){return j}}function iscpwfast(){if("undefined"!==typeof g_cpwfast&&!0===g_cpwfast)return!0};
