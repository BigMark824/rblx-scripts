﻿//$.ajaxSetup({ cache: false });

RobloxLaunch = new Object();

RobloxLaunch._LaunchGamePage = null;
RobloxLaunch._Timer = null;
RobloxLaunch._ClientMetricType = null;
RobloxLaunch._Launcher = null;

var RobloxPlaceLauncherService =
{
    LogJoinClick: function()
    {
        $.get("/Game/Placelauncher.ashx",
            { request: "LogJoinClick" }
        );
    },
    RequestGame: function(placeId, isPartyLeader, onGameSuccess, onGameError, context)
    {
        $.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGame", placeId: placeId, isPartyLeader: isPartyLeader },
            function(data)
            {
                if (data.Error)
                {
                    onGameError(data.Error, context);
                }

                else
                {
                    onGameSuccess(data, context);
                }
            }
        );
    },
    RequestPlayWithParty: function(onGameSuccess, onGameError, context)
	{
		$.getJSON("/Game/PlaceLauncher.ashx",
			{ request: "RequestPlayWithParty" },
			function(data)
			{
				if (data.Error)
				{
					onError(data.Error, context);
				}
				else
				{
					onSuccess(data, context);
				}
			}
		);
	
	},
    RequestGroupBuildGame: function(placeId, onGameSuccess, onGameError, context)
    {
        $.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGroupBuildGame", placeId: placeId },
            function(data)
            {
                if (data.Error)
                {
                    onGameError(data.Error, context);
                }
                else
                {
                    onGameSuccess(data, context);
                }
            }
        );
    },
    RequestFollowUser: function(userId, onGameSuccess, onGameError, context)
    {
        $.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestFollowUser", userId: userId },
            function(data)
            {
                if (data.Error)
                {
                    onGameError(data.Error, context);
                }
                else
                {
                    onGameSuccess(data, context);
                }
            }
        );
    },
    RequestGameJob: function(placeId, gameId, gameJobId, onGameSuccess, onGameError, context)
    {
        $.getJSON("/Game/PlaceLauncher.ashx",
            { request: "RequestGameJob", placeId: placeId, gameId: gameId, gameJobId: gameJobId },
            function(data)
            {
                if (data.Error)
                {
                    onGameError(data.Error, context);
                }
                else
                {
                    onGameSuccess(data, context);
                }
            }
        );
    },
    CheckGameJobStatus: function(jobId, onSuccess, onError, context)
    {
        $.getJSON("/Game/PlaceLauncher.ashx",
            { request: "CheckGameJobStatus", jobId: jobId },
            function(data)
            {
                if (data.Error)
                {
                    onError(data.Error, context);
                }
                else
                {
                    onSuccess(data, context);
                }
            }
        );
    }
}

RobloxLaunch.RequestPlayWithParty = function(behaviorID, placeId, partyGuid, gameId) {
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch._Timer = new Date();
    RobloxLaunch._ClientMetricType = "WebPlay";
    if (checkRobloxInstall()) {
        if (RobloxLaunch._Launcher == null) {
            RobloxLaunch._Launcher = new RBX.PlaceLauncher(behaviorID);
        }

        RobloxLaunch._Launcher.RequestPlayWithParty(placeId, partyGuid, gameId);
    }
}

RobloxLaunch.RequestGame = function(behaviorID, placeID)
{
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch._Timer = new Date();
    RobloxLaunch._ClientMetricType = "WebPlay";
    if (checkRobloxInstall())
    {
        if (RobloxLaunch._Launcher == null)
        {
            RobloxLaunch._Launcher = new RBX.PlaceLauncher(behaviorID);
        }

        RobloxLaunch._Launcher.RequestGame(placeID);
    }
}
RobloxLaunch.RequestGroupBuildGame = function(behaviorID, placeID)
{
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch._Timer = new Date();
    RobloxLaunch._ClientMetricType = "WebPlay";

    if (checkRobloxInstall())
    {
        if (RobloxLaunch._Launcher == null)
        {
            RobloxLaunch._Launcher = new RBX.PlaceLauncher(behaviorID);
        }
        RobloxLaunch._Launcher.RequestGroupBuildGame(placeID);
    }
}

