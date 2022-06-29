const request = require('request')

url = "http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/"
parameter = "?key=24A33E86A104CEA32537C3D750F91E49&steamid=76561198327972988&format=json"

const USER_INFO = {
    playcount: undefined,
    daily_average: undefined,
    friend_list: [],
}

const USAGE_DETAIL = {
    game_list: [],
    games: [],
    os_time: {
        windows: undefined,
        mac: undefined,
        linux: undefined
    },
    two_week_total: undefined,
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

    console.log(USAGE_DETAIL.games["Apex Legends"])
    console.log(USAGE_DETAIL.game_list)


});