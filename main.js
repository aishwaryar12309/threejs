import * as THREE from "three"
import "./style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()

const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color : "#fffdd0",
})
 
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight

}

const loader = new THREE.TextureLoader()
const texture = loader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/rock-texture.jpg')
const mesh = new THREE.Mesh(geometry, material)
material.map = texture

scene.add(mesh)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20
scene.add(camera)

const light = new THREE.PointLight(0xffffff, 70, 100, 1.7)
light.position.set(10, 10, 10)
scene.add(light)

/*const particles = new THREE.BufferGeometry()
const count = 100
const vertices = new Float32Array(count)

for (let i = 0; i < count; i++) {
    vertices[i] = (Math.random()-0.5) * 100
}

particles.setAttribute(
    "position",
    new THREE.BufferAttribute(vertices, 3)
)

const texture_particle_loader = new THREE.TextureLoader()
const texture_particle = texture_particle_loader.load('./textures/star.png')

const particle_material = new THREE.PointsMaterial({
    map: texture_particle,
    size: 0.2,
    sizeAttenuation: true
})

const stars = new THREE.Points(particles, particle_material)
scene.add(stars)
*/
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
 
const controls = new OrbitControls(camera, canvas)
// movement based on how fast you move cursor
controls.enableDamping = true 
controls.enableZoom = false

window.addEventListener('resize', () => {
    //resize 
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //update camera
    camera.updateProjectionMatrix()
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes/height)
}
)


//this re-renders when you adjust the size without 
//distorting the sphere
const loop = () => { 
    controls.update() //keeps moving after I let go
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop)
}

loop()