RobloxLaunch.RequestGameJob = function(behaviorID, placeId, gameId, gameJobId) 
{
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch._Timer = new Date();
    RobloxLaunch._ClientMetricType = "WebJoin";
    if (checkRobloxInstall()) {
        if (RobloxLaunch._Launcher == null) {
            RobloxLaunch._Launcher = new RBX.PlaceLauncher(behaviorID);
        }
        RobloxLaunch._Launcher.RequestGameJob(placeId, gameId, gameJobId);
    }
}

RobloxLaunch.RequestFollowUser = function(behaviorID, userId) 
{
    RobloxPlaceLauncherService.LogJoinClick();
    RobloxLaunch._Timer = new Date();
    RobloxLaunch._ClientMetricType = "WebFollow";
    if (checkRobloxInstall()) {
        if (RobloxLaunch._Launcher == null) {
            RobloxLaunch._Launcher = new RBX.PlaceLauncher(behaviorID);
        }
        RobloxLaunch._Launcher.RequestFollowUser(userId);
    }
}

RobloxLaunch.StartGame = function(visitUrl, type, authenticationUrl, authenticationTicket) {
    urchinTracker("Visit/Try/" + type);

    var prefix = null;
    try {
        prefix = "RobloxProxy/";
        var launcher = Roblox.Client.CreateLauncher();

        if (!launcher)
        {
            // Check to see if we're in Roblox Player (Property only defined in Roblox Player)
            try
            {
                parent.playFromUrl(visitUrl);
                return;
                // window.external.IsFullscreen;

            }
            catch (ex)
            {

            }

            if (window.external) 
            {
                try 
                {
                    // Must be in the roblox app
                    window.external.StartGame(authenticationTicket, authenticationUrl, visitUrl);
                }

                catch (ex) 
                {
                    throw "window.external fallback failed, Roblox must not be installed or IE cannot access ActiveX";
                }
            }

            else 
            {
                throw "launcher is null or undefined and external is missing";
            }
        }
        else {
            //launcher is non-null
            prefix = "RobloxProxy/StartGame/";
            try {
                try {
                    launcher.AuthenticationTicket = authenticationTicket;
                }
                catch (err) {
                    // This is an older version of the Launcher. Ignore the error
                }
                launcher.StartGame(authenticationUrl, visitUrl);
            }
            catch (err) {
                Roblox.Client.ReleaseLauncher(launcher);
                throw err;
            }
            Roblox.Client.ReleaseLauncher(launcher);
        }
    }
    catch (err) {
        var message = err.message;

        if (message == "User cancelled") {
            urchinTracker("Visit/UserCancelled/" + type);
            return false;
        }
        try {
            var y = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (err3) {
            message = "FailedXMLHTTP/" + message;
        }

        if (!Roblox.Client.isRobloxBrowser()) {
            urchinTracker("Visit/Redirect/" + prefix + encodeURIComponent(message));
            window.location = RobloxLaunch._LaunchGamePage;
        }
        else
            urchinTracker("Visit/Fail/" + prefix + encodeURIComponent(message));

        return false;
    }

    urchinTracker("Visit/Success/" + type);
    return true;
}

RobloxLaunch.CheckRobloxInstall = function(installPath) 
{
    if (!Roblox.Client.IsRobloxInstalled()) 
    {
        window.location = installPath;
    }
    else 
    {
        Roblox.Client.Update();
        return true;
    }
}


var RBX = new Object();

RBX.PlaceLauncher = function(modalDialogueID) 
{
    this._cancelled = false;
    this._popup = $('#' + modalDialogueID);
}

RBX.PlaceLauncher.prototype =
{

    // TODO: This should only be called once.  What if you call it again???
    RequestGame: function(placeId)
    {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function(result, context) { context._onGameStatus(result); };
        var onGameError = function(result, context) { context._onGameError(result); };
        var self = this;
        var isPartyLeader = false;

        if (typeof Party != 'undefined' && typeof Party.AmILeader == 'function')
        {
            isPartyLeader = Party.AmILeader();
        }
        
        var gameDelegate = function() { RobloxPlaceLauncherService.RequestGame(placeId, isPartyLeader, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestPlayWithParty: function(placeID, partyGuid, gameId)
    {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function(result, context) { context._onGameStatus(result); };
        var onGameError = function(result, context) { context._onGameError(result); };
        var self = this;

        var gameDelegate = function() { RobloxPlaceLauncherService.RequestPlayWithParty(placeID, partyGuid, gameId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestGroupBuildGame: function(placeId)
    {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function(result, context) { context._onGameStatus(result, true); };
        var onGameError = function(result, context) { context._onGameError(result); };
        var self = this;
        var gameDelegate = function() { RobloxPlaceLauncherService.RequestGroupBuildGame(placeId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },
    // TODO: This should only be called once.  What if you call it again???
    RequestFollowUser: function(userId)
    {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function(result, context) { context._onGameStatus(result); };
        var onGameError = function(result, context) { context._onError(result); };
        var self = this;
        var gameDelegate = function() { RobloxPlaceLauncherService.RequestFollowUser(userId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },

    // TODO: This should only be called once.  What if you call it again???
    RequestGameJob: function(placeId, gameId, gameJobId)
    {
        this._showDialog();

        // Now send a request to the Grid...
        var onGameSuccess = function(result, context) { context._onGameStatus(result); };
        var onGameError = function(result, context) { context._onGameError(result); };
        var self = this;
        var gameDelegate = function() { RobloxPlaceLauncherService.RequestGameJob(placeId, gameId, gameJobId, onGameSuccess, onGameError, self); };

        this._startUpdatePolling(gameDelegate);

        return false;
    },

    CancelLaunch: function()
    {
        this._cancelled = true;
        $.modal.close();
        return false;
    },

    _reportDuration: function(duration, result)
    {
        $.ajax({
            type: "GET",
            async: true,
            cache: false,
            timeout: 50000,
            url: "/Game/JoinRate.ashx?c=" + RobloxLaunch._ClientMetricType + "&r=" + result + "&d=" + duration,
            success: function(data)
            {

            }
        });
    },

    _onGameStatus: function(result)
    {
        if (this._cancelled)
        {
            //report length of time between click of join and cancelling joining a game.
            var c_duration = new Date().getTime() - RobloxLaunch._Timer.getTime();
            this._reportDuration(c_duration, "Cancel");
            return;
        }

        this._updateStatus(result.status);

        if (result.status == 2)
        {
            RobloxLaunch.StartGame(result.joinScriptUrl, "Join", result.authenticationUrl, result.authenticationTicket);
            $.modal.close();

            //report length of time between click of join and successfully joining a game.
            var s_duration = new Date().getTime() - RobloxLaunch._Timer.getTime();
            this._reportDuration(s_duration, "Success");

        }
        else if (result.status < 2 || result.status == 6)
        {
            // Try again
            var onSuccess = function(result, context) { context._onGameStatus(result); };
            var onError = function(result, context) { context._onGameError(result); };
            var self = this;
            var call = function()
            {
                RobloxPlaceLauncherService.CheckGameJobStatus(result.jobId, onSuccess, onError, self);
            };
            window.setTimeout(call, 2000);
        } else if (result.status == 4)
        { //error 
            //report length of time between click of join and failed joining a game.
            var f_duration = new Date().getTime() - RobloxLaunch._Timer.getTime();
            this._reportDuration(f_duration, "Failure");

        }
    },

    _updateStatus: function(status)
    {
        $(this._popup).find('#Starting').css("display", 'none');
        $(this._popup).find('#Spinner').css("display", ((status < 3 || status == 7 || status == 8 || status == 6) ? 'block' : 'none'));
        $(this._popup).find('#Waiting').css("display", (status == 0 ? 'inline' : 'none'));
        $(this._popup).find('#Loading').css("display", (status == 1 ? 'inline' : 'none'));
        $(this._popup).find('#Joining').css("display", (status == 2 ? 'inline' : 'none'));
        $(this._popup).find('#Expired').css("display", (status == 3 ? 'inline' : 'none'));
        $(this._popup).find('#Error').css("display", (status == 4 ? 'inline' : 'none'));
        $(this._popup).find('#GameEnded').css("display", (status == 5 ? 'inline' : 'none'));
        $(this._popup).find('#GameFull').css("display", (status == 6 ? 'inline' : 'none'));
        $(this._popup).find('#Updating').css("display", (status == 7 ? 'inline' : 'none'));
        $(this._popup).find('#Updated').css("display", (status == 8 ? 'inline' : 'none'));
    },

    _onGameError: function(result)
    {
        this._updateStatus(4);
    },

    _startUpdatePolling: function(joinGameDelegate)
    {
        try
        {
            var launcher = Roblox.Client.CreateLauncher();
            var result = launcher.IsUpToDate;

            if (result || result == undefined)
            {
                //                try {
                //                    launcher.PreStartGame();
                //                }
                //                catch (e)
                //                { }

                joinGameDelegate();
                return;
            }

            //Now we need to poll until it is finished
            var onSuccess = function(result, launcher, context) { context._onUpdateStatus(result, launcher, joinGameDelegate); };
            var onError = function(result, context) { context._onUpdateError(result); };
            var self = this;

            this.CheckUpdateStatus(onSuccess, onError, launcher, joinGameDelegate, self);
        }
        catch (e)
        {
            //alert("Missing IsUpToDate, falling back");
            Roblox.Client.ReleaseLauncher(launcher);
            //Something went wrong, fall back to the old method of Update + Join in parallel
            joinGameDelegate();
        }
    },

    CheckUpdateStatus: function(onSuccess, onError, launcher, joinGameDelegate, self)
    {
        try
        {
            launcher.PreStartGame();

            var result = launcher.IsUpToDate;
            if (result || result == undefined)
            {
                onSuccess(8, launcher, self);
            }
            else
            {
                onSuccess(7, launcher, self);
            }
        }
        catch (e)
        {
            //We have the old DLL loaded, so just pretend it was succesful like in the olden days
            onSuccess(8, launcher, self);
        }
    },


    _onUpdateStatus: function(result, launcher, joinGameDelegate)
    {
        if (this._cancelled)
            return;

        this._updateStatus(result);

        if (result == 8)
        {
            Roblox.Client.ReleaseLauncher(launcher);
            joinGameDelegate();
        }
        else if (result == 7)
        {
            // Try again
            var onSuccess = function(result, launcher, context) { context._onUpdateStatus(result, launcher, joinGameDelegate); };
            var onError = function(result, context) { context._onUpdateError(result); };
            var self = this;
            var call = function() { self.CheckUpdateStatus(onSuccess, onError, launcher, joinGameDelegate, self); };
            window.setTimeout(call, 2000);
        }
        else
        {
            alert("Unknown status from CheckUpdateStatus");
        }
    },

    _onUpdateError: function(result)
    {
        this._updateStatus(2);
    },

    _showDialog: function()
    {
        this._cancelled = false;
        // http://www.ericmmartin.com/projects/simplemodal/
        $(this._popup).modal({ escClose: true,
            opacity: 80,
            overlayCss: { backgroundColor: "#000" }
        });

        // bind our cancel button
        var RBXPlaceLauncher = this;
        $('.CancelPlaceLauncherButton').click(function() { RBXPlaceLauncher.CancelLaunch(); });
    },

    dispose: function()
    {
        RBX.PlaceLauncher.callBaseMethod(this, 'dispose');
    }
}

