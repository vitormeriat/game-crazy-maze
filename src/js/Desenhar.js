function Desenhar(canvas) {
    
    // Hero imagem        
    this.heroImage = new Image();
    this.heroImage.src = "../images/game_desing/hero.png";
    // Porta              
    this.throneImage = new Image();
    this.throneImage.src = "../images/game_desing/porta.png";
    // Bloco
    this.blocoImage = new Image();
    this.blocoImage.src = "../images/game_desing/bloco.png";
    // Monstro
    this.monsterImage = new Image();
    this.monsterImage.src = "../images/game_desing/monster.png";

    this.stageW = 36; // Largura de um quadrante
    this.stageH = 36; // Altura de um quadrante

    this.canvas = canvas;

    //this.desenharPlayer = function (gridX, gridY) {
    //    ctx.drawImage(this.heroImage, gridX * this.stageW, gridY * this.stageH);
    //}
}