if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.Planning = {};
Delegue.Mobile.Planning = function () { };
$.extend(Delegue.Mobile.Planning.prototype,
{
    PlanningID : null,
    StartDate : null,
    EndDate : null,
    Lundi : [],
    Mardi : [],
    Mercredi : [],
    Jeudi : [],
    Vendredi: [],
    Samedi : [],
    Dimanche : []
});