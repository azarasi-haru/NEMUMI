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

        // ユーザの入力とjsonデータ(DB)を比較して、place_list(json)を作成

        /* 

        // ここを編集
        this.place_list = result;

        */

        // ダミー結果
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

        // 結果をplace_listに出力
        this.place_list = result;

        /*	結果例 place_list 形式(json)
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

        // ダミー結果
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

        /*	結果例 plan 形式(json)
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
        this.plan.forEach(function(place){
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