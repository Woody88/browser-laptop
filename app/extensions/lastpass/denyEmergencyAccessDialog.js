var DenyEmergencyAccessDialog=function(b){Dialog.call(this,b,{additionalHeaderClasses:["icon"],dynamicHeight:!0,nextButtonText:Strings.translateString("Deny Access"),backButtonText:Strings.translateString(Strings.Vault.CLOSE),title:Strings.translateString("Emergency Access Request"),buttonAlign:this.RIGHT_ALIGN})};DenyEmergencyAccessDialog.prototype=Object.create(Dialog.prototype);DenyEmergencyAccessDialog.prototype.constructor=DenyEmergencyAccessDialog;
DenyEmergencyAccessDialog.prototype.initialize=function(b){Dialog.prototype.initialize.apply(this,arguments)};
DenyEmergencyAccessDialog.prototype.setup=function(b,a){a.sharee&&(a.sharee.getAccessDate()<new Date?$("#denyEmergencyAccessDialogText").text(Strings.translateString("%1 gained emergency access to your vault on %2",a.sharee.getName(),a.sharee.getAccessDateAsString())):$("#denyEmergencyAccessDialogText").text(Strings.translateString("%1 requested emergency access to your vault. They will receive access on %2",a.sharee.getName(),a.sharee.getAccessDateAsString())));Dialog.prototype.setup.apply(this,
arguments)};DenyEmergencyAccessDialog.prototype.handleSubmit=function(){LPRequest.makeRequest(LPProxy.denyEmergencyAccess,{params:{email:this.data.sharee.getName()},success:function(){Topics.get(Topics.SUCCESS).publish(Strings.translateString("Access denied."))}})};
