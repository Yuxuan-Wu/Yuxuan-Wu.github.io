const request = require('request')

url = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/"
parameter = "?key=24A33E86A104CEA32537C3D750F91E49&steamid=76561198327972988&format=json"

const USER_INFO = {
    playcount: undefined,
    daily_average: undefined
}

const USAGE_DETAIL = {
    game_list: [],
    games: [],
    os_time: {
        windows: 0,
        mac: 0,
        linux: 0
    },
    two_week_total: 0,
}

request(url + parameter, { json: true }, (err, res, body) => {
    if (err) { return console.log(err) }

    //parse out steam user's info
    var InfoJSON = body["response"]
    USER_INFO.playcount = InfoJSON["total_count"]
    //USER_INFO.games.push(InfoJSON["games"])

    InfoJSON["games"].forEach(function(game) {
        USAGE_DETAIL.game_list.push(game["name"])
        USAGE_DETAIL.games[game["name"]] = game
    });

    //console.log(USAGE_DETAIL.games["Apex Legends"])
    //console.log(USAGE_DETAIL.game_list)

    //initialize os_time
    USAGE_DETAIL.game_list.forEach(function(game) {
        //sum up 2 week play time to two_week_total
        USAGE_DETAIL.two_week_total += USAGE_DETAIL.games[game]["playtime_2weeks"]

        //sum up OS usage time
        USAGE_DETAIL.os_time.linux += USAGE_DETAIL.games[game]["playtime_linux_forever"]
        USAGE_DETAIL.os_time.mac += USAGE_DETAIL.games[game]["playtime_mac_forever"]
        USAGE_DETAIL.os_time.windows += USAGE_DETAIL.games[game]["playtime_windows_forever"]     
    });

    USER_INFO.daily_average = USAGE_DETAIL.two_week_total / 14

    console.log(USER_INFO.daily_average)
});