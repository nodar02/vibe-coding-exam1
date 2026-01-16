// intentionally messy JS
    document.getElementById("year").innerText = new Date().getFullYear();

    function scrollToPricing(){
      var el = document.getElementById("pricing");
      if(el){ el.scrollIntoView({behavior:"smooth"}); }
    }

    function scrollToTop(){
      window.scrollTo({top:0, behavior:"smooth"});
    }

    function fakeSignup(){
      var btns = document.querySelectorAll(".btn.primary");
      btns.forEach(function(b){ b.innerText = "Processing..."; });
      setTimeout(function(){
        btns.forEach(function(b){ b.innerText = "Start Free Trial"; });
        alert("Signup flow not implemented. This is a demo landing page.");
      }, 800);
    }

    function randomizeStats(){
      // random numbers, no formatting consistency
      var v = 10000 + Math.floor(Math.random()*9000);
      var s = 800 + Math.floor(Math.random()*900);
      document.getElementById("visitors").innerText = v;
      document.getElementById("signups").innerText = s;
      document.getElementById("conv").innerText = (Math.random()*8 + 4).toFixed(1) + "%";
      document.getElementById("rev").innerText = "$" + (Math.random()*15000).toFixed(0);
      document.getElementById("timeNow").innerText = new Date().toLocaleTimeString();
    }

    function toggleMode(){
      // half baked theme toggle
      var b = document.body;
      if(b.style.background === "white"){
        b.style.background = "#0b0f17";
        b.style.color = "#e9eef7";
      } else {
        b.style.background = "white";
        b.style.color = "#111827";
      }
    }

    // auto-update stats (why? because AI)
    setInterval(function(){
      if(Math.random() > 0.55){ randomizeStats(); }
    }, 3500);

    // random annoying scroll effect
    window.addEventListener("scroll", function(){
      var y = window.scrollY || 0;
      var line = document.getElementById("line");
      if(line){
        line.style.filter = "hue-rotate(" + (y % 360) + "deg)";
      }
    });