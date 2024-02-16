var GameData = function() {
};
GameData.BuildTitle = "Las Vegas Roulette";
GameData.BuildTitle_ru = "";
GameData.BuildVersion = "1.0.2";
GameData.BuildString = "";
GameData.Copyright = "Inlogic Software 2018";
console.info("%c %c   " + GameData.Copyright + " | " + GameData.BuildTitle + " " + GameData.BuildVersion + " | " + GameData.BuildString + "  %c ", "background:#353AFB", "background:#000080;color:#fff", "background:#353AFB");
window.main = {sprites:{button_big:{path:"assets/graphics/big-button.png", w:664, h:16}, particles:{path:"assets/graphics/firework.png", w:11, h:12}}, audio:{music:{path:"assets/audio/music", volume:1, loop:true, type:"music"}, ball_drop:{path:"assets/audio/ball_drop", volume:1, loop:false, type:"audio"}, ball_roll:{path:"assets/audio/ball_roll", volume:1, loop:false, type:"audio"}, clear_chips:{path:"assets/audio/clear_chips", volume:1, loop:false, type:"audio"}, clear_chips_result:{path:"assets/audio/clear_chips_result", 
volume:1, loop:false, type:"audio"}, click:{path:"assets/audio/click", volume:1, loop:false, type:"audio"}, click_back:{path:"assets/audio/click_back", volume:1, loop:false, type:"audio"}, chip:{path:"assets/audio/chip", volume:1, loop:false, type:"audio"}, lose:{path:"assets/audio/lose", volume:1, loop:false, type:"audio"}, win:{path:"assets/audio/win", volume:1, loop:false, type:"audio"}, winning_number:{path:"assets/audio/winning_number", volume:1, loop:false, type:"audio"}}, managers:{}, storage:{name:"st_inl_lvroulette", 
data:{music:.5, sounds:.5, tutorialPlayed:false, money:4950, bet:0, lastNumbers:[], lastBets:[], lastBetsPrice:0, selectedChipID:6}}, game:{splashDelay:1E3, lastNumberCount:7, lastNumberStatsCount:15, squareWinMultiplier:[1, 2, 5, 8, 11, 17, 35], highlightWinningSquaresLength:3E3, lastNumbers:[], placedChips:[]}, board:{leftBorder:2.5, border:3.5, zeroWidth:34, squareWidth:41.65, squareHeight:33.25, squareType:{evens:0, dozensColumns:1, sixLines:2, corner:3, street:4, split:5, straight:6}, squareColors:[1, 
0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1], squares:[], groupSquares:[], allSquares:[]}, chip:{values:[5E3, 1E4, 25E3, 5E4, 1E5, 5E5, 10, 25, 50, 100, 500, 1E3], sprites:["chip-5000.png", "chip-10K.png", "chip-25K.png", "chip-50K.png", "chip-100K.png", "chip-500K.png", "chip-10.png", "chip-25.png", "chip-50.png", "chip-100.png", "chip-500.png", "chip-1000.png"], offset:3}};

