if (!window.EnvatoServices) {
    window.EnvatoServices = {};
}

window.EnvatoServices.Referral = new function() {

    this.api_version = "edge/"; 
    this.api_url     = "http://marketplace.envato.com/api/";
    this.callbacks   = [];
    this.referralId  = ""; 
    this.columnCount = 4;
    
    /* initiates the download of popular items
     */
    this.getPopularFiles = function (placeHolder, marketplace) {
        var request = this.prepareRequest("popular:", marketplace, placeHolder);
        this.execute(request);
    }
    
    /* initiates the download of recently added items to spcific category
     */
    this.getRecentFilesFromCategory = function (placeHolder, marketplace, category) {
        var request = this.prepareRequest("new-files:", marketplace + "," + category, placeHolder);
        this.execute(request);
    }
    
    /* initiates the download of recently added items by spcific author
     */
    this.getRecentFilesFromAuthor = function (placeHolder, marketplace, author) {
        var request = this.prepareRequest("new-files-from-user:", author + "," + marketplace, placeHolder);
        this.execute(request);
    } 

    /* creates a request object to identify the response when it arrives
     */
    this.prepareRequest = function(methodName, methodParams, placeHolder) {

        var request = {
            url         : this.api_url + this.api_version + methodName + methodParams + ".js",
            method      : methodName,
            placeHolder : placeHolder,
            params      : methodParams,
            script      : null,
            id          : null
        };    

        var callback = function(json) {
            window.EnvatoServices.Referral.handleResponse(request, json);
        }; 

        return {
            requestObject : request, 
            callbackFunction : callback
        };
    }

    /* this method decides if the request should go ahead.
     */
    this.execute = function(request) {
        var callbackId = this.callbacks.length;
        
        request.requestObject.id = callbackId;
        this.callbacks[callbackId] = request.callbackFunction;
        
        this.injectScript(request.requestObject);
    }
    
    /* implements cross deomain scripting.
     */
    this.injectScript = function(request) {

        with (request) {
            script       = document.createElement("script");
            script.type  = "text/javascript";
            script.src   = url + "?callback=window.EnvatoServices.Referral.callbacks[" + id + "]";
            script.defer = "defer";
            script.id    = id;
        }    
        
        head = document.getElementsByTagName("head")[0];
        head.appendChild(request.script);
    }

    /* event listener for when a request is complete.
     */
    this.handleResponse = function(request, json) {

        var data = null;
        
        switch (request.method) {
            case "popular:" :
               data = json["popular"]["items_last_three_months"];
               break;   

            case "new-files:" :
               data = json["new-files"];  
               break;   

            case "new-files-from-user:" :
               data = json["new-files-from-user"];       
               break;   
        }
        
        if (data)
            this.render(data, request.placeHolder);

        request.script.parentNode.removeChild(request.script);
        this.callbacks[request.id] = null;
    }
    
    /* renders the html of the result.
     */
    this.render = function(dataArray, placeHolderId) {

        if (!dataArray || dataArray.length == 0)
            return;

        var placeHolder = document.getElementById(placeHolderId);
        if (!placeHolder) 
            return;
            
        var printed = 0;
        while(printed < dataArray.length) {

            var row = document.createElement("div");
            row.className = "envato_row";
            placeHolder.appendChild(row);

            for (var i = 0; i < this.columnCount && printed < dataArray.length; i++) {
                var entry = this.renderEntry(dataArray[printed]);            

                if (i == this.columnCount - 1)
                    entry.className += " envato_item_noborder";

                row.appendChild(entry);
                printed++;    
            }
        }
    }
    
    /* renders the html of a single item.
     */
    this.renderEntry = function(item) {
        var result = document.createElement("div");
        var rating = "envato_rating" + item["rating"];
        var url    = item["url"] + "?ref=" + this.referralId;

        var html = ""; 
        html += "<a title=\"" + item["item"] + "\" target=\"_blank\" href=\"" + url + "\"><img src=\"" + item["thumbnail"] + "\" alt=\"" + item["item"] + "\" class=\"envato_thumb\" /></a>";
        html += "<p><a href=\"" + url + "\" target=\"_blank\">" + item["item"] + "</a></p>";
        html += "<p class=\"envato_separator\"></p>";
        html += "<div class=\"envato_details\">";
        html += "<div class=\"envato_sales\">" + item["sales"] + " Purchases<div class=\"envato_rating " + rating + "\"></div></div>";
        html += "<div class=\"envato_cost\">$" + item["cost"] + "</div></div";

        result.innerHTML = html;
        result.className = "envato_item";
        
        return result;
    }
}