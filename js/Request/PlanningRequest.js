if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.PlanningRequest = {};

Delegue.Mobile.PlanningRequest =
{
    connexion: null,

    GetPlanningFromServer : function(user,callback)
    {
        var form = this;
        var methode = "GetPlanningByUserID";
        var data = user.UserID;
        var url = Delegue.Mobile.Common.ServerURL + "/" + methode + "/" + data;

        Delegue.Mobile.Common.CallService(url,
            function(returnedData)
            {
                if(returnedData == "error")
                {
                    callback("error");
                }
                else if(returnedData == null)
                {
                    callback(null);
                }
                else
                {
                    var json = returnedData;
                    var planning = form.createPlanning(json);
                    form.InsertPlanning(planning,callback);
                }

            }
        );
    },

    createPlanning : function(json)
    {
        var planning = new Delegue.Mobile.Planning();
        planning.PlanningID = json.PlanningID;
        planning.StartDate = json.StartDate;
        planning.EndDate = json.EndDate;
        planning.Lundi = json.Lundi == undefined ? [] :json.Lundi ;
        planning.Mardi = json.Mardi == undefined ? [] :json.Mardi;
        planning.Mercredi = json.Mercredi == undefined ? [] :json.Mercredi;
        planning.Jeudi = json.Jeudi == undefined ? [] :json.Jeudi;
        planning.Vendredi = json.Vendredi == undefined ? [] :json.Vendredi;
        planning.Samedi = json.Samedi == undefined ? [] :json.Samedi;
        planning.Dimanche = json.Dimanche == undefined ? [] :json.Dimanche;
        return planning;
    },

    InsertPlanning : function(planning,callback)
    {
        var form = this;
        form.connexion.transaction(
            function (tx)
            {
                form.InsertPlanningCMD(tx,planning);
            },
            function (err)
            {
                callback("error");
            },
            function ()
            {
                callback(planning);
            }
        );
    },

    InsertPlanningCMD : function(requete,planning)
    {
        requete.executeSql('INSERT INTO Planning (PlanningID,StartDate,EndDate,Synch) VALUES('
            + planning.PlanningID + ',"' + planning.StartDate + '","' + planning.EndDate + '","True"' + ')');

        for(var i = 0 ; i < planning.Lundi.length;i++ )
        {

            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Lundi[i].PlanningDayID + ',"' + planning.PlanningID + '",' + planning.Lundi[i].ClientID + ',"' + 1 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Mardi.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Mardi[i].PlanningDayID + ',"' + planning.PlanningID + '",' + planning.Mardi[i].ClientID + ',"' + 2 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Mercredi.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Mercredi[i].PlanningDayID + ',"'+ planning.PlanningID + '",' + planning.Mercredi[i].ClientID + ',"' + 3 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Jeudi.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Jeudi[i].PlanningDayID + ',"' + planning.PlanningID + '",' + planning.Jeudi[i].ClientID + ',"' + 4 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Vendredi.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Vendredi[i].PlanningDayID + ',"' + planning.PlanningID + '",' + planning.Vendredi[i].ClientID + ',"' + 5 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Samedi.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Samedi[i].PlanningDayID + ',"' + planning.PlanningID + '",' + planning.Samedi[i].ClientID + ',"' + 6 + '","True"' + ')');
        }
        for(var i = 0 ; i < planning.Dimanche.length;i++ )
        {
            requete.executeSql('INSERT INTO PlanningDay (PlanningDayID,PlanningID,ClientID,DayNumber,Synch) VALUES('
                + planning.Dimanche[i].PlanningDayID + ',"'+ planning.PlanningID + '",' + planning.Dimanche[i].ClientID + ',"' + 7 + '","True"' + ')');
        }
    },

    GetPlanning : function(callback)
    {
        var form = this;
        form.connexion.transaction(
            function (tx)
            {
                form.GetPlanningCMD(tx,callback);
            },
            function (err)
            {
                callback("error");
            }
        );
    },

    GetPlanningCMD : function(requete,callback)
    {
        var form = this;
        requete.executeSql('SELECT * FROM Planning ', [],
            function (txPlanning, resultsPlanning)
            {
                if(resultsPlanning != null)
                {
                    var planning = form.createPlanning(resultsPlanning.rows.item(0));
                    requete.executeSql('SELECT * FROM PlanningDay Left Join Client using(ClientID) left join City using(CityID) ',[],
                        function(tx,results)
                        {
                            if(results != null)
                            {
                                var len = results.rows.length;
                                if (len > 0)
                                {
                                    for (var i = 0; i < len; i++)
                                    {
                                        var city = new Delegue.Mobile.City();
                                        city.CityID = results.rows.item(i).CityID;
                                        city.Name = results.rows.item(i).Name;

                                        var client = new Delegue.Mobile.Client();
                                        client.ClientID = results.rows.item(i).ClientID;
                                        client.Description = results.rows.item(i).Description;
                                        client.FirstName = results.rows.item(i).FirstName;
                                        client.LastName = results.rows.item(i).LastName;
                                        client.Address = results.rows.item(i).Address;
                                        client.CityID = results.rows.item(i).CityID;
                                        client.ZipCode = results.rows.item(i).ZipCode;
                                        client.Longitude = results.rows.item(i).Longitude;
                                        client.Latitude = results.rows.item(i).Latitude;
                                        client.City = city;

                                        var planningDay = new Delegue.Mobile.PlanningDay();
                                        planningDay.DayNumber = results.rows.item(i).DayNumber;
                                        planningDay.PlanningDayID = results.rows.item(i).PlanningDayID;
                                        planningDay.PlanningID = results.rows.item(i).PlanningID;
                                        planningDay.ClientID = results.rows.item(i).ClientID;
                                        planningDay.Client = client;

                                        var day = results.rows.item(i).DayNumber;
                                        switch (day)
                                        {
                                            case 1:
                                                planning.Lundi.push(planningDay);
                                                break;
                                            case 2:
                                                planning.Mardi.push(planningDay);
                                                break;
                                            case 3:
                                                planning.Mercredi.push(planningDay);
                                                break;
                                            case 4:
                                                planning.Jeudi.push(planningDay);
                                                break;
                                            case 5:
                                                planning.Vendredi.push(planningDay);
                                                break;
                                            case 6:
                                                planning.Samedi.push(planningDay);
                                                break;
                                            case 7:
                                                planning.Dimanche.push(planningDay);
                                                break;
                                        }
                                    }
                                }
                            }
                            callback(planning);
                        }
                    );
                }
                else
                {
                    callback(null);
                }
            }
        );

    }


}
