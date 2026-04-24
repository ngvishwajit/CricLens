$(document).ready(function(){

  // fill grounds
  data.grounds.forEach(g=>{
    $("#ground").append(`<option>${g.name}</option>`);
  });

  // player cards
  data.players.forEach(p=>{
    $("#playerList").append(`<div class="player-card">${p.name}</div>`);
  });

  // autocomplete
  $("#playerInput").on("input",function(){
    let val=$(this).val().toLowerCase();
    $("#suggestions").empty();

    data.players.forEach(p=>{
      if(p.name.toLowerCase().includes(val)){
        $("#suggestions").append(`<div class="suggestion">${p.name}</div>`);
      }
    });
  });

  // click suggestion
  $(document).on("click",".suggestion",function(){
    $("#playerInput").val($(this).text());
    $("#suggestions").empty();
  });

  // click player card
  $(document).on("click",".player-card",function(){
    $("#playerInput").val($(this).text());
  });

  // analyze
  $("#analyzeBtn").click(function(){

    let name=$("#playerInput").val().toLowerCase();
    let groundName=$("#ground").val();

    let player=data.players.find(p=>p.name.toLowerCase().includes(name));
    let ground=data.grounds.find(g=>g.name===groundName);

    if(!player){
      $("#result").html("❌ Player not found");
      return;
    }

    let score=7;

    if(player.strengths.includes(ground.pitch)) score=9;
    if(player.weakness.includes(ground.pitch)) score=5;

    let verdict = score>=8?"🔥 Elite":score>=6?"👍 Good":"⚠️ Risky";

    let explanation = `
<b>Pitch Insight:</b> ${ground.why}<br><br>

<b>Player Insight:</b> ${player.why}<br><br>

<b>Final Analysis:</b> ${player.name} is ${verdict} on ${ground.name} because 
the ${ground.pitch} pitch ${score>=8?"supports":"challenges"} his playing style (${player.style}).
`;

    $("#result").html(`
<h2>${player.name}</h2>

<p><b>Role:</b> ${player.role}</p>
<p><b>Style:</b> ${player.style}</p>

<p><b>Strength:</b> ${player.strengths.join(", ")}</p>
<p><b>Weakness:</b> ${player.weakness.join(", ")}</p>

<p><b>Ground:</b> ${ground.name}</p>
<p><b>Score:</b> ${score}/10</p>
<p>${verdict}</p>

<p>${explanation}</p>
`);

    $("#groundInfo").html(`
<h3>${ground.name}</h3>

<p><b>Pitch:</b> ${ground.pitch}</p>
<p><b>Soil:</b> ${ground.soil}</p>
<p><b>Behavior:</b> ${ground.behavior}</p>
<p><b>Avg Score:</b> ${ground.avg}</p>

<p><b>Best For:</b> ${ground.best}</p>
<p><b>Struggles:</b> ${ground.weak}</p>
`);

  });

});