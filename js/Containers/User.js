if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.User = {};
Delegue.Mobile.User = function () { };
$.extend(Delegue.Mobile.User.prototype,
{
    UserID : null,
    FirstName : null,
    LastName : null,
    Email : null,
    Profil : null,
    Login : null,
    Password : null,


    Zone : []
});