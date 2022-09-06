const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576


c.fillRect(0,0,canvas.width,canvas.height)
const gravity = 0.7

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:'cyberpunk-street.png'
})
const shop = new Sprite({
    position:{
        x:600,
        y:160
    },
    imageSrc:'shop.png',
    scale:2.5,
    framesMix: 6
})
const player = new Fighter({
    position:{
    x:0,
    y:0
    
    },
    velocity:{
    x:0,
    y:10    
    },
    offset:{
    x:0,
    y:0    
    },
    imageSrc:'idle.png',
    framesMix: 8,
    scale:2.5,
    offset:{
        x:215,
        y:150
    },
    sprites:{
        idle:{
            imageSrc :'Idle.png',
            framesMix:8
        },
        run:{
            imageSrc :'Run.png',
            framesMix:8,
            image:new Image()
        }
    }
})

 
const enemy = new Fighter({
    position:{
    x:400,
    y:100
    
    },
    velocity:{
    x:0,
    y:0    
    },
    color : 'blue',
    offset:{
    x:-50,
    y:0    
    }
})




const keys = {
    a:{
        pressed:false
    },
    d:{
    pressed:false
    },
    c:{
    pressed:false
    },
    w:{
        pressed:false
    },
    ArrowRight:{
    pressed:false
    },
    ArrowLeft:{
        pressed:false
    }
}
let lastkey
function rectangularCollision({rec1,rec2}){
    
    return(rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x && rec1.attackBox.position.x <=rec2.position.x + rec2.width && rec1.attackBox.position.y+rec2.attackBox.height>=rec2.position.y && rec1.attackBox.position.y <= rec2.position.y+rec2.height )
}
let timer = 61
let timerId
function determinWinner({player,enemy,timerId}){
    clearTimeout(timerId)
    document.querySelector('#TieText').style.display = 'flex'
    if (player.health===enemy.health) {
        document.querySelector('#TieText').innerHTML = 'Tie'
         
    } else if (player.health > enemy.health) {
        document.querySelector('#TieText').innerHTML = 'Player 1 Win'
       
    }else if (player.health < enemy.health) {
        document.querySelector('#TieText').innerHTML = 'Player 2 Win'
       
    }

}
function decreaseTimer(){
     
    if (timer >0){
        timerId = setTimeout(decreaseTimer,1000)
        timer--
        document.querySelector('#timer').innerHTML = timer

    }if (timer===0) {
         
        determinWinner({player,enemy,timerId})
        
    }
     
}
decreaseTimer()
function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    background.update()
    shop.update()
    player.update()
    // enemy.update()
    
    player.velocity.x = 0
    enemy.velocity.x = 0


    player.image = player.sprites.idle.image
    if(keys.a.pressed && player.lastkey === 'a'){
        player.velocity.x=-5
        player.image = player.sprites.run.image
        
    }else if(keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x=5
        player.image = player.sprites.run.image
    }
    
    if(keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){
        enemy.velocity.x=-5
    }else if(keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x=5
    }
    
    if(rectangularCollision({
        rec1:player,
        rec2:enemy})&& player.isAttacking ){
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemyHealth').style.width = enemy.health+'%'
    }
     if(rectangularCollision({
        rec1:enemy,
        rec2:player})&& enemy.isAttacking ){
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#playerHealth').style.width = player.health+'%'
    }
    if (enemy.health <= 0 || player.health <= 0) {
        determinWinner({player,enemy,timerId})
    }
    
}
animate()
window.addEventListener('keydown', (event) =>{
    switch(event.key){
            case'd':
                keys.d.pressed = true
                player.lastkey ='d'
                break
            case'a':
                player.lastkey = 'a'
                keys.a.pressed = true
                break
            case'w':
                
                player.velocity.y = -20
                break
                case ' ':
                player.attack()
                break  
                
            case'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastkey = 'ArrowRight'
                
                break
            case'ArrowLeft':
                keys.ArrowLeft.pressed = true
                 enemy.lastkey = 'ArrowLeft'
                break
            case'ArrowUp':
                lastkey = 'w'
                enemy.velocity.y = -20
                break   
            case'ArrowDown':
                enemy.attack()
                break   
    }
                        console.log(event.key)
                        
})
window.addEventListener('keyup', (event) =>{
    switch(event.key){
            case'd':
                keys.d.pressed = false
                break
            case'a':
               keys.a.pressed = false
                break
           
             case'ArrowRight':
                keys.ArrowRight.pressed = false
                break
            case'ArrowLeft':
               keys.ArrowLeft.pressed = false
                break
            
    }
                    console.log(event.key)
                        
})