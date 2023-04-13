import Block from "./Block";

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(query: string, block: Block) {
    const root = document.querySelector(query);

    if (root === null) {
        throw new Error(`root not found by selector "${query}"`);
    }

    root.innerHTML = '';

    root.append(block.getContent()!);
    return root;
}

class Route {
    _pathname: string;
    _blockClass: typeof Block;
    _block: Block | null;
    _props: { rootQuery: string; };

    constructor(pathname: string, view: typeof Block, props: { rootQuery: string }) {
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
        this._block = new this._blockClass({});
        render(this._props.rootQuery, this._block!);
        this._block.dispatchComponentDidMount();
    }
}

export default class Router {
    private routes: Route[] = [];
    private history = window.history;
    private _currentRoute: Route | null = null;
    private static __instance: Router;

    constructor(private readonly _rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
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

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
