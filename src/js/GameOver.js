function GameOver(canvas)
{
	this.imagem = new Image();
	//this.imagem.src = "gameover.png";
	
	this.canvas = canvas;
	
	this.desenharGameOver = function()
	{                
	    this.canvas.fillStyle = '#000000';
	    this.canvas.fillRect(0, 0, 1440, 1440);
		var phrase = "Game Over! Clique ou toque na tela para iniciar o jogo";
		this.canvas.font = "bold 34px Arial, sans-serif";
		var mt = this.canvas.measureText(phrase);
		var xcoord = (1440 / 2) - (mt.width / 2);
		this.canvas.fillStyle = '#FFFFFF';
		this.canvas.fillText(phrase, xcoord, 300);
	}
}
