function clamp(n){return Math.max(0,Math.min(100,Number(n)||0))}
function predict(){
  const hn=document.getElementById("home").value.trim()||"Local";
  const an=document.getElementById("away").value.trim()||"Visitante";
  const hs=clamp(document.getElementById("homeStrength").value), as=clamp(document.getElementById("awayStrength").value);
  const hf=clamp(document.getElementById("homeForm").value), af=clamp(document.getElementById("awayForm").value);
  const hd=clamp(document.getElementById("homeDef").value), ad=clamp(document.getElementById("awayDef").value);

  // Modelo demo: pondera fuerza, forma, defensa y una pequeña ventaja de localía.
  let h=.42*hs+.34*hf+.24*hd+6;
  let a=.42*as+.34*af+.24*ad;
  let total=h+a+55;
  let ph=Math.round(h/total*100), pa=Math.round(a/total*100), pd=100-ph-pa;
  if(pd<10){pd=10; let s=ph+pa; ph=Math.round(ph/s*90); pa=90-ph}
  let favorite=ph>=pa?hn:an, fp=Math.max(ph,pa);
  let diff=Math.abs(ph-pa);
  let homeGoals=Math.max(0,Math.min(4,Math.round(0.7+(hs+hf+hd)/130)));
  let awayGoals=Math.max(0,Math.min(4,Math.round(0.5+(as+af+ad)/145)));
  if(ph>pa) awayGoals=Math.min(homeGoals,awayGoals);
  if(pa>ph) homeGoals=Math.min(homeGoals,awayGoals);
  if(ph===pa){homeGoals=1;awayGoals=1}
  if(homeGoals===awayGoals && diff>8){if(ph>pa) homeGoals++;else awayGoals++}

  document.getElementById("resultado").classList.remove("hidden");
  document.getElementById("resultTitle").textContent=hn+" vs "+an;
  document.getElementById("winnerLabel").textContent="Favorito";
  document.getElementById("winner").textContent=favorite;
  document.getElementById("winnerPct").textContent=fp+"% de probabilidad estimada";
  document.getElementById("score").textContent=homeGoals+" - "+awayGoals;
  document.getElementById("homeName").textContent=hn; document.getElementById("awayName").textContent=an;
  document.getElementById("pHome").textContent=ph+"%"; document.getElementById("pDraw").textContent=pd+"%"; document.getElementById("pAway").textContent=pa+"%";
  document.getElementById("barHome").style.width=ph+"%"; document.getElementById("barDraw").style.width=pd+"%"; document.getElementById("barAway").style.width=pa+"%";
  document.getElementById("reading").textContent= favorite+" parte con ventaja en este modelo. La diferencia entre ambos equipos es de "+diff+" puntos porcentuales. El resultado es una estimación basada únicamente en los datos ingresados.";
  document.getElementById("breakout").textContent= favorite+" podría verse favorecido si marca temprano; una expulsión, penal o lesión de un jugador clave puede alterar fuertemente estas probabilidades. Este escenario todavía no está modelado con datos reales.";
  document.getElementById("resultado").scrollIntoView({behavior:"smooth",block:"start"});
}