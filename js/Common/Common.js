if (typeof (Delegue) == 'undefined') Delegue = {};
if (typeof (Delegue.Mobile) == 'undefined') Delegue.Mobile = {};



Delegue.Mobile.Common = {};

Delegue.Mobile.Common =
{
    ServerURL : "http://192.168.1.250/DelegueWebService/DelegueService.svc",

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
				alert(data);
                callback(data);

            },
            error: function (err,ajaxOptions, thrownError)
            {
				alert("error");
                callback("error");
            }
        });
    }
}