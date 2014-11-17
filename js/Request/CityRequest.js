if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.CityRequest = {};

Delegue.Mobile.CityRequest =
{
    connexion: null,

    GetCityFromServer : function(user,callback)
    {
        var form = this;
        var methode = "GetListCityByUserID";
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
                    var cities = form.createCities(json);
                    form.InsertCities(cities,callback);
                }

            }
        );
    },

    createCities : function(json)
    {
        var ListCities = [];
        for (var i = 0; i< json.length ; i++)
        {
            var city = new Delegue.Mobile.City();
            city.CityID = json[i].CityID;
            city.Name = json[i].Name;
            ListCities.push(city);
        }
        return ListCities;
    },

    InsertCities : function(cities,callback)
    {
        var form = this;
        form.connexion.transaction(
            function (tx)
            {
                form.InsertCitiesCMD(tx,cities);
            },
            function (err)
            {
                callback("error");
            },
            function ()
            {
                callback(cities);
            }
        );
    },

    InsertCitiesCMD : function(request,cities)
    {
        for(var i = 0;i< cities.length;i++)
        {
            request.executeSql(
                    'INSERT INTO City (CityID,Name,Synch)' +
                    ' VALUES('+ cities[i].CityID + ',' +
                    '"' + cities[i].Name + '",' +
                    '"True"' +
                    ')');
        }
    }
}