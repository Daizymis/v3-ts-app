const reactive = (data) ={
    createReactive(data);
}
const createReactive = (data) =>{
    let obj = new Proxy(data, {
        get(target, key){
            track(target, key)
            return target[key];
        },
        set(target, key, value){
            trigger(target, key);
        }
    })
}
let activeEffect;
const effectMap = new WeakMap();
const track = (target, key) => {
    if(!activeEffect) return;
    let depsMap = effectMap.get(target);
    if(!depsMap) {
        effectMap.set(target, depsMap = new Map());
    }
    let deps = depsMap.get(key);
    if(!deps) {
        depsMap.set(key, deps = new Set());
    }
    deps.add(activeEffect);

}
