class MousePositionObservable{
    constructor(){
        this.subscriptions = [];
        window.addEventListener('mousemove', this.handleMouseMove)

    }

    subscribe(callback){
        this.subscriptions.push(callback);
        
        return () => this.subscriptions = this.subscriptions.filter(cb => cb !== callback);
    }

    handleMouseMove = (e) => {
        this.subscriptions.forEach(sub => {
            sub(e.clientX, e.clientY)
        });
    }
}

const mousePositionObservable = new MousePositionObservable();



const unsubscribeBox = mousePositionObservable.subscribe((x, y) => {
    console.info('Mouse Cursor Position', x, y);
    document.querySelector('.mouse-position .position').innerHTML = `
    <p>Cliente X: ${x}</p>
    <p>Cliente Y: ${y}</p>
    `
})

const unsubscribeMouse =  mousePositionObservable.subscribe((x, y) => {
    console.info('Mouse Cursor Position', x, y);
    const circle = document.querySelector('.circle');
    window.setTimeout(() => circle.style.transform = `translate(${x}px, ${y}px)`,1000);
});

document.querySelector('.mouse-position').addEventListener('click',(e) =>{
e.stopPropagation();
    unsubscribeBox();
});
document.querySelector('.container').addEventListener('click',unsubscribeMouse);