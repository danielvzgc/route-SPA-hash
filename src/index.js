export class RoutesHash{
    #routesPages = new Map();
    #rootNode=null;

    constructor(routes=[], rootNode = null){
        this.#setRoutes(routes);
        this.#setRootNode(rootNode);
        this.#showView(this.#getView());
        this.#addListenerChangeHash();
    };
    #setRoutes = (routes = []) => {
        routes.map( route => {
            this.#routesPages.set(route.hash, route.view);
        });
    };
    getRoutes = () => console.log(this.#routesPages);
    #setRootNode = (node=null) => {
        if(node === null){
            const newRootNode = document.createElement('div');
            newRootNode.id = "root";
            node = newRootNode;
        }
        this.#rootNode = node;
        document.querySelector('body').appendChild(this.#rootNode);
    };
    getRootNode = () => console.log(this.#rootNode);
    #getView = () => {
        const hashExist = !!this.#routesPages.get(window.location.hash);
        const anyHashExist = !!this.#routesPages.get("#*");
        const homeHashExist = !!this.#routesPages.get("#");
        
        if(window.location.hash === '' && homeHashExist) return this.#routesPages.get("#");
        else if(!hashExist && !anyHashExist) return '';
        else if(!hashExist && anyHashExist) return this.#routesPages.get("#*");
        return this.#routesPages.get(window.location.hash);
    };
    #showView = (view='') => {
        if(this.#rootNode.hasChildNodes()){
            while(this.#rootNode.firstChild) {
                this.#rootNode.removeChild(this.#rootNode.firstChild);
            }
        }
        if(view.nodeType !== 1 && view.nodeType !== 11) this.#rootNode.textContent = view;
        else if(view.nodeType === 11) this.#rootNode.appendChild(document.importNode(view, true)); 
        else if(view.nodeType === 1) this.#rootNode.appendChild(view);
    };
    #addListenerChangeHash = () => {
        window.addEventListener('hashchange', ev => {
            this.#showView(this.#getView());
        });
    }
}