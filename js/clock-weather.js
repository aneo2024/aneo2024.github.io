window.addEventListener("DOMContentLoaded",function(){function e(){var e=new Date;document.getElementById("show_time").innerText=e.toLocaleTimeString("zh-CN",{hour12:!1,hour:"2-digit",minute:"2-digit",second:"2-digit"}),document.getElementById("show_date").innerText=e.toLocaleDateString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",weekday:"long"})}var t,n,o;(n=document.createElement("div")).id="weather-clock",n.innerHTML=`
      <div class="time" id="show_time">--:--:--</div>
      <div id="show_date">加载日期中...</div>
      <div id="show_area">
        <div class="loading">
          获取天气数据
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </div>
      </div>
    `,(o=document.getElementById("aside-content"))?(t=o.querySelector(".card-announcement"))?t.after(n):o.prepend(n):(document.body.appendChild(n),n.style.position="fixed",n.style.top="20px",n.style.right="20px",n.style.width="290px"),e(),setInterval(e,1e3),fetch(`https://api.seniverse.com/v3/weather/now.json?key=S_ox31jNkovTG6JVW&location=${encodeURIComponent("武汉")}&language=zh-CN`,{timeout:1e4}).then(e=>{if(e.ok)return e.json();throw new Error("心知天气请求失败")}).then(e=>{if(!e.results||0===e.results.length)throw new Error("数据为空");var t=e.results[0].now,n=e.results[0].location;document.getElementById("show_area").innerHTML=`
        📍 ${n.name}<br>
        🌤️ ${t.text}　${t.temperature}℃<br>
        <small style="opacity:0.7;">最后更新：${new Date(e.results[0].last_update).toLocaleString("zh-CN")}</small>
      `}).catch(e=>{document.getElementById("show_area").innerHTML=`
           📍 暂时无法获取武汉天气<br>
           <span class="tips">请检查Key是否正确或网络是否正常</span>
         `})});