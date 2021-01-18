/* main.js JavaScriptライブラリ"jQuery"を利用している*/

$(document).ready(function() {
    $('main').fadeIn('slow');

});

// main
$(function() {
    // コンソールに出力
    // console.log('Hello World.');


    // 作成ボタンが押されたとき
    $('#GenerateButton').on('click', function() {
        console.log("- Pushed GenerateButton.")
        // ユーザの入力を取得
        let user_input = $("#FormControlTextarea").val();
        console.log("ユーザの入力: " + user_input);

        $.ajax({
            type: 'GET',
            url: 'http://localhost/NEMUMI/spots.json',
            dataType: 'json',
            success: function(json) {
                const json_data = json;

                // クラスをインスタンス化
                let travel = new Travel(user_input, json_data);

                // 出発・帰宅時間を分析
                travel.analyzeInputTimes();
                
                // 優先度を分析
                travel.analyzeInputPriority();

                travel.analyzeInputPlace();

                travel.planOutput();

                travel.planView();

                // フォームと作成ボタンを非表示にする
                $('#Form,#GenerateButton').hide();
                // 結果テーブルと戻るボタンを表示する
                $('#ResultTable,#BackButton').fadeIn('slow');
            }
        });

    });

    // 戻るボタンが押されたとき
    $('#BackButton').on('click', function() {
        console.log("Pushed BackButton.")
        // フォームと作成ボタンを非表示にする
        $('#ResultTable,#BackButton').hide();
        // 結果テーブルと戻るボタンを表示する
        $('#Form,#GenerateButton').fadeIn('slow');
    });

});