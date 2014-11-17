if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.LoginViewModel = {};

Delegue.Mobile.LoginViewModel =
{
    $inputlogin : null,
    $inputpassword : null,
    $inputconnexion : null,
    $inputcancel : null,

    connexion : null,

    Init : function()
    {
        var form = this;
        Delegue.Mobile.BD.initConnection();
        form.connexion = Delegue.Mobile.BD.connexion;
        form.InitializeEvents();
    },

    InitializeEvents : function()
    {
        var form = this;
        form.$inputconnexion.click(function(){

			alert("click");
           var userConnected = false;
           //TODO verifier si l'utilisateur est déja Connectée

            if (userConnected)
            {
                $.mobile.changePage("Planning.html");
            }
            else
            {
                form.VerifyAndConnectUser();
            }

        });
    },

    VerifyAndConnectUser : function()
    {
        var form = this;
        var login = form.$inputlogin.val().trim();
        var password = form.$inputpassword.val().trim();
        var errorMessage = "";

        if(login == "" || login == null || password == "" || password == null)
        {
            errorMessage = Delegue.Mobile.Constant.EmptyField;
            alert(errorMessage);
        }
        else
        {
            Delegue.Mobile.UserRequest.connexion = form.connexion;
            Delegue.Mobile.UserRequest.GetUserFromServer(login,password,
                function(user)
                {
                    if(user == "error")
                    {
                        alert("error");
                    }
                    else if(user != null)
                    {
                        form.ConnectUser(user);
                    }
                    else
                    {
                        errorMessage = Delegue.Mobile.Constant.InvalidUser;
                        alert(errorMessage);
                    }
                }
            );
        }
    },

    ConnectUser : function(user)
    {
        //TODO ajouter l'utilisateur dans la base de données et recupérer toutes les informations qui lui Correspondent
        var form = this;
        Delegue.Mobile.CityRequest.connexion = form.connexion;
        Delegue.Mobile.CityRequest.GetCityFromServer(user,
            function(citiesReturned)
            {
                if (citiesReturned != "error")
                {
                    Delegue.Mobile.ClientRequest.connexion = form.connexion;
                    Delegue.Mobile.ClientRequest.GetClientFromServer(user,
                        function(clientsReturned)
                        {
                            if (clientsReturned != "error")
                            {
                                Delegue.Mobile.PlanningRequest.connexion = form.connexion;
                                Delegue.Mobile.PlanningRequest.GetPlanningFromServer(user,
                                    function(plannigReturned)
                                    {
                                        if (plannigReturned != "error")
                                        {
                                            Delegue.Mobile.UserRequest.connexion = form.connexion;
                                            Delegue.Mobile.UserRequest.InsertUser(user,
                                                function(data)
                                                {
                                                    if(data == "error")
                                                    {

                                                    }
                                                    else
                                                    {
                                                        $.mobile.changePage("Planning.html");
                                                    }
                                                }
                                            );
                                        }
                                        else
                                        {
                                            alert("Erreur lors de la recuperation/enregistrement du planning");
                                        }
                                    }
                                );
                            }
                            else
                            {
                                alert("Erreur lors de la recuperation/enregistrement des Clients");
                            }
                        }
                    );
                }
                else
                {
                    alert("Erreur lors de la recuperation/enregistrement des ville");
                }
            }
        );



    }


}