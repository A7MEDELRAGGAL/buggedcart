
// Simple matrix background + small cursor-typing helper
(function(){
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;
  const cols = Math.floor(w / 14);
  const ypos = Array(cols).fill(0);
  const letters = "abcdefghijklmnopqrstuvwxyz0123456789<>/{}[]()$%#@!*&".split("");

  function matrixLoop(){
    ctx.fillStyle = "rgba(1,2,3,0.12)";
    ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "#1aff99";
    ctx.font = "12px Source Code Pro, monospace";

    for (let i=0; i<ypos.length; i++){
      const text = letters[Math.floor(Math.random() * letters.length)];
      const x = i * 14;
      ctx.fillText(text, x, ypos[i]*14);
      if (ypos[i]*14 > h && Math.random() > 0.975) ypos[i] = 0;
      ypos[i]++;
    }
  }
  let matrixTimer = setInterval(matrixLoop, 60);

  window.addEventListener("resize", function(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  document.addEventListener("DOMContentLoaded", function(){
    const nodes = document.querySelectorAll("[data-type]");
    nodes.forEach(node=>{
      const text = node.getAttribute("data-type");
      node.textContent = "";
      let i = 0;
      function typeChar(){
        if (i < text.length) {
          node.textContent += text[i++];
          setTimeout(typeChar, 18 + Math.random()*40);
        }
      }
      setTimeout(typeChar, 200);
    });
  });

})();

