function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: classInterface) {
    const root = document.querySelector(query);
    root!.appendChild(block.getContent());
    return root;
}

interface classInterface {
    show(): void;
    hide(): void;
    getContent(): HTMLElement;
}

class Route {
    _pathname: string;
    _blockClass: classInterface;
    _block: classInterface | null;
    _props: { rootQuery: string; };

    constructor(pathname: string, view: classInterface, props: { rootQuery: string }) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        this._block = new this._blockClass();
        render(this._props.rootQuery, this._block!);
        this._block.dispatchComponentDidMount();
    }
}

export default class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event => {
            this._onRoute(event.currentTarget.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}
