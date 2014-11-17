if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.Client = {};
Delegue.Mobile.Client = function () { };
$.extend(Delegue.Mobile.Client.prototype,
{
    ClientID : null,
    Description : null,
    FirstName : null,
    LastName : null,
    Address : null,
    CityID : null,
    City : null,
    ZipCode : null,
    Longitude : null,
    Latitude :null
});