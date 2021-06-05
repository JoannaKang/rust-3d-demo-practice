const rust = import('./pkg/rust_3d_demo');
const canvas = document.getElementById('rustCanvas');
const gl = canvas.getContext("webgl", { antialias: true });

rust.then(m => {
  if (!gl) {
    alert('Failed to initialize WebGL');
    return;
  }

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const FPS_THROTTLE = 1000.0 / 30.0; // milliseconds / frames
  const dougsClient = new m.DougsClient();
  const initialTime = Date.now();
  let lastDrawTime = -1

  function render() {
    window.requestAnimationFrame(render);
    const currTime = Date.now();
    if (currTime >= lastDrawTime + FPS_THROTTLE) {
      lastDrawTime = currTime; // render function이 너무 자주 호출되지 않도록 조건을 걸어준다
      if (window.innerHeight !== canvas.height || window.innerWidth !== canvas.width) {
        // 창 크기가 변경될때를 대비하여 캔버스 크기가 재조정되도록 한다
        canvas.height = window.innerHeight;
        canvas.clientHeight = window.innerHeight;
        canvas.style.height = window.innerHeight;
        
        canvas.width = window.innerWidth;
        canvas.clientWidth = window.innerWidth;
        canvas.style.width = window.innerWidth;
        
        gl.viewport(0, 0, window.innerWidth, window.innerHeight);        
      }
      let elapsedTime = currTime - initialTime;
      dougsClient.update(elapsedTime, window.innerHeight, window.innerWidth);
      dougsClient.render();
      //Rust update call
      //Rust render call
    }
  }

  render();
});