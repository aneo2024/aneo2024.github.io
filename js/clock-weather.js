// source/js/weather-clock.js
window.addEventListener('DOMContentLoaded', function() {
  // ========== 仅需修改这两个配置 ==========
  const SENIVERSE_KEY = 'S_ox31jNkovTG6JVW'; // 替换成你的心知Key
  const TARGET_CITY = '武汉';                  // 替换成你要显示的城市（如北京、上海）

  // 1. 创建组件DOM结构
  function createWeatherClockDOM() {
    const container = document.createElement('div');
    container.id = 'weather-clock';
    container.innerHTML = `
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
    `;
const asideContent = document.getElementById('aside-content');
    if (asideContent) {
      // 方案1：找到公告卡片，在它后面插入（公告 → 时钟 → sticky_layout）
      const announcementCard = asideContent.querySelector('.card-announcement');
      const stickyLayout = asideContent.querySelector('.sticky_layout');
      
      if (announcementCard && stickyLayout) {
        // 把时钟插到「公告」和「sticky_layout」之间（完美位置）
        asideContent.insertBefore(container, stickyLayout);
      } 
    } 
    // 极端兜底：找不到边栏则挂到body
    else {
      document.body.appendChild(container);
      container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 290px;
      `;
    }
}
  // 2. 时钟+日期更新逻辑
  function updateTimeAndDate() {
    const now = new Date();
    document.getElementById('show_time').innerText = now.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    document.getElementById('show_date').innerText = now.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    });
  }

  // 3. 仅用心知天气获取数据（无高德定位）
  function fetchWeather() {
    // 心知天气实时天气API：https://docs.seniverse.com/api/weather/now.html
    fetch(`https://api.seniverse.com/v3/weather/now.json?key=${SENIVERSE_KEY}&location=${encodeURIComponent(TARGET_CITY)}&language=zh-CN`, { timeout: 10000 })
      .then(res => {
        if (!res.ok) throw new Error('心知天气请求失败');
        return res.json();
      })
      .then(data => {
      if (!data.results || data.results.length === 0) throw new Error('数据为空');
      const weather = data.results[0].now;
      const location = data.results[0].location;
      // 按你实际返回的字段渲染：城市 + 天气 + 温度 + 更新时间
      document.getElementById('show_area').innerHTML = `
        📍 ${location.name}<br>
        🌤️ ${weather.text}　${weather.temperature}℃<br>
        <small style="opacity:0.7;">最后更新：${new Date(data.results[0].last_update).toLocaleString('zh-CN')}</small>
      `;
      })
      .catch(err => {
        document.getElementById('show_area').innerHTML = `
           📍 暂时无法获取${TARGET_CITY}天气<br>
           <span class="tips">请检查Key是否正确或网络是否正常</span>
         `;
      });
  }

  // 初始化执行
  createWeatherClockDOM();
  updateTimeAndDate();
  setInterval(updateTimeAndDate, 1000);
  fetchWeather();
});