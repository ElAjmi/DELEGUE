if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.PlanningDay = {};
Delegue.Mobile.PlanningDay = function () { };
$.extend(Delegue.Mobile.PlanningDay.prototype,
    {
        PlanningDayID : null,
        PlanningID : null,
        ClientID : null,
        DayNumber : null,
        Client : null

    });