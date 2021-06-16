// 添加信息点
var hotPoints=[
    {
        position:{
            x:0,
            y:0,
            z:-0.2
        },
        detail:{
            "title":"信息点1"
        }
    },
    {
        position:{
            x:-0.2,
            y:-0.05,
            z:0.2
        },
        detail:{
            "title":"信息点2"
        }
    }
];
// 使用3D引擎先搭一个基本的3D场景
var scene, camera, renderer;
function initThree(){
    //场景
    scene = new THREE.Scene();
    //镜头
    camera = new THREE.PerspectiveCamera(90, document.body.clientWidth / document.body.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 0.01);
    //渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(document.body.clientWidth, document.body.clientHeight);

    document.getElementById("container").appendChild(renderer.domElement);
    //镜头控制器
    var controls = new THREE.OrbitControls(camera, renderer.domElement);

    // useSphere();
    useBox();

    initPoints();

    loop();
}

function useBox(){
    var materials = [];
    // 根据左右上下前后的顺序构建六个面的材质集
    var texture_left = new THREE.TextureLoader().load( './images/scene_left.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_left} ) );

    var texture_right = new THREE.TextureLoader().load( './images/scene_right.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_right} ) );

    var texture_top = new THREE.TextureLoader().load( './images/scene_top.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_top} ) );

    var texture_bottom = new THREE.TextureLoader().load( './images/scene_bottom.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_bottom} ) );

    var texture_front = new THREE.TextureLoader().load( './images/scene_front.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_front} ) );

    var texture_back = new THREE.TextureLoader().load( './images/scene_back.jpeg' );
    materials.push( new THREE.MeshBasicMaterial( { map: texture_back} ) );

    var box = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
    box.geometry.scale( 1, 1, -1 );
    scene.add(box);
}
// 使用球体（sphere）实现
function useSphere(){
    var sphereGeometry = new THREE.SphereGeometry(1, 50, 50);
    sphereGeometry.scale(1, 1, -1);
    // sphereGeometry.rotateY(180*Math.PI/180);

    var texture = new THREE.TextureLoader().load('./images/scene.jpeg');
    var sphereMaterial = new THREE.MeshBasicMaterial({map: texture});

    // var sphereGeometry = new THREE.SphereGeometry(50, 20, 20);

    var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
    // sphere.material.wireframe  = true;
    scene.add(sphere);
}
// 帧同步重绘
function loop() {
    requestAnimationFrame(loop);

    renderer.render(scene, camera);
}

window.onload = initThree;

function initPoints(){
    var pointTexture = new THREE.TextureLoader().load('images/hot.png');
    var material = new THREE.SpriteMaterial( { map: pointTexture} );

    var poiObjects = [];
    for(var i=0;i<hotPoints.length;i++){
        var sprite = new THREE.Sprite( material );
        sprite.scale.set( 0.1, 0.1, 0.1 );
        sprite.position.set( hotPoints[i].position.x, hotPoints[i].position.y, hotPoints[i].position.z );

       scene.add( sprite );

       sprite.detail = hotPoints[i].detail;
       poiObjects.push(sprite);
    }

    document.querySelector("#container").addEventListener("click",function(event){
        event.preventDefault();

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        mouse.x = ( event.clientX / document.body.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / document.body.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( poiObjects );
        if(intersects.length>0){
            alert("点击了热点"+intersects[0].object.detail.title);
        }
    });
}
