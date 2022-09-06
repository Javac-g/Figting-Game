class Sprite{

    constructor({position,imageSrc,scale = 1,framesMix = 1,offset = {x:0,y:0}}){

        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMix = framesMix
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 2
        this.offset = offset
    }
    draw(){
        c.drawImage(
            this.image,
            this.frameCurrent * (this.image.width / this.framesMix),
            0,
            this.image.width / this.framesMix,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMix)* this.scale,
            this.image.height * this.scale)
    } 
    animateFrames(){
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMix-1) {
            this.frameCurrent++
            }else{
            this.frameCurrent = 0
             }
        }
    }
    update(){
        this.draw()
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.frameCurrent < this.framesMix-1) {
            this.frameCurrent++
            }else{
            this.frameCurrent = 0
             }
        }
         
         
        
    }
        
    
}
class Fighter extends Sprite{

    constructor({
        position,
        velocity,
        color = 'red',
        imageSrc,
        scale = 1,
        framesMix = 1,
        offset = {x:0,y:0},
        sprites

    }){

        super({
            position,
            imageSrc,
            scale,
            framesMix,
            offset
        })

       
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastkey
        this.attackBox = {
            position:{
                x:this.position.x,
                y:this.position.y
            },
             
        
            offset,
            width:100,
            height:50
                
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.frameCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

    }
    
         
    update(){
        this.draw()
        this.animateFrames()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
         this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height-96){
            this.velocity.y = 0
        }else{
            this.velocity.y+=gravity
        }
    }
    attack(){
        this.isAttacking = true
        setTimeout(() =>{
            this.isAttacking = false
        },100)
    }
}