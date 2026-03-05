
const initFontSize = () => {
  function setRootFont() {
    const width = document.documentElement.clientWidth;
    // 假设以 1920 为基准，1rem = 19.2px (即 100px = 5.2rem)
    // 这里可以加限制，防止字体过大过小
    const fontSize = width / 100; 
    document.documentElement.style.fontSize = fontSize + 'px';
  }

  setRootFont();
  window.addEventListener('resize', setRootFont);
}

export default initFontSize;