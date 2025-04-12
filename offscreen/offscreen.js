onmessage = (evt) => {
    const canvas = evt.data.canvas;
    const ccc = canvas.getContext("webgl");
    const ctx = canvas.getContext("2d");
    console.log("ctx: ", ctx);
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.fillStyle = "green";
    ctx.fill();
}