if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.PlanningViewModel = {};

Delegue.Mobile.PlanningViewModel =
{
    $HeaderTitle : null,
    $LundiContent : null,
    $MardiContent : null,
    $MercrediContent : null,
    $JeudiContent : null,
    $VendrediContent : null,
    $SamediContent : null,
    $DimancheContent : null,

    connexion : null,

    Init : function ()
    {
        var form = this;
        Delegue.Mobile.BD.initConnection();
        form.connexion = Delegue.Mobile.BD.connexion;
        form.adapteHTML();
        form.InitializePlanningHtml(
            function()
            {

                form.InitializeEvents();
            }
        );
    },

    adapteHTML : function()
    {

        $("#ListDay").removeClass("ui-grid-a").addClass("ui-grid-d");
        $("#ListDay li").each(function(index, element) {
            switch(index)
            {
                case 0:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-a").css("width","16.5%");
                    break;
                case 1:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-b").css("width","16.5%");
                    break;
                case 2:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-c").css("width","16.5%");
                    break;
                case 3:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-d").css("width","16.5%");
                    break;
                case 4:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-e").css("width","16.5%");
                    break;
                case 5:
                    $(element).removeClass("ui-block-a").removeClass("ui-block-b").addClass("ui-block-e").css("width","16.5%");
                    break;
            }
        });
    },

    InitializePlanningHtml : function(callback)
    {
        var form = this;
        Delegue.Mobile.PlanningRequest.connexion = form.connexion;
        Delegue.Mobile.PlanningRequest.GetPlanning(
            function(planning)
            {
                form.$HeaderTitle.text("Semaine du " + planning.StartDate + " au " + planning.EndDate);
                for (var i = 0 ;i<planning.Lundi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Lundi[i].Client.FirstName + ' ' + planning.Lundi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                        html += '           <div class="ui-block-a">';
                        html +=                 '<p><strong>Adresse : </strong>' + planning.Lundi[i].Client.Address + '</p>';
                        html += '           </div>';
                        html += '           <div class="ui-block-b">';
                        html +=                 '<p><strong>Code postal : </strong>' + planning.Lundi[i].Client.ZipCode + '</p>';
                        html += '           </div>';
                        html += '           <div class="ui-block-c">';
                        html +=                 '<p><strong>Ville : </strong>' + planning.Lundi[i].Client.City.Name + '</p>';
                        html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Lundi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button planningDayID ="'+planning.Lundi[i].PlanningDayID+'"  class="btDetails ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Details</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';

                    form.$LundiContent.append(html);
                }

                for (var i = 0 ;i<planning.Mardi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Mardi[i].Client.FirstName + ' ' + planning.Mardi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                    html += '           <div class="ui-block-a">';
                    html +=                 '<p><strong>Adresse : </strong>' + planning.Mardi[i].Client.Address + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-b">';
                    html +=                 '<p><strong>Code postal : </strong>' + planning.Mardi[i].Client.ZipCode + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-c">';
                    html +=                 '<p><strong>Ville : </strong>' + planning.Mardi[i].Client.City.Name + '</p>';
                    html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Mardi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button class="btannuler ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Arreter</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';
                    form.$MardiContent.append(html);
                }

                for (var i = 0 ;i<planning.Mercredi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Mercredi[i].Client.FirstName + ' ' + planning.Mercredi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                    html += '           <div class="ui-block-a">';
                    html +=                 '<p><strong>Adresse : </strong>' + planning.Mercredi[i].Client.Address + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-b">';
                    html +=                 '<p><strong>Code postal : </strong>' + planning.Mercredi[i].Client.ZipCode + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-c">';
                    html +=                 '<p><strong>Ville : </strong>' + planning.Mercredi[i].Client.City.Name + '</p>';
                    html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Mercredi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button class="btannuler ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Arreter</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';

                    form.$MercrediContent.append(html);
                }

                for (var i = 0 ;i<planning.Jeudi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Jeudi[i].Client.FirstName + ' ' + planning.Jeudi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                    html += '           <div class="ui-block-a">';
                    html +=                 '<p><strong>Adresse : </strong>' + planning.Jeudi[i].Client.Address + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-b">';
                    html +=                 '<p><strong>Code postal : </strong>' + planning.Jeudi[i].Client.ZipCode + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-c">';
                    html +=                 '<p><strong>Ville : </strong>' + planning.Jeudi[i].Client.City.Name + '</p>';
                    html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Jeudi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button class="btannuler ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Arreter</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';

                    form.$JeudiContent.append(html);
                }

                for (var i = 0 ;i<planning.Vendredi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Vendredi[i].Client.FirstName + ' ' + planning.Vendredi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                    html += '           <div class="ui-block-a">';
                    html +=                 '<p><strong>Adresse : </strong>' + planning.Vendredi[i].Client.Address + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-b">';
                    html +=                 '<p><strong>Code postal : </strong>' + planning.Vendredi[i].Client.ZipCode + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-c">';
                    html +=                 '<p><strong>Ville : </strong>' + planning.Vendredi[i].Client.City.Name + '</p>';
                    html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Vendredi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button class="btannuler ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Arreter</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';
                    form.$VendrediContent.append(html);
                }

                for (var i = 0 ;i<planning.Samedi.length;i++)
                {
                    var html ='<fieldset class="ui-body-a">';
                    html += '       <legend style="background-color: white;border-radius: 5px 5px;padding: 4px;"><strong>'+planning.Samedi[i].Client.FirstName + ' ' + planning.Samedi[i].Client.LastName +'</strong></legend>';
                    html += '           <div class="ui-grid-b">';
                    html += '           <div class="ui-block-a">';
                    html +=                 '<p><strong>Adresse : </strong>' + planning.Samedi[i].Client.Address + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-b">';
                    html +=                 '<p><strong>Code postal : </strong>' + planning.Samedi[i].Client.ZipCode + '</p>';
                    html += '           </div>';
                    html += '           <div class="ui-block-c">';
                    html +=                 '<p><strong>Ville : </strong>' + planning.Samedi[i].Client.City.Name + '</p>';
                    html += '           </div>';
                    html += '           </div>';
                    html += '           <p>';
                    html +=                 planning.Samedi[i].Client.Description;
                    html += '           </p>';
                    html += '  </fieldset>';
                    html += '  <div>';

                    html += '       <button class="btcommencer ui-btn ui-mini ui-icon-check ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Commencer</button>';
                    html += '       <button class="btannuler ui-btn ui-mini ui-icon-delete ui-btn-icon-left" style="width: 22%;float: right;margin: 0px;padding: 2px;">Arreter</button>';

                    html += '  </div>';
                    html += '  <div style="clear:both"></div>';

                    form.$SamediContent.append(html);
                }

                callback();
            }
        );
    },

    InitializeEvents : function()
    {
        $(".btcommencer").click(
            function()
            {
                alert("click commencer");
            }
        );
        $(".btDetails").click(
            function()
            {
                var planningDayID = $(this).attr("planningDayID");
                $.mobile.changePage("DetailsPlanningDay.html");

            }
        );
    }
}