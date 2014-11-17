if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.ClientRequest = {};

Delegue.Mobile.ClientRequest =
{
    connexion: null,

    GetClientFromServer : function(user,callback)
    {
        var form = this;
        var methode = "GetListClientByUserID";
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
                    var clients = form.createClients(json);
                    form.InsertClients(clients,callback);
                }

            }
        );
    },

    createClients : function(json)
    {
        var ListClients = [];
        for (var i = 0; i< json.length ; i++)
        {
            var client = new Delegue.Mobile.Client();
            client.ClientID = json[i].ClientID;
            client.Description = json[i].Description;
            client.LastName = json[i].LastName;
            client.FirstName = json[i].FirstName;
            client.Address = json[i].Address;
            client.CityID = json[i].CityID;
            client.City = json[i].City;
            client.ZipCode = json[i].ZipCode;
            client.Longitude = json[i].Longitude;
            client.Latitude = json[i].Latitude;
            ListClients.push(client);
        }
        return ListClients;
    },

    InsertClients : function(clients,callback)
    {
        var form = this;
        form.connexion.transaction(
            function (tx)
            {
                form.InsertClientsCMD(tx,clients);
            },
            function (err)
            {
                callback("error");
            },
            function ()
            {
                callback(clients);
            }
        );
    },

    InsertClientsCMD : function(request,clients)
    {
        for(var i = 0;i< clients.length;i++)
        {
            request.executeSql(
                    'INSERT INTO Client (ClientID,Description,FirstName,LastName,Address,CityID,ZipCode,Longitude,Latitude,Synch)' +
                    ' VALUES('+ clients[i].ClientID + ',' +
                        '"' + clients[i].Description + '",' +
                        '"' + clients[i].FirstName + '",' +
                        '"' + clients[i].LastName + '",' +
                        '"' + clients[i].Address + '",' +
                        '"' + clients[i].CityID + '",' +
                        '"' + clients[i].ZipCode + '",' +
                        '"' + clients[i].Longitude + '",' +
                        '"' + clients[i].Latitude+ '",' +
                        '"True"' +
                    ')');
        }
    }
}