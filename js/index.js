require('../css/main.scss')

const smoothness = 40
var sx = 0, sy = 0
var dotObject
var canvas
var ctx

window.addEventListener('load', () => {

	dotObject = document.querySelector('.dot')
	canvas = document.querySelector('#heatmap')
	canvas.height = window.outerHeight
	canvas.width = window.outerWidth
	ctx = canvas.getContext('2d')
	ctx.fillStyle = 'rgba(50,255,150, .05)'
	ctx.globalCompositeOperation = 'multiply';

	webgazer.setGazeListener(function(data, elapsedTime) {
		
	    if (data == null) {
	    	updateDomObjectColor(dotObject, 'red')
	        return
	    }
	    else updateDomObjectColor(dotObject, 'cyan')
	    sx = ((sx * (smoothness - 1)) + (data.x)) / smoothness
	    sy = ((sy * (smoothness - 1)) + (data.y)) / smoothness

	    updateDomObjectPosition(dotObject, sx, sy)
	    leaveHeatTrail(ctx, sx, sy)
	}).begin()
})

function updateDomObjectPosition (obj, x, y) {
	obj.style.left = x + 'px'
	obj.style.top = y + 'px'
}

function updateDomObjectColor (obj, color) {
	obj.style.background = color
}

function leaveHeatTrail (ctx, x, y) {
	ctx.beginPath()
	ctx.arc(x, y, 80, 0, 2 * Math.PI, false)
	ctx.fill()
}

