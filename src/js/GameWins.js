function GameWins(canvas)
{
	this.imagem = new Image();
	//this.imagem.src = "gameover.png";
	
	this.canvas = canvas;
	
	this.desenharGameWins = function()
	{
	    this.canvas.fillStyle = '#228B22';
	    this.canvas.fillRect(0, 0, 1440, 1440);
		var phrase = "Wins! :)";
		this.canvas.font = "bold 34px Arial, sans-serif";
		var mt = this.canvas.measureText(phrase);
		var xcoord = (1440 / 2) - (mt.width / 2);
		this.canvas.fillStyle = '#FFFFFF';
		this.canvas.fillText(phrase, xcoord, 300);
	}
}
