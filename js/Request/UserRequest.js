if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.UserRequest = {};

Delegue.Mobile.UserRequest =
{

    connexion: null,

    GetUserFromServer : function (login,password,callback)
    {
        var form = this;
        var methode = "GetUserByLogin";
        var data = login + "/" +  password;
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
                    var user = form.createUser(json);
                    callback(user);
                }

            }
        );
    },

    createUser : function(json)
    {
        var user = new  Delegue.Mobile.User();
        user.Email = json.Email;
        user.FirstName = json.FirstName;
        user.UserID = json.UserID;
        user.LastName = json.LastName;
        user.Login = json.Login;
        user.Password = json.Password;
        return user;
    },

    InsertUser : function(user,callback)
    {
        var form = this;
        form.connexion.transaction(
            function (tx)
            {
                form.InsertUserCMD(tx,user);
            },
            function (err)
            {
                callback("error");
            },
            function ()
            {
                callback(true);
            }
        );
    },

    InsertUserCMD : function(request,user)
    {
        request.executeSql('INSERT INTO User (UserID,Login,Password,FirstName,LastName,Email) VALUES('
            + user.UserID + ',"' + user.Login + '","' + user.Password + '","' + user.FirstName + '","' + user.LastName + '","' + user.Email + '")');
    }
}