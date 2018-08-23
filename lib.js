function drawGrid(
  ctx,
  width,
  height,
  wg_amount,
  hg_amount,
  line_width,
  line_color
) {
  /*
    * 该函数用于画格子
    * ctx: canvas上下文
    * width: canvas宽度
    * height: canvas高度
    * wg_amount: 列数
    * hg_amount: 行数 
    * 返回值: 一个包含格子宽高的对象
    */
  const wg_size = width / wg_amount;
  const hg_size = height / hg_amount;

  ctx.strokeStyle = line_color;
  ctx.lineWidth = line_width;
  ctx.beginPath();

  //画列
  for (let i = 0; i <= wg_amount; i++) {
    ctx.moveTo(wg_size * i, 0);
    ctx.lineTo(wg_size * i, height);
  }

  //画行
  for (let i = 0; i <= hg_amount; i++) {
    ctx.moveTo(0, hg_size * i);
    ctx.lineTo(width, hg_size * i);
  }

  //实际绘图
  ctx.stroke();

  return {
    wg_size,
    hg_size
  };
}
