if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.BD = {};

Delegue.Mobile.BD =
{
    connexion: null,
    InsertTestElement: false,

    Initialize: function ()
    {
        this.initConnection();
        this.CreateTableTransaction();
    },

    initConnection: function () {

        this.connexion = window.openDatabase("DataBase", "1.0.0", "OpenGeophone", 90000000);
    },

    CreateTableTransaction: function () {

            var form = this;
            this.connexion.transaction(form.CreateTable, form.CreateErrorFunction, function () { form.SuccessFunction(form); });

    },

    SuccessFunction: function (form) {
        try {
            if (form.InsertTestElement == true) {
                //alert"into insertion");
                form.connexion.transaction(form.insertIntoArticle, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoGamme, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoFamille, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoProfils, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoPersonnel, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoVilles, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoPointVentes, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoCommande, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoTournees, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoTypeMissions, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoMissions, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoActivite, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoClient, form.InsertErrorFunction);
                form.connexion.transaction(form.insertIntoLigneCommande, form.InsertErrorFunction);

            }
        }
        catch (err) {
            DMS.Mobile.Notification.ShowMessage(err.message + " : SuccessFunction in CreateDB", 'alert', 'e');
        }
    },

    CreateErrorFunction: function (err) {
        alert("Error : DMS.Mobile.DB.js  --> Create table error : " + err.message)
    },

    InsertErrorFunction: function (err) {
        DMS.Mobile.Common.Alert("Error : DMS.Mobile.DB.js  --> Insertion error : " + err.message)
    },

    CreateTable: function (requete) {
        try {
            requete.executeSql("create table IF NOT EXISTS User ("
                + "UserID NVARCHAR(50) primary key ,"
                + "Login text not null ,"
                + "Password text not null,"
                + "FirstName text not null,"
                + "LastName text not null,"
                + "Email text not null);");

            requete.executeSql("create table IF NOT EXISTS Planning ("

                + "PlanningID NVARCHAR(50) primary key ,"
                + "StartDate text not null ,"
                + "EndDate text not null,"
                + "Synch boolean not null);");

            requete.executeSql("create table IF NOT EXISTS PlanningDay ("

                + "PlanningDayID NVARCHAR(50),"
                + "PlanningID NVARCHAR(50),"
                + "ClientID NVARCHAR(50),"
                + "DayNumber integer,"
                + "Synch  boolean not null);");

            requete.executeSql("create table IF NOT EXISTS Client ("
                + "ClientID NVARCHAR(50),"
                + "Description text,"
                + "FirstName text,"
                + "LastName text,"
                + "Address,"
                + "CityID,"
                + "ZipCode,"
                + "Longitude,"
                + "Latitude,"
                + "Synch  boolean not null);");

            requete.executeSql("create table IF NOT EXISTS City ("
                + "CityID NVARCHAR(50),"
                + "Name text,"
                + "Synch  boolean not null);");







        }
        catch (err) {
            alert("Exception : DMS.Mobile.DB.js  --> Create table exception : " + err.message);
        }
    },

    insertIntoArticle: function (requete) {

        try {

            //alert"insertIntoArticle");

            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1271, "Crostina lait", 0.700,0.720, "w4e5r6", 12, 1223, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1272, "Crostina Vanille", 0.230,0.250, "gzt654", 45, 1223, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1285, "Sablito Fraise", 0.870,0.900, "gzt654", 45, 1224, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1286, "Sablito Chocolat", 0.200,0.250, "gzt654", 45, 1224, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1287, "Major Banane", 0.900,1.000, "gzt654", 45, 1225, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1246, "Major Fraise", 1.080,1.120, "gzt654", 45, 1225, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1247, "Major Chocolat", 0.500,0.600, "gzt654", 45, 1225, "True")');
            requete.executeSql('INSERT INTO Article (ArticleID, Designation,PrixUnitaireHT,PrixUnitaireTTC, CAB, QteDispo, FamilleID, Synch) VALUES (1220, "Gauchou", 0.600,0.700, "gzt654", 45, 1226, "True")');


        }
        catch (err) {
            DMS.Mobile.Notification.ShowMessage(err.message + " : insertIntoArticle in CreateDB", 'alert', 'e');
        }
    },

    insertIntoFamille: function (requete) {
        //alert"insertIntoFamille"); 

        requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1223, "famille1",1231,"True")');
        requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1224, "famille2",1231,"True")');
        requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1225, "famille3",1231,"True")');
        requete.executeSql('INSERT INTO Familles (FamilleID, Designation,GammeID, Synch) VALUES (1226, "famille3",1231,"True")');


    },

    insertIntoClient: function (requete) {
        //alert"insertIntoClient "); 
        requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1234,"Salah","Carrefour","SA",4543456,6565438,"www.carrefour.com","carrefour@carrefour.com",56543,1,"false",1)');

        requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1224,"Ammar","Geant","SA",4543456,6565438,"www.geant.com","geant@geant.com",59543,1,"false",1)');

        requete.executeSql('INSERT INTO Client (ClientID,NomResponsable,NomSociete,RaisonSocial,Tel,Fax,UrlWeb,Email,ImageIDClient,EtatClient,Synch,ActiviteID) VALUES (1324,"Mourad","Magazin general","SA",4543456,6565438,"www.magazingeneral.com","magazin general@magazin general.com",59583,1,"false",1)');


    },

    insertIntoProfils: function (requete) {
        //alert"insertIntoProfils "); 
        requete.executeSql('INSERT INTO Profils (ProfilID,Designation,Description,Synch) VALUES (04,"Profil","Profil commercial","false")');


    },

    insertIntoVilles: function (requete) {
        //alert"insertIntoVille "); 
        requete.executeSql('INSERT INTO Villes(VilleID,Designation,ZoneID,Latitude,Longitude,Synch) VALUES(1,"Tunis",1,12.555,9.2548,"false")');

    },

    insertIntoActivite: function (requete) {
        //alert"insertIntoActivite"); 
        requete.executeSql('INSERT INTO Activite(ActiviteID,Designation,Synch) VALUES(1,"Grande surface","false")');

    },



    insertIntoPersonnel: function (requete) {
        //alert"insertIntoPersonnel");  

        requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1223, "user","user","Mabrouk","Massaoud",21111111,"mm@gmail.com","LA",999,"false",000)');
        requete.executeSql('INSERT INTO Personnel (PersonnelID,Login,Password,Nom,Prenom,Tel,Email,Adresse,Matricule,Synch,ProfilID) VALUES (1244, "admin1","admin2","hamma","hamma",23111111,"h2@gmail.com","NY",888,"false",000)');


    },
    insertIntoTournees: function (requete) {
        //alert"insertIntoTournee"); 

        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (1,"23/09/2013","14/02/2013","11/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (2,"24/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (3,"25/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (4,"26/09/2013","14/02/2013","11/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (5,"27/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (6,"28/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');
        requete.executeSql('INSERT INTO Tournees (TourneeID,DateDebut,DateFin,DateCreation,EtatTournee,Synch,TerminalID,ImprimanteID,EquipementID,VehiculeID,PersonnelID) VALUES (7,"29/09/2013","19/02/2013","18/02/2013",1,"false",1,1,1,1,1223)');


    },

    insertIntoMissions: function (requete) {
        //alert"insertIntoMission"); 

        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (11,0,"12/03/2013",1,"13/02/2013","Commantaires",2,"false",1223,235,1)');

        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (12,0,"12/03/2013",0,"13/02/2013","Commantaires",2,"false",1223,235,1)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (13,0,"12/03/2013",2,"13/02/2013","Commantaires",2,"false",1223,235,1)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (21,0,"13/03/2013",1,"14/02/2013","Commantaires",3,"false",1223,235,2)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (31,0,"14/03/2013",1,"15/02/2013","Commantaires",4,"false",1223,235,3)');

        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (41,0,"10/03/2013",1,"11/02/2013","Commantaires",5,"false",1223,236,4)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (51,0,"13/05/2013",1,"14/05/2013","Commantaires",6,"false",1223,236,5)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (61,0,"14/03/2013",1,"15/03/2013","Commantaires",7,"false",1223,236,6)');
        requete.executeSql('INSERT INTO Missions(MissionID,EtatMission,DateCreation,DegreUrgence,DateCloture,Commentaires,TypeMissionID,Synch,BCKPersonnelID,PointVenteID,TourneeID) VALUES (71,0,"14/03/2013",1,"15/03/2013","Commantaires",9,"false",1223,236,7)');

    },

    insertIntoTypeMissions: function (requete) {
        //alert"insertIntoTypeMission"); 


        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (1,"Facing")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (2,"Commande")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (3,"EspacePromo")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (4,"Livraison")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (5,"ParametragePV")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (6,"Recouvrement")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (7,"ReleveInventaire")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (8,"RelevePresencePrixConc")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (9,"RelevePrix")');
        requete.executeSql('INSERT INTO TypeMissions(TypeMissionID,Titre) VALUES (10,"ReleveVenteConcu")');

    },

    insertIntoGamme: function (requete) {
        //alert"insertIntoGamme"); 
        requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1231, "gamme1","True")');
        requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1232, "gamme2","True")');
        requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1233, "gamme3","True")');
        requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1234, "gamme4","True")');
        requete.executeSql('INSERT INTO Gammes (GammeID, Designation, Synch) VALUES (1235, "gamme5","True")');


    },


    insertIntoPointVentes: function (requete) {
        //alert"insertIntoPointVente"); 

        requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (235,"12.345","9.345",1,"Faouzi Ben Gamra","Boston",71456989,71244568,"faouzi@gmail.com","false",1,1234)');

        requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (236,"12.345","9.345",1,"ben Salah","Chicago",71456789,71234568,"BenSalah@gmail.com","false",1,1224)');

        requete.executeSql('INSERT INTO PointVentes (PointVenteID,Latitude,Longitude,EtatPointVente,Responsable,Adresse,Tel,Fax,Email,Synch,VilleID,ClientID) VALUES (237,"12.345","9.345",1,"ben Salah","Michigan",71456789,71234568,"BenSalah@gmail.com","false",1,1224)');

    },

    insertIntoCommande: function (requete) {
        //alert"insertIntoCommande"); 
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (1,1111,"12/02/2012","14/02/2012",0,10.500,11.200,0.504,"false",1223,235)');
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (2,2222,"12/02/2012","14/02/2012",1,10.500,11.200,1.504,"true",1223,235)');
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (3,3333,"12/02/2012","14/02/2012",2,10.500,11.200,2.504,"false",1223,235)');
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (4,4444,"12/02/2012","14/02/2012",3,10.500,11.200,3.504,,"true",1223,235)');
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (5,5555,"12/02/2012","14/02/2012",4,10.500,11.200,4.504,"false",1223,235)');
        requete.executeSql('INSERT INTO Commandes (CommandeID,CAB,DateCreation,DateLivraisonPrevue,EtatCommande,PrixTotalTTC,PrixTotalHT,TotalTVA,Synch,CommercialID,PointVenteID) VALUES (6,6666,"12/02/2012","14/02/2012",5,10.500,11.200,5.504,"false",1223,235)');

    },

    insertIntoLigneCommande: function (requete) {
        //alert"insertIntoLigneCommande"); 
        requete.executeSql('INSERT INTO LigneCommande (LigneCommandeID,Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES (1,15,20.500,20.000,"false",1,1271)');
        requete.executeSql('INSERT INTO LigneCommande (LigneCommandeID,Quantite,PrixTotalArticleTTC,PrixTotalArticleHT,Synch,CommandeID,ArticleID) VALUES (2,100,50.500,42.000,"false",1,1272)');

    }


}