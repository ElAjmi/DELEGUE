if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.Common = {};

Delegue.Mobile.Common =
{
    ServerURL : "http://localhost/DelegueWebService/DelegueService.svc",

    CallService : function(url,callback)
    {
        var form = this;

        $.ajax({
            url: url,
            type : "GET",
            contentType: "application/javascript",
            dataType: "jsonp",
            async : false,
            success: function (data)
            {

                callback(data);

            },
            error: function (err,ajaxOptions, thrownError)
            {
                callback("error");
            }
        });
    }
}