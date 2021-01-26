                        /* JavaScriptライブラリ "jQuery" 使用可 */

                        class Travel {
                            constructor(input_sentence, json_data) {
                                // ユーザの入力文章
                                this.input = input_sentence;
                                this.db = json_data;
                                this.times = { start: '00:00', end: '23:59' };
                                // 評価:"evalution", 安価:"cheapest", 場数:"number"
                                this.priority = "evalution";
                                this.place_list;
                                this.route_list;
                                this.plan;
                            }

                            get getInput() {
                                return this.input;
                            }

                            set setInput(data) {
                                this.input = data;
                            }

                            // はるき 担当メソッド "analyzeInputTimes"
                            analyzeInputTimes() {
                                console.log("- Run analyzeInputTimes");

                                let input = this.input;
                                let time_pattern = /([01]?[0-9]|2[0-3]):([0-5][0-9])/g;
                                let temp;
                                let result = [];

                                while ((temp = time_pattern.exec(input)) != null) {
                                    result.push(temp[0]);
                                }

                                this.times = { start: result[0], end: result[1] };

                                console.log(this.times);
                            }

                            // はるき 担当メソッド "analyzeInputTimes"
                            analyzeInputPriority() {
                                console.log("- Run analyzeInputPriority");

                                let input = this.input;

                                // 優先度に起因する文字列パターン
                                let priority_pattern = {
                                    evalution: ["評価", "おすすめ"],
                                    cheapest: ["安い", "お財布にやさしい"],
                                    number: ["たくさん", "いっぱい"]
                                };

                                // それぞれの優先度に起因する文字列が含まれているか

                                // 含まれていたら、優先度を変更する

                                priority_pattern.evalution.forEach(function(pattern) {
                                    if (input.match(/ + pattern + /)) {
                                        this.priority = "evalution";
                                    }
                                });

                                priority_pattern.cheapest.forEach(function(pattern) {
                                    if (input.match(/ + pattern + /)) {
                                        this.priority = "cheapest";
                                    }
                                });

                                priority_pattern.number.forEach(function(pattern) {
                                    if (input.match(/ + pattern + /)) {
                                        this.priority = "number";
                                    }
                                });

                                console.log("優先度: this.priority = " + this.priority);

                            }

                            // けいいちろう 担当メソッド "analyzeInputPlace"
                            analyzeInputPlace() {
                                // コンソール出力
                                console.log("- Run analyzeInput");
                                // ユーザの入力
                                let input = this.input;
                                // jsonデータ
                                let db_copy = this.db;
                                console.log(db_copy);
                                console.log(db_copy[0].name);

                                let place_list = this.place_list;

                                // ユーザの入力とjsonデータ(DB)を比較して、place_list(json)を作成
                                for (let i = 0; i < db_copy.length; i++) {
                                    if (0 == i) {
                                        place_list = "[";
                                    }
                                    if (wordMatch(db_copy[i].name)) {
                                        let name = db_copy[i].name;
                                        let evalution = db_copy[i].evalution;
                                        let AST = db_copy[i].AST;
                                        let fee = db_copy[i].fee;
                                        let longitude = db_copy[i].longitude;
                                        let latitude = db_copy[i].latitude;
                                        var addData = '{ "name":"' + name + '", "evalution":' + evalution + ', "AST":' + AST + ', "fee":' + fee + ', "longitude":' + longitude + ', "latitude":' + latitude + ' }';
                                        if (0 < i) {
                                            place_list += "," + addData;
                                        } else {
                                            place_list += addData;
                                        }
                                    }

                                    if (i == db_copy.length - 1) {
                                        place_list += "]";
                                    }

                                }

                                function wordMatch(name) {
                                    if (input.indexOf(name) != -1) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }

                                this.place_list = JSON.parse(place_list);

                                // ダミー結果

                                /*
                                let result = [{
                                        "name": "浜松城",
                                        "evalution": 3.7,
                                        "AST": 1,
                                        "fee": 200,
                                        "longitude": 34.7108375,
                                        "latitude": 137.7224103,
                                    },
                                    {
                                        "name": "浜名湖パルパル",
                                        "evalution": 3.9,
                                        "AST": 4.5,
                                        "fee": 0,
                                        "longitude": 0.0000,
                                        "latitude": 0.0000,
                                    },
                                    {
                                        "name": "ぬくもりの森",
                                        "evalution": 3.0,
                                        "AST": 2.5,
                                        "fee": 0,
                                        "longitude": 0.0000,
                                        "latitude": 0.0000,
                                    }
                                ];
                                */

                                // 結果をplace_listに出力

                                /*  結果例 place_list 形式(json)
                                    [
                                        {
                                            "name": "浜松城",
                                            "evalution": 3.7,
                                            "AST": 1,
                                            "fee": 200,
                                            "longitude": 34.7108375,
                                            "latitude": 137.7224103,
                                        },
                                        {
                                            "name": "浜名湖パルパル",
                                            "evalution": 3.9,
                                            "AST": 4.5,
                                            "fee": 0,
                                            "longitude": 0.0000,
                                            "latitude": 0.0000,
                                        },
                                        {
                                            "name": "ぬくもりの森",
                                            "evalution": 3.0,
                                            "AST": 2.5,
                                            "fee": 0,
                                            "longitude": 0.0000,
                                            "latitude": 0.0000,
                                        }
                                    ]
                                */
                            }

                            // たいち 担当メソッド "PlanOutput"
                            planOutput() {
                                // コンソール出力
                                console.log("- Run PlanOutput");

                                // 行先リスト
                                let place_list_copy = this.place_list;
                                console.log(place_list_copy);

                                /* 
                                // ここを編集
                                // 要素の順番を優先度を基にplace_listの順番を入れ替える
                                */

                                //評価の高い順に並べ替える
                                function compare(a, b) {
                                    var r = 0;
                                    if (a.evalution < b.evalution) { r = -1; } else if (a.evalution > b.evalution) { r = 1; }

                                    return (-1 * r);
                                }

                                place_list_copy.sort(compare);


                                //距離の計算//
                                function distance(lat1, lng1, lat2, lng2) {
                                    lat1 *= Math.PI / 180;
                                    lng1 *= Math.PI / 180;
                                    lat2 *= Math.PI / 180;
                                    lng2 *= Math.PI / 180;
                                    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
                                }

                                let range = [];
                                for (let i = 0; i <= place_list_copy.length - 2; i++) {
                                    let latitude1 = place_list_copy[i].latitude;
                                    let longitude1 = place_list_copy[i].longitude;
                                    let latitude2 = place_list_copy[i + 1].latitude;
                                    let longitude2 = place_list_copy[i + 1].longitude;
                                    range[i] = distance(latitude1, longitude1, latitude2, longitude2);
                                }

                                console.log(range);

                                //距離→時間  
                                let travel_time = [];
                                for (let i = 0; i < range.length; i++) {
                                    travel_time[i] = parseInt(range[i] / 40 * 60);
                                }
                                console.log(travel_time);


                                var mytime = function(str) {
                                    var hms = str.split(":");
                                    var h = parseInt(hms[0]);
                                    var m = parseInt(hms[1] | "0");
                                    var s = parseInt(hms[2] | "0");
                                    this.time = h * 3600 + m * 60 + s;
                                    this.addSecond = function(n) {
                                        this.time += n;
                                    };
                                    this.addMinute = function(n) {
                                        this.time += n * 60;
                                    };
                                    this.addHour = function(n) {
                                        this.time += n * 3600;
                                    };
                                    this.disp = function() {
                                        var minus = this.time < 0 ? "-" : "";
                                        var t = Math.abs(this.time);
                                        var h = Math.floor(t / 3600).toString();
                                        var m = (100 + Math.floor((t % 3600) / 60)).toString().substr(-2);
                                        var s = (100 + Math.round(t % 60)).toString().substr(-2);
                                        return minus + h + ":" + m + ":" + s;
                                    };
                                };

                                var time = new mytime(this.times.start);



                                console.log(time.disp());

                                var time2 = new mytime(this.times.end);

                                var split_time = time2.disp().split(':');

                                var a = parseInt(split_time[0] * 60) + parseInt(split_time[1]);

                                console.log("a:" + a);

                                var b = 0;

                                console.log("b:" + b);

                                // 仮 最初の目的地までの到着時間
                                var min = 1;
                                var max = 60;
                                var ramdom_minute = Math.floor(Math.random() * (max + 1 - min)) + min;
                                time.addMinute(ramdom_minute);

                                let turn_time = [];
                                let last_time;
                                for (let i = 0; i < place_list_copy.length; i++) {
                                    console.log(place_list_copy[i].AST * 60);
                                    console.log(travel_time[i]);
                                    console.log("a - b:" + (a - (b + (place_list_copy[i].AST * 60) + travel_time[i])));
                                    if ((a - (b + (place_list_copy[i].AST * 60) + travel_time[i])) < 0 || (a - (b + (place_list_copy[i].AST * 60))) < 0) {
                                        console.log("time:" + time.disp());
                                        break;
                                    } else {
                                        //滞在時間
                                        turn_time[i] = time.disp();
                                        time.addHour(place_list_copy[i].AST);
                                        last_time = time.disp();
                                        var split_time2 = last_time.split(':');

                                        b = parseInt(split_time2[0] * 60) + parseInt(split_time2[1]);

                                        if (i < place_list_copy.length - 1 && (a - (b + (place_list_copy[i + 1].AST * 60) + travel_time[i])) > 0) {
                                            //移動時間
                                            console.log("before:" + time.disp());
                                            time.addMinute(parseInt(travel_time[i]));
                                            console.log("after:" + time.disp());

                                            last_time = time.disp();
                                            var split_time2 = last_time.split(':');
                                            b = parseInt(split_time2[0] * 60) + parseInt(split_time2[1]);
                                        }


                                    }

                                }

                                console.log("time:" + time.disp());

                                //json作成
                                let route_list = this.route_list;
                                for (let i = 0; i < turn_time.length; i++) {
                                    if (0 == i) {
                                        route_list = "[";
                                    }
                                    if (true) {
                                        let turn = i + 1;
                                        let time = turn_time[i].slice(0, -3);
                                        let name = place_list_copy[i].name;
                                        let evalution = place_list_copy[i].evalution;
                                        let fee = place_list_copy[i].fee;
                                        let AST = place_list_copy[i].AST;
                                        var addData = '{ "turn":"' + turn + '", "time":"' + time + '", "name":"' + name + '", "evalution":' + evalution + ', "fee":' + fee + ', "AST":' + AST + ' }';
                                        if (0 < i) {
                                            route_list += "," + addData;
                                        } else {
                                            route_list += addData;
                                        }
                                    }

                                    if (i == turn_time.length - 1) {
                                        route_list += "]";
                                    }

                                }
                                console.log(route_list);
                                console.log(JSON.parse(route_list));
                                this.plan = JSON.parse(route_list);

                                // ダミー結果
                                /*
                                let result = [{
                                        "turn": "1",
                                        "time": "11:00",
                                        "name": "浜名湖パルパル",
                                        "evalution": 3.9,
                                        "fee": 0,
                                        "AST": 4.5
                                    },
                                    {
                                        "turn": "2",
                                        "time": "17:00",
                                        "name": "浜松城",
                                        "evalution": 3.7,
                                        "fee": 200,
                                        "AST": 1
                                    }
                                ];

                                // 結果をplanに出力
                                this.plan = result;

                                /*  結果例 plan 形式(json)
                                    [
                                        {
                                            "turn": "1",
                                            "time": "11:00",
                                            "name": "浜名湖パルパル",
                                            "evalution": 3.9,
                                            "fee": 0,
                                            "AST": 4.5
                                        },
                                        {
                                            "turn": "2",
                                            "time": "17:00",
                                            "name": "浜松城",
                                            "evalution": 3.7,
                                            "fee": 200,
                                            "AST": 1
                                        }
                                    ]
                                */
                            }

                            planView() {
                                // コンソール出力
                                console.log("- Run planView");

                                // HTMLテーブルの内容をplanの内容と同様にする
                                let plan_html = '';
                                this.plan.forEach(function(place) {
                                    plan_html +=
                                        '<tr>' +
                                        '<td>' + place.turn + '</td>' +
                                        '<td>' + place.time + '</td>' +
                                        '<td>' + place.name + '</td>' +
                                        '<td>' + place.evalution + '</td>' +
                                        '<td>￥' + place.fee + '</td>' +
                                        '<td>' + place.AST + '</td>' +
                                        '</tr>';
                                })

                                // HTML書き換え
                                $('#ResultTableBody').html(plan_html);
                            }


                        }